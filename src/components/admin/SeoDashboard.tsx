"use client";

import {useEffect,useMemo,useState} from "react";
import {getSession} from "@/lib/cms/adminClient";

type AuditPage={
  path:string;status:number;score:number;title?:string;description?:string;canonical?:string;h1Count?:number;schemaCount?:number;imageCount?:number;missingAlt?:number;emptyAlt?:number;genericAlt?:number;internalLinks?:number;checks?:Record<string,boolean>;error?:string;
};
type Audit={
  ok:boolean;generatedAt:string;averageScore:number;pages:AuditPage[];files:any;analytics:any;
};

function Score({value}:{value:number}){
  const level=value>=85?"good":value>=65?"warn":"bad";
  return <span className={`seoScore ${level}`}>{value}</span>;
}

export default function SeoDashboard(){
  const [audit,setAudit]=useState<Audit|null>(null);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  async function run(){
    setBusy(true);setError("");
    try{
      const session=getSession();
      if(!session?.access_token) throw new Error("Admin session is missing.");
      const res=await fetch("/api/admin/seo-audit",{headers:{Authorization:`Bearer ${session.access_token}`},cache:"no-store"});
      const body=await res.json();
      if(!res.ok) throw new Error(body?.error||"SEO audit failed.");
      setAudit(body);
    }catch(e:any){setError(e?.message||"SEO audit failed.")}finally{setBusy(false)}
  }
  useEffect(()=>{run()},[]);
  const totals=useMemo(()=>{
    const pages=audit?.pages||[];
    return {
      good:pages.filter(p=>p.score>=85).length,
      needsWork:pages.filter(p=>p.score<85).length,
      missingAlt:pages.reduce((n,p)=>n+(p.missingAlt||0),0),
      schemaMissing:pages.filter(p=>!p.checks?.schema).length
    };
  },[audit]);

  return <>
    <div className="adminTop seoAdminTop">
      <div><span>Search visibility</span><h1>SEO & Analytics</h1><p>Live technical checks for public pages, metadata, schema, image SEO and internal linking. Traffic numbers are only shown after a verified analytics API connection.</p></div>
      <button className="seoAuditButton" onClick={run} disabled={busy}>{busy?"Auditing…":"Run live audit"}</button>
    </div>
    {error&&<div className="adminNotice">{error}</div>}
    <div className="seoMetricGrid">
      <article><span>Site SEO score</span><strong>{audit?<>{audit.averageScore}<small>/100</small></>:"—"}</strong><p>Average of live page checks.</p></article>
      <article><span>Healthy pages</span><strong>{audit?totals.good:"—"}</strong><p>Pages scoring 85 or higher.</p></article>
      <article><span>Image SEO issues</span><strong>{audit?totals.missingAlt:"—"}</strong><p>Images missing usable alt text.</p></article>
      <article><span>Schema gaps</span><strong>{audit?totals.schemaMissing:"—"}</strong><p>Public pages without JSON-LD.</p></article>
    </div>

    <section className="adminCard wide seoIntegrationCard">
      <div className="seoSectionHead"><div><span>Analytics stack</span><h2>Measurement integrations</h2></div></div>
      <div className="seoIntegrationGrid">
        <div><b>GA4</b><strong>G-Z9WHEG868Z</strong><span>Tracking installed. Live reporting needs GA4 Data API authorization.</span></div>
        <div><b>Google Tag Manager</b><strong>GTM-K4TSR6C3</strong><span>Container installed globally.</span></div>
        <div><b>Microsoft Clarity</b><strong>yel789pzw4</strong><span>Session analytics installed.</span></div>
        <div><b>Search Console</b><strong>Domain verified</strong><span>Live clicks, impressions and queries need Search Console API authorization.</span></div>
      </div>
    </section>

    <section className="adminCard wide seoPagesCard">
      <div className="seoSectionHead"><div><span>On-page audit</span><h2>Public pages</h2></div><small>{audit?.generatedAt?`Checked ${new Date(audit.generatedAt).toLocaleString()}`:"Not checked yet"}</small></div>
      <div className="seoTableWrap"><table className="seoAuditTable"><thead><tr><th>Page</th><th>Score</th><th>Title</th><th>Meta</th><th>Canonical</th><th>Schema</th><th>Images</th><th>Links</th></tr></thead><tbody>
        {(audit?.pages||[]).map(page=><tr key={page.path}><td><a href={page.path} target="_blank" rel="noreferrer">{page.path}</a>{page.error&&<small>{page.error}</small>}</td><td><Score value={page.score||0}/></td><td className={page.checks?.title?"ok":"issue"}>{page.checks?.title?"OK":"Check"}</td><td className={page.checks?.description?"ok":"issue"}>{page.checks?.description?"OK":"Check"}</td><td className={page.checks?.canonical?"ok":"issue"}>{page.checks?.canonical?"OK":"Check"}</td><td className={page.checks?.schema?"ok":"issue"}>{page.schemaCount||0}</td><td className={page.checks?.imageAlt?"ok":"issue"}>{page.imageCount||0} / {page.missingAlt||0} missing</td><td className={page.checks?.internalLinks?"ok":"issue"}>{page.internalLinks||0}</td></tr>)}
      </tbody></table></div>
    </section>

    <section className="adminCard wide seoFilesCard">
      <div className="seoSectionHead"><div><span>Crawler readiness</span><h2>Robots, sitemap & AI discovery</h2></div></div>
      <div className="seoFileGrid">
        <div><b>robots.txt</b><strong>{audit?.files?.robots?.ok?"Available":"Check"}</strong></div>
        <div><b>sitemap.xml</b><strong>{audit?.files?.sitemap?.ok?"Available":"Check"}</strong></div>
        <div><b>llms.txt</b><strong>{audit?.files?.llms?.ok&&audit?.files?.llms?.hasMarkdownLinks?"Recommended format":"Check"}</strong></div>
      </div>
    </section>
  </>;
}
