const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const DEFAULT_SITE = "sc-domain:iraqhomeexpo.com";

function serviceHeaders(serviceKey:string){
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };
}

export async function verifyAdminToken(token:string){
  const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!supabaseUrl||!publishableKey||!serviceKey) throw new Error("Supabase admin configuration is incomplete.");

  const userRes=await fetch(`${supabaseUrl}/auth/v1/user`,{
    headers:{apikey:publishableKey,Authorization:`Bearer ${token}`},
    cache:"no-store",
  });
  if(!userRes.ok) return null;
  const user=await userRes.json();
  if(!user?.id) return null;

  const adminRes=await fetch(`${supabaseUrl}/rest/v1/admin_users?user_id=eq.${encodeURIComponent(user.id)}&select=user_id&limit=1`,{
    headers:serviceHeaders(serviceKey),
    cache:"no-store",
  });
  if(!adminRes.ok) return null;
  const rows=await adminRes.json();
  return rows?.[0] ? user : null;
}

export function googleOAuthConfig(){
  const clientId=process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_ID;
  const clientSecret=process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET;
  if(!clientId||!clientSecret) throw new Error("Google Search Console OAuth environment variables are missing.");
  const origin=(process.env.NEXT_PUBLIC_SITE_URL||"https://iraqhomeexpo.com").replace(/\/$/,"");
  return {
    clientId,
    clientSecret,
    redirectUri:`${origin}/api/admin/google-search-console/callback`,
    scope:SCOPE,
  };
}

export async function exchangeCode(code:string){
  const cfg=googleOAuthConfig();
  const body=new URLSearchParams({
    code,
    client_id:cfg.clientId,
    client_secret:cfg.clientSecret,
    redirect_uri:cfg.redirectUri,
    grant_type:"authorization_code",
  });
  const res=await fetch("https://oauth2.googleapis.com/token",{
    method:"POST",
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body,
    cache:"no-store",
  });
  const json=await res.json();
  if(!res.ok) throw new Error(json?.error_description||json?.error||"Google token exchange failed.");
  return json as {access_token:string;refresh_token?:string;expires_in?:number;scope?:string;token_type?:string};
}

export async function refreshAccessToken(refreshToken:string){
  const cfg=googleOAuthConfig();
  const body=new URLSearchParams({
    client_id:cfg.clientId,
    client_secret:cfg.clientSecret,
    refresh_token:refreshToken,
    grant_type:"refresh_token",
  });
  const res=await fetch("https://oauth2.googleapis.com/token",{
    method:"POST",
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body,
    cache:"no-store",
  });
  const json=await res.json();
  if(!res.ok) throw new Error(json?.error_description||json?.error||"Google token refresh failed.");
  return json.access_token as string;
}

export async function listSites(accessToken:string){
  const res=await fetch("https://www.googleapis.com/webmasters/v3/sites",{
    headers:{Authorization:`Bearer ${accessToken}`},
    cache:"no-store",
  });
  const json=await res.json();
  if(!res.ok) throw new Error(json?.error?.message||"Unable to read Search Console properties.");
  return (json?.siteEntry||[]) as {siteUrl:string;permissionLevel:string}[];
}

export function chooseSite(sites:{siteUrl:string;permissionLevel:string}[]){
  const preferred=process.env.GOOGLE_SEARCH_CONSOLE_SITE||DEFAULT_SITE;
  return sites.find(s=>s.siteUrl===preferred)
    || sites.find(s=>s.siteUrl===DEFAULT_SITE)
    || sites.find(s=>s.siteUrl==="https://iraqhomeexpo.com/")
    || sites.find(s=>s.siteUrl==="https://www.iraqhomeexpo.com/")
    || sites.find(s=>s.siteUrl.includes("iraqhomeexpo.com"))
    || null;
}

export async function loadConnection(){
  const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!supabaseUrl||!serviceKey) throw new Error("Supabase server configuration is incomplete.");
  const res=await fetch(`${supabaseUrl}/rest/v1/seo_integrations?provider=eq.google_search_console&select=provider,refresh_token,property_uri,permission_level,connected_at,updated_at&limit=1`,{
    headers:serviceHeaders(serviceKey),
    cache:"no-store",
  });
  if(!res.ok){
    if(res.status===404) throw new Error("Search Console storage table is missing. Run the supplied Supabase migration first.");
    throw new Error("Unable to read Search Console connection.");
  }
  const rows=await res.json();
  return rows?.[0]||null;
}

export async function saveConnection(input:{refreshToken:string;propertyUri:string;permissionLevel?:string}){
  const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!supabaseUrl||!serviceKey) throw new Error("Supabase server configuration is incomplete.");
  const now=new Date().toISOString();
  const res=await fetch(`${supabaseUrl}/rest/v1/seo_integrations?on_conflict=provider`,{
    method:"POST",
    headers:{...serviceHeaders(serviceKey),Prefer:"resolution=merge-duplicates,return=minimal"},
    body:JSON.stringify({
      provider:"google_search_console",
      refresh_token:input.refreshToken,
      property_uri:input.propertyUri,
      permission_level:input.permissionLevel||null,
      connected_at:now,
      updated_at:now,
    }),
    cache:"no-store",
  });
  if(!res.ok) throw new Error("Unable to save Search Console authorization.");
}

export async function deleteConnection(){
  const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!supabaseUrl||!serviceKey) throw new Error("Supabase server configuration is incomplete.");
  const res=await fetch(`${supabaseUrl}/rest/v1/seo_integrations?provider=eq.google_search_console`,{
    method:"DELETE",
    headers:serviceHeaders(serviceKey),
    cache:"no-store",
  });
  if(!res.ok) throw new Error("Unable to remove Search Console connection.");
}

export async function searchAnalytics(accessToken:string,siteUrl:string,body:Record<string,unknown>){
  const endpoint=`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const res=await fetch(endpoint,{
    method:"POST",
    headers:{Authorization:`Bearer ${accessToken}`,"Content-Type":"application/json"},
    body:JSON.stringify(body),
    cache:"no-store",
  });
  const json=await res.json();
  if(!res.ok) throw new Error(json?.error?.message||"Search Console query failed.");
  return json;
}
