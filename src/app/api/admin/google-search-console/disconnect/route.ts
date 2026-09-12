import { NextResponse } from "next/server";
import { deleteConnection, verifyAdminToken } from "@/lib/googleSearchConsole";

export const runtime="nodejs";
export const dynamic="force-dynamic";

export async function DELETE(request:Request){
  try{
    const auth=request.headers.get("authorization")||"";
    const token=auth.startsWith("Bearer ")?auth.slice(7):"";
    if(!token) return NextResponse.json({error:"Unauthorized"},{status:401});
    const user=await verifyAdminToken(token);
    if(!user) return NextResponse.json({error:"Admin access denied"},{status:403});
    await deleteConnection();
    return NextResponse.json({ok:true});
  }catch(error:any){
    console.error("GSC disconnect error",error);
    return NextResponse.json({error:error?.message||"Unable to disconnect Search Console."},{status:500});
  }
}
