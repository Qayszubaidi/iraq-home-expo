import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Mode = "ask" | "change" | "audit" | "developer";

function jsonHeaders(key:string){
  return { apikey:key, Authorization:`Bearer ${key}`, "Content-Type":"application/json" };
}

async function verifyAdmin(token:string){
  const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!supabaseUrl||!publishableKey||!serviceKey) throw new Error("Supabase admin configuration is incomplete.");

  const userRes=await fetch(`${supabaseUrl}/auth/v1/user`,{
    headers:{apikey:publishableKey,Authorization:`Bearer ${token}`},
    cache:"no-store"
  });
  if(!userRes.ok) return null;
  const user=await userRes.json();
  if(!user?.id) return null;

  const adminRes=await fetch(`${supabaseUrl}/rest/v1/admin_users?user_id=eq.${encodeURIComponent(user.id)}&select=user_id&limit=1`,{
    headers:jsonHeaders(serviceKey),cache:"no-store"
  });
  if(!adminRes.ok) return null;
  const rows=await adminRes.json();
  return rows?.[0] ? user : null;
}

async function supabaseGet(path:string){
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key=process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const r=await fetch(`${url}/rest/v1/${path}`,{headers:jsonHeaders(key),cache:"no-store"});
  if(!r.ok) return [];
  return r.json();
}

async function getSiteContext(){
  const [pages,pageDrafts,sectors,sectorDrafts,settings,settingsDrafts,media]=await Promise.all([
    supabaseGet("cms_pages?select=key,label,content,updated_at&order=key"),
    supabaseGet("cms_page_drafts?select=key,label,content,updated_at&order=key"),
    supabaseGet("cms_sectors?select=slug,label,content,updated_at&order=slug"),
    supabaseGet("cms_sector_drafts?select=slug,label,content,updated_at&order=slug"),
    supabaseGet("cms_settings?select=key,label,value,updated_at"),
    supabaseGet("cms_settings_drafts?select=key,label,value,updated_at"),
    supabaseGet("media_assets?select=id,name,public_url,mime_type,created_at&order=created_at.desc&limit=80")
  ]);
  return {pages,pageDrafts,sectors,sectorDrafts,settings,settingsDrafts,media};
}

function instructions(mode:Mode){
  return `You are the private AI website assistant for Iraq Home Expo 2027.
You work only with the supplied CMS/site context. Never invent existing content, image URLs, database records, or deployment state.

Working style:
- Make controlled, targeted changes. Do not broadly redesign approved areas unless explicitly asked.
- Preserve Iraq Home Expo's premium architectural/interiors identity: deep teal #005251, gold #C38F2C, charcoal #231F20, warm ivory.
- Prefer moderate modern typography, strong hierarchy, and professional exhibition imagery.
- Avoid oversized billboard typography, generic corporate styling, duplicated images, and regressions.
- For content changes, propose CMS draft operations only. Never publish automatically.
- For media, only use URLs already present in the supplied media library unless the user explicitly says they will upload a new image.
- For developer/code requests (new countdown timer, video section, animation, new component, new layout), DO NOT pretend you changed code. Return a developer plan with likely files and implementation steps. Direct code/Git changes require a separate approved developer integration.
- Keep replies concise and actionable.

Current mode: ${mode}.`;
}

const schema = {
  type:"object",
  additionalProperties:false,
  properties:{
    reply:{type:"string"},
    operations:{
      type:"array",
      items:{
        type:"object",
        additionalProperties:false,
        properties:{
          target:{type:"string",enum:["page","sector","settings"]},
          key:{type:"string"},
          label:{type:"string"},
          fields:{
            type:"array",
            items:{
              type:"object",
              additionalProperties:false,
              properties:{
                field:{type:"string"},
                value:{type:"string"}
              },
              required:["field","value"]
            }
          }
        },
        required:["target","key","label","fields"]
      }
    },
    developer_plan:{
      type:"object",
      additionalProperties:false,
      properties:{
        title:{type:"string"},
        summary:{type:"string"},
        files:{type:"array",items:{type:"string"}},
        steps:{type:"array",items:{type:"string"}},
        risk:{type:"string"},
        requires_git:{type:"boolean"}
      },
      required:["title","summary","files","steps","risk","requires_git"]
    }
  },
  required:["reply","operations","developer_plan"]
};

export async function POST(request:Request){
  try{
    const auth=request.headers.get("authorization")||"";
    const token=auth.startsWith("Bearer ")?auth.slice(7):"";
    if(!token) return NextResponse.json({error:"Unauthorized"},{status:401});
    const user=await verifyAdmin(token);
    if(!user) return NextResponse.json({error:"Admin access denied"},{status:403});

    const body=await request.json().catch(()=>({}));
    const mode=(["ask","change","audit","developer"].includes(body?.mode)?body.mode:"ask") as Mode;
    const message=String(body?.message||"").trim().slice(0,12000);
    if(!message) return NextResponse.json({error:"Message is required."},{status:400});

    const apiKey=process.env.OPENAI_API_KEY;
    if(!apiKey) return NextResponse.json({error:"OPENAI_API_KEY is not configured."},{status:503});

    const context=await getSiteContext();
    const model=process.env.OPENAI_MODEL||"gpt-5.6-terra";

    const response=await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      headers:{
        Authorization:`Bearer ${apiKey}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        model,
        store:false,
        reasoning:{effort: mode==="developer" ? "high" : "medium"},
        instructions:instructions(mode),
        input:`USER REQUEST:\n${message}\n\nCURRENT WEBSITE CMS CONTEXT:\n${JSON.stringify(context)}`,
        text:{
          format:{
            type:"json_schema",
            name:"iraq_home_expo_ai_result",
            strict:true,
            schema
          }
        }
      })
    });

    const payload=await response.json();
    if(!response.ok){
      const msg=payload?.error?.message||"AI request failed.";
      return NextResponse.json({error:msg},{status:502});
    }

    const outputText=payload?.output_text ||
      payload?.output?.flatMap((item:any)=>item?.content||[]).find((c:any)=>c?.type==="output_text")?.text;

    if(!outputText) return NextResponse.json({error:"AI returned no usable response."},{status:502});

    let result;
    try{ result=JSON.parse(outputText); }
    catch{ return NextResponse.json({error:"AI returned an invalid structured response."},{status:502}); }

    return NextResponse.json({ok:true,model,result});
  }catch(error:any){
    console.error("Admin AI error:",error);
    return NextResponse.json({error:error?.message||"Unexpected AI error."},{status:500});
  }
}
