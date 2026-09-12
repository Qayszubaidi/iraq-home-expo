import { NextResponse } from "next/server";
import { loadConnection, refreshAccessToken, searchAnalytics, verifyAdminToken } from "@/lib/googleSearchConsole";

export const runtime="nodejs";
export const dynamic="force-dynamic";

function isoDate(date:Date){return date.toISOString().slice(0,10)}
function dateRange(days=28){
  const end=new Date();
  end.setUTCDate(end.getUTCDate()-2);
  const start=new Date(end);
  start.setUTCDate(start.getUTCDate()-(days-1));
  return {startDate:isoDate(start),endDate:isoDate(end)};
}

export async function GET(request:Request){
  try{
    const auth=request.headers.get("authorization")||"";
    const token=auth.startsWith("Bearer ")?auth.slice(7):"";
    if(!token) return NextResponse.json({error:"Unauthorized"},{status:401});
    const user=await verifyAdminToken(token);
    if(!user) return NextResponse.json({error:"Admin access denied"},{status:403});

    const connection=await loadConnection();
    if(!connection?.refresh_token) return NextResponse.json({ok:true,connected:false});

    const accessToken=await refreshAccessToken(connection.refresh_token);
    const range=dateRange(28);
    const base={...range,type:"web"};

    const [totals,trend,queries,pages]=await Promise.all([
      searchAnalytics(accessToken,connection.property_uri,{...base,rowLimit:1}),
      searchAnalytics(accessToken,connection.property_uri,{...base,dimensions:["date"],rowLimit:100}),
      searchAnalytics(accessToken,connection.property_uri,{...base,dimensions:["query"],rowLimit:100}),
      searchAnalytics(accessToken,connection.property_uri,{...base,dimensions:["page"],rowLimit:50}),
    ]);

    const total=totals?.rows?.[0]||{clicks:0,impressions:0,ctr:0,position:0};
    return NextResponse.json({
      ok:true,
      connected:true,
      property:connection.property_uri,
      permissionLevel:connection.permission_level,
      connectedAt:connection.connected_at,
      range,
      metrics:{
        clicks:total.clicks||0,
        impressions:total.impressions||0,
        ctr:total.ctr||0,
        position:total.position||0,
        keywords:(queries?.rows||[]).length,
      },
      trend:(trend?.rows||[]).map((r:any)=>({date:r.keys?.[0]||"",clicks:r.clicks||0,impressions:r.impressions||0,ctr:r.ctr||0,position:r.position||0})),
      queries:(queries?.rows||[]).map((r:any)=>({query:r.keys?.[0]||"",clicks:r.clicks||0,impressions:r.impressions||0,ctr:r.ctr||0,position:r.position||0})),
      pages:(pages?.rows||[]).map((r:any)=>({page:r.keys?.[0]||"",clicks:r.clicks||0,impressions:r.impressions||0,ctr:r.ctr||0,position:r.position||0})),
    });
  }catch(error:any){
    console.error("GSC data error",error);
    return NextResponse.json({error:error?.message||"Unable to load Search Console data."},{status:500});
  }
}
