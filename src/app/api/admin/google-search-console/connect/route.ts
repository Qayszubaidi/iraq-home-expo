import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { googleOAuthConfig, verifyAdminToken } from "@/lib/googleSearchConsole";

export const runtime="nodejs";
export const dynamic="force-dynamic";

export async function GET(request:Request){
  try{
    const auth=request.headers.get("authorization")||"";
    const token=auth.startsWith("Bearer ")?auth.slice(7):"";
    if(!token) return NextResponse.json({error:"Unauthorized"},{status:401});
    const user=await verifyAdminToken(token);
    if(!user) return NextResponse.json({error:"Admin access denied"},{status:403});

    const cfg=googleOAuthConfig();
    const state=randomUUID();
    const params=new URLSearchParams({
      client_id:cfg.clientId,
      redirect_uri:cfg.redirectUri,
      response_type:"code",
      scope:cfg.scope,
      access_type:"offline",
      include_granted_scopes:"true",
      prompt:"consent",
      state,
    });
    const response=NextResponse.json({url:`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`});
    response.cookies.set("ihe_gsc_oauth_state",state,{
      httpOnly:true,
      secure:true,
      sameSite:"lax",
      path:"/api/admin/google-search-console",
      maxAge:600,
    });
    return response;
  }catch(error:any){
    console.error("GSC connect error",error);
    return NextResponse.json({error:error?.message||"Unable to start Google authorization."},{status:500});
  }
}
