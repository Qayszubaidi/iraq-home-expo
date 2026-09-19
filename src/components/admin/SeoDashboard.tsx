"use client";

import {useEffect,useMemo,useState} from "react";
import {adminRest,getAdminAccessToken} from "@/lib/cms/adminClient";
import {SEO_WORKPLAN,SEO_WORKPLAN_INITIAL_COMPLETED} from "@/data/seoWorkplan";
import styles from "./SeoWorkplan.module.css";

type AuditPage={
  path:string;status:number;score:number;title?:string;description?:string;canonical?:string;h1Count?:number;schemaCount?:number;imageCount?:number;missingAlt?:number;emptyAlt?:number;genericAlt?:number;internalLinks?:number;checks?:Record<string,boolean>;error?:string;
};
type Audit={ok:boolean;generatedAt:string;averageScore:number;pages:AuditPage[];files:any;analytics:any};
type GscData={
  ok:boolean;connected:boolean;property?:string;permissionLevel?:string;connectedAt?:string;
  range?:{startDate:string;endDate:string};
  metrics?:{clicks:number;impressions:number;ctr:number;position:number;keywords:number};
  trend?:{date:string;clicks:number;impressions:number;ctr:number;position:number}[];
  queries?:{query:string;clicks:number;impressions:number;ctr:number;position:number}[];
  pages?:{page:string;clicks:number;impressions:number;ctr:number;position:number}[];
};

function Score({value}:{value:number}){
  const level=value>=85?"good":value>=65?"warn":"bad";
  return <span className={`seoScore ${level}`}>{value}</span>;
}
function fmt(n:number){return new Intl.NumberFormat("en",{notation:n>=1000?"compact":"standard",maximumFractionDigits:1}).format(n||0)}
function pct(n:number){return `${((n||0)*100).toFixed(2)}%`}
function pos(n:number){return n?Number(n).toFixed(1):"—"}

export default function SeoDashboard(){
  const [audit,setAudit]=useState<Audit|null>(null);
  const [gsc,setGsc]=useState<GscData|null>(null);
  const [busy,setBusy]=useState(false);
  const [gscBusy,setGscBusy]=useState(false);
  const [error,setError]=useState("");
  const [gscError,setGscError]=useState("");
  const [workplan,setWorkplan]=useState<Record<string,boolean>>(SEO_WORKPLAN_INITIAL_COMPLETED);
  const [activeMonth,setActiveMonth]=useState("month-1");
  const [workplanBusy,setWorkplanBusy]=useState(true);
  const [workplanSaving,setWorkplanSaving]=useState(false);
  const [workplanError,setWorkplanError]=useState("");

  async function authHeaders(){
    const accessToken=await getAdminAccessToken();
    return {Authorization:`Bearer ${accessToken}`};
  }

  async function run(){
    setBusy(true);setError("");
    try{
      const res=await fetch("/api/admin/seo-audit",{headers:await authHeaders(),cache:"no-store"});
      const body=await res.json();
      if(!res.ok) throw new Error(body?.error||"SEO audit failed.");
      setAudit(body);
    }catch(e:any){setError(e?.message||"SEO audit failed.")}finally{setBusy(false)}
  }

  async function loadGsc(){
    setGscBusy(true);setGscError("");
    try{
      const res=await fetch("/api/admin/google-search-console/data",{headers:await authHeaders(),cache:"no-store"});
      const body=await res.json();
      if(!res.ok) throw new Error(body?.error||"Unable to load Search Console.");
      setGsc(body);
    }catch(e:any){setGscError(e?.message||"Unable to load Search Console.")}finally{setGscBusy(false)}
  }

  async function connectGsc(){
    setGscBusy(true);setGscError("");
    try{
      const res=await fetch("/api/admin/google-search-console/connect",{headers:await authHeaders(),cache:"no-store"});
      const body=await res.json();
      if(!res.ok||!body?.url) throw new Error(body?.error||"Unable to start Google authorization.");
      window.location.assign(body.url);
    }catch(e:any){setGscError(e?.message||"Unable to start Google authorization.");setGscBusy(false)}
  }

  async function disconnectGsc(){
    if(!window.confirm("Disconnect Google Search Console from this admin dashboard?")) return;
    setGscBusy(true);setGscError("");
    try{
      const res=await fetch("/api/admin/google-search-console/disconnect",{method:"DELETE",headers:await authHeaders()});
      const body=await res.json();
      if(!res.ok) throw new Error(body?.error||"Unable to disconnect Search Console.");
      setGsc({ok:true,connected:false});
    }catch(e:any){setGscError(e?.message||"Unable to disconnect Search Console.")}finally{setGscBusy(false)}
  }

  async function loadWorkplan(){
    setWorkplanBusy(true);setWorkplanError("");
    try{
      const rows=await adminRest<{value?:{completed?:Record<string,boolean>}}[]>("cms_private_settings?key=eq.seo-workplan-progress&select=value");
      const saved=rows?.[0]?.value?.completed||{};
      setWorkplan({...SEO_WORKPLAN_INITIAL_COMPLETED,...saved});
    }catch(e:any){setWorkplanError(e?.message||"Unable to load SEO work plan.")}finally{setWorkplanBusy(false)}
  }

  async function saveWorkplan(next:Record<string,boolean>){
    const previous=workplan;
    setWorkplan(next);setWorkplanSaving(true);setWorkplanError("");
    try{
      await adminRest("cms_private_settings?key=eq.seo-workplan-progress",{
        method:"PATCH",
        body:JSON.stringify({value:{completed:next,updatedAt:new Date().toISOString()},updated_at:new Date().toISOString()}),
      });
    }catch(e:any){setWorkplan(previous);setWorkplanError(e?.message||"Unable to save SEO work plan.")}finally{setWorkplanSaving(false)}
  }

  function toggleWorkplanTask(id:string){
    if(workplanSaving) return;
    void saveWorkplan({...workplan,[id]:!workplan[id]});
  }

  useEffect(()=>{run();loadGsc();loadWorkplan()},[]);

  const totals=useMemo(()=>{
    const pages=audit?.pages||[];
    return {
      good:pages.filter(p=>p.score>=85).length,
      needsWork:pages.filter(p=>p.score<85).length,
      missingAlt:pages.reduce((n,p)=>n+(p.missingAlt||0),0),
      schemaMissing:pages.filter(p=>!p.checks?.schema).length,
    };
  },[audit]);

  const topQueries=(gsc?.queries||[]).slice(0,10);
  const allWorkplanTasks=SEO_WORKPLAN.flatMap(month=>month.tasks);
  const workplanDone=allWorkplanTasks.filter(task=>workplan[task.id]).length;
  const workplanPercent=allWorkplanTasks.length?Math.round((workplanDone/allWorkplanTasks.length)*100):0;
  const selectedMonth=SEO_WORKPLAN.find(month=>month.id===activeMonth)||SEO_WORKPLAN[0];
  const selectedDone=selectedMonth.tasks.filter(task=>workplan[task.id]).length;
  const selectedPercent=selectedMonth.tasks.length?Math.round((selectedDone/selectedMonth.tasks.length)*100):0;

  return <>
    <div className="adminTop seoAdminTop">
      <div><span>Search visibility</span><h1>SEO & Analytics</h1><p>Technical SEO checks plus real Google Search Console search performance. No traffic or ranking values are fabricated.</p></div>
      <button className="seoAuditButton" onClick={run} disabled={busy}>{busy?"Auditing…":"Run live audit"}</button>
    </div>

    {error&&<div className="adminNotice">{error}</div>}
    {gscError&&<div className="adminNotice">{gscError}</div>}
    {workplanError&&<div className="adminNotice">{workplanError}</div>}

    <div className="seoMetricGrid">
      <article><span>Site SEO score</span><strong>{audit?<>{audit.averageScore}<small>/100</small></>:"—"}</strong><p>Average of live page checks.</p></article>
      <article><span>Healthy pages</span><strong>{audit?totals.good:"—"}</strong><p>Pages scoring 85 or higher.</p></article>
      <article><span>Image SEO issues</span><strong>{audit?totals.missingAlt:"—"}</strong><p>Images missing usable alt text.</p></article>
      <article><span>Schema gaps</span><strong>{audit?totals.schemaMissing:"—"}</strong><p>Public pages without JSON-LD.</p></article>
    </div>

    <section className={`adminCard wide ${styles.workplanCard}`}>
      <div className="seoSectionHead">
        <div><span>6 month execution plan</span><h2>SEO work checklist</h2><p className={styles.planIntro}>Track the approved September 2026 through February 2027 SEO roadmap. Check an item only when the work is complete.</p></div>
        <div className={styles.overallProgress}><strong>{workplanPercent}%</strong><span>{workplanDone} of {allWorkplanTasks.length} complete</span></div>
      </div>

      <div className={styles.progressTrack} aria-label={`Overall SEO work plan progress ${workplanPercent}%`}><i style={{width:`${workplanPercent}%`}}/></div>

      <div className={styles.monthTabs}>
        {SEO_WORKPLAN.map(month=>{
          const done=month.tasks.filter(task=>workplan[task.id]).length;
          const percent=month.tasks.length?Math.round((done/month.tasks.length)*100):0;
          return <button key={month.id} type="button" className={activeMonth===month.id?styles.activeMonth:""} onClick={()=>setActiveMonth(month.id)}>
            <span>Month {month.month}{month.month===1?<b>Current</b>:null}</span>
            <strong>{month.title}</strong>
            <small>{month.period} · {percent}%</small>
          </button>;
        })}
      </div>

      <div className={styles.monthPanel}>
        <div className={styles.monthHead}>
          <div><span>Month {selectedMonth.month} · {selectedMonth.period}</span><h3>{selectedMonth.title}</h3><p>{selectedMonth.outcome}</p></div>
          <div><strong>{selectedPercent}%</strong><small>{selectedDone} of {selectedMonth.tasks.length}</small></div>
        </div>
        <div className={styles.monthProgress}><i style={{width:`${selectedPercent}%`}}/></div>
        <div className={styles.taskGrid} aria-busy={workplanBusy||workplanSaving}>
          {selectedMonth.tasks.map(task=><label key={task.id} className={workplan[task.id]?styles.taskDone:""}>
            <input type="checkbox" checked={!!workplan[task.id]} disabled={workplanBusy||workplanSaving} onChange={()=>toggleWorkplanTask(task.id)}/>
            <span className={styles.checkMark} aria-hidden="true">{workplan[task.id]?"✓":""}</span>
            <strong>{task.label}</strong>
          </label>)}
        </div>
        <div className={styles.saveState}>{workplanBusy?"Loading checklist…":workplanSaving?"Saving…":"Progress saved automatically"}</div>
      </div>
    </section>

    <section className="adminCard wide seoIntegrationCard">
      <div className="seoSectionHead">
        <div><span>Google Search Console</span><h2>Search performance</h2></div>
        <div className="gscActions">
          {gsc?.connected
            ? <><button className="seoAuditButton" onClick={loadGsc} disabled={gscBusy}>{gscBusy?"Refreshing…":"Refresh data"}</button><button className="gscDisconnect" onClick={disconnectGsc} disabled={gscBusy}>Disconnect</button></>
            : <button className="seoAuditButton" onClick={connectGsc} disabled={gscBusy}>{gscBusy?"Opening Google…":"Connect Google Search Console"}</button>}
        </div>
      </div>

      {!gsc?.connected && <div className="gscEmpty"><strong>Not connected</strong><p>Authorize the Google account that has access to the Iraq Home Expo Search Console property. The connection uses read-only Search Console access.</p></div>}

      {gsc?.connected && <>
        <div className="gscConnectionLine"><span>Connected property</span><strong>{gsc.property}</strong><small>{gsc.range?`${gsc.range.startDate} to ${gsc.range.endDate}`:""}</small></div>
        <div className="gscMetricGrid">
          <article><span>Search clicks</span><strong>{fmt(gsc.metrics?.clicks||0)}</strong></article>
          <article><span>Search impressions</span><strong>{fmt(gsc.metrics?.impressions||0)}</strong></article>
          <article><span>CTR</span><strong>{pct(gsc.metrics?.ctr||0)}</strong></article>
          <article><span>Avg. position</span><strong>{pos(gsc.metrics?.position||0)}</strong></article>
          <article><span>Queries returned</span><strong>{gsc.metrics?.keywords||0}</strong></article>
        </div>

        <div className="gscKeywordBlock">
          <div className="seoSectionHead"><div><span>Keywords</span><h3>Top Google queries</h3></div></div>
          <div className="seoTableWrap"><table className="seoAuditTable"><thead><tr><th>Keyword</th><th>Clicks</th><th>Impressions</th><th>CTR</th><th>Position</th></tr></thead><tbody>
            {topQueries.map(row=><tr key={row.query}><td><strong>{row.query}</strong></td><td>{fmt(row.clicks)}</td><td>{fmt(row.impressions)}</td><td>{pct(row.ctr)}</td><td>{pos(row.position)}</td></tr>)}
            {!topQueries.length&&<tr><td colSpan={5}>No Search Console query rows are available for this period yet.</td></tr>}
          </tbody></table></div>
        </div>
      </>}
    </section>

    <section className="adminCard wide seoIntegrationCard">
      <div className="seoSectionHead"><div><span>Analytics stack</span><h2>Measurement integrations</h2></div></div>
      <div className="seoIntegrationGrid">
        <div><b>GA4</b><strong>G-Z9WHEG868Z</strong><span>Tracking installed. Live reporting needs GA4 Data API authorization.</span></div>
        <div><b>Google Tag Manager</b><strong>GTM-K4TSR6C3</strong><span>Container installed globally.</span></div>
        <div><b>Microsoft Clarity</b><strong>yel789pzw4</strong><span>Session analytics installed.</span></div>
        <div><b>Search Console</b><strong>{gsc?.connected?"Connected":"Not connected"}</strong><span>{gsc?.connected?gsc.property:"Connect above to load real clicks, impressions and query positions."}</span></div>
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
