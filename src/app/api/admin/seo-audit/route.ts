import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = "https://iraqhomeexpo.com";
const ROUTES = [
  "/","/about","/why-iraq","/sectors","/visit","/exhibit","/sponsor","/register","/register/visitor","/register/exhibitor","/contact","/privacy","/terms",
  "/sectors/interiors","/sectors/furniture-home-furnishings","/sectors/home-textiles","/sectors/kitchen","/sectors/bathroom-cleaning","/sectors/home-lighting-electrical","/sectors/hvac-r","/sectors/digital-safety-security"
];

function jsonHeaders(key:string){
  return {apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json"};
}

async function verifyAdmin(token:string){
  const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!supabaseUrl||!publishableKey||!serviceKey) throw new Error("Supabase admin configuration is incomplete.");
  const userRes=await fetch(`${supabaseUrl}/auth/v1/user`,{headers:{apikey:publishableKey,Authorization:`Bearer ${token}`},cache:"no-store"});
  if(!userRes.ok) return null;
  const user=await userRes.json();
  if(!user?.id) return null;
  const adminRes=await fetch(`${supabaseUrl}/rest/v1/admin_users?user_id=eq.${encodeURIComponent(user.id)}&select=user_id&limit=1`,{headers:jsonHeaders(serviceKey),cache:"no-store"});
  if(!adminRes.ok) return null;
  const rows=await adminRes.json();
  return rows?.[0] ? user : null;
}

function firstMatch(html:string,re:RegExp){return html.match(re)?.[1]?.trim()||""}
function allMatches(html:string,re:RegExp){return Array.from(html.matchAll(re))}
function stripTags(value:string){return value.replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim()}

function inspectHtml(path:string,html:string,status:number){
  const title=stripTags(firstMatch(html,/<title[^>]*>([\s\S]*?)<\/title>/i));
  const description=firstMatch(html,/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)||firstMatch(html,/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i);
  const canonical=firstMatch(html,/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["'][^>]*>/i)||firstMatch(html,/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["'][^>]*>/i);
  const h1Count=allMatches(html,/<h1\b[^>]*>/gi).length;
  const schemaCount=allMatches(html,/<script[^>]+type=["']application\/ld\+json["'][^>]*>/gi).length;
  const imgs=allMatches(html,/<img\b[^>]*>/gi).map(m=>m[0]);
  const missingAlt=imgs.filter(tag=>!(/\balt=["'][^"']*["']/i.test(tag))).length;
  const emptyAlt=imgs.filter(tag=>/\balt=["']\s*["']/i.test(tag)).length;
  const genericAlt=imgs.filter(tag=>/\balt=["'](?:image|photo|picture|banner|hero|iraq home expo)["']/i.test(tag)).length;
  const internalLinks=allMatches(html,/<a\b[^>]+href=["'](?:\/|https:\/\/iraqhomeexpo\.com)[^"']*["']/gi).length;
  const ogImage=firstMatch(html,/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["'][^>]*>/i)||firstMatch(html,/<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:image["'][^>]*>/i);
  const expectedCanonical=`${SITE_URL}${path==="/"?"":path}`;
  const checks={
    statusOk:status>=200&&status<400,
    title:title.length>=25&&title.length<=70,
    description:description.length>=70&&description.length<=180,
    canonical:canonical===expectedCanonical,
    h1:h1Count===1,
    schema:schemaCount>0,
    imageAlt:missingAlt===0&&genericAlt===0,
    internalLinks:internalLinks>=2,
    ogImage:Boolean(ogImage)
  };
  const passed=Object.values(checks).filter(Boolean).length;
  const score=Math.round((passed/Object.keys(checks).length)*100);
  return {path,status,title,description,canonical,h1Count,schemaCount,imageCount:imgs.length,missingAlt,emptyAlt,genericAlt,internalLinks,ogImage,checks,score};
}

async function inspectTextFile(path:string){
  try{
    const res=await fetch(`${SITE_URL}${path}`,{cache:"no-store",headers:{"User-Agent":"IraqHomeExpo-Admin-SEO-Audit/1.0"}});
    const text=await res.text();
    return {path,status:res.status,ok:res.ok,textLength:text.length,hasMarkdownLinks:/\[[^\]]+\]\(https?:\/\//.test(text),preview:text.slice(0,220)};
  }catch(error:any){return {path,status:0,ok:false,textLength:0,hasMarkdownLinks:false,preview:error?.message||"Fetch failed"}}
}

export async function GET(request:Request){
  try{
    const auth=request.headers.get("authorization")||"";
    const token=auth.startsWith("Bearer ")?auth.slice(7):"";
    if(!token) return NextResponse.json({error:"Unauthorized"},{status:401});
    const user=await verifyAdmin(token);
    if(!user) return NextResponse.json({error:"Admin access denied"},{status:403});

    const pages=[];
    for(const path of ROUTES){
      try{
        const res=await fetch(`${SITE_URL}${path}`,{cache:"no-store",redirect:"follow",headers:{"User-Agent":"IraqHomeExpo-Admin-SEO-Audit/1.0"}});
        pages.push(inspectHtml(path,await res.text(),res.status));
      }catch(error:any){
        pages.push({path,status:0,score:0,error:error?.message||"Fetch failed",checks:{}});
      }
    }
    const [robots,llms,sitemap]=await Promise.all([inspectTextFile("/robots.txt"),inspectTextFile("/llms.txt"),inspectTextFile("/sitemap.xml")]);
    const averageScore=pages.length?Math.round(pages.reduce((sum:any,page:any)=>sum+(page.score||0),0)/pages.length):0;
    return NextResponse.json({ok:true,generatedAt:new Date().toISOString(),averageScore,pages,files:{robots,llms,sitemap},analytics:{ga4:"G-Z9WHEG868Z",gtm:"GTM-K4TSR6C3",clarity:"yel789pzw4",note:"Live GA4 and Search Console metrics require their data APIs; this audit does not fabricate traffic data."}});
  }catch(error:any){
    console.error("Admin SEO audit error:",error);
    return NextResponse.json({error:error?.message||"Unexpected SEO audit error."},{status:500});
  }
}
