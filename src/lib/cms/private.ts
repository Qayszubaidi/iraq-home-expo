export async function getPrivateFormSettings(): Promise<{contactTo?:string;salesTo?:string}|null> {
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!serviceKey)return null;
  try{
    const r=await fetch(`${url}/rest/v1/cms_private_settings?key=eq.forms&select=value&limit=1`,{headers:{apikey:serviceKey,Authorization:`Bearer ${serviceKey}`},cache:"no-store"});
    if(!r.ok)return null; const rows=await r.json(); return rows?.[0]?.value??null;
  }catch{return null}
}
