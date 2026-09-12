import { NextResponse } from "next/server";
import { chooseSite, exchangeCode, listSites, saveConnection } from "@/lib/googleSearchConsole";

export const runtime="nodejs";
export const dynamic="force-dynamic";

export async function GET(request:Request){
  const url=new URL(request.url);
  const code=url.searchParams.get("code");
  const state=url.searchParams.get("state");
  const oauthError=url.searchParams.get("error");
  const cookie=request.headers.get("cookie")||"";
  const expected=decodeURIComponent(cookie.match(/(?:^|;\s*)ihe_gsc_oauth_state=([^;]+)/)?.[1]||"");
  const origin=(process.env.NEXT_PUBLIC_SITE_URL||"https://iraqhomeexpo.com").replace(/\/$/,"");

  try{
    if(oauthError) throw new Error(`Google authorization was not completed: ${oauthError}`);
    if(!code||!state||!expected||state!==expected) throw new Error("Invalid or expired Google authorization state.");

    const tokens=await exchangeCode(code);
    if(!tokens.access_token) throw new Error("Google did not return an access token.");
    if(!tokens.refresh_token) throw new Error("Google did not return a refresh token. Reconnect and approve access again.");

    const sites=await listSites(tokens.access_token);
    const selected=chooseSite(sites);
    if(!selected) throw new Error("The authorized Google account does not have access to iraqhomeexpo.com in Search Console.");

    await saveConnection({
      refreshToken:tokens.refresh_token,
      propertyUri:selected.siteUrl,
      permissionLevel:selected.permissionLevel,
    });

    const response=NextResponse.redirect(`${origin}/admin?gsc=connected`);
    response.cookies.set("ihe_gsc_oauth_state","",{httpOnly:true,secure:true,sameSite:"lax",path:"/api/admin/google-search-console",maxAge:0});
    return response;
  }catch(error:any){
    console.error("GSC callback error",error);
    const message=encodeURIComponent(error?.message||"Google Search Console authorization failed.");
    const response=NextResponse.redirect(`${origin}/admin?gsc=error&message=${message}`);
    response.cookies.set("ihe_gsc_oauth_state","",{httpOnly:true,secure:true,sameSite:"lax",path:"/api/admin/google-search-console",maxAge:0});
    return response;
  }
}
