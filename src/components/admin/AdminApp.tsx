"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminRest, getSession, signOut, uploadMedia } from "@/lib/cms/adminClient";
import { pageDefinitions, sectorDefinitions } from "@/lib/cms/adminConfig";

type Tab = "overview"|"pages"|"sectors"|"media"|"settings"|"forms";
type Json = Record<string, any>;

const emptyPage = {eyebrow:"",title:"",copy:"",heroImage:"",heroAlt:"",heroPosition:"center center",primary:"",primaryHref:"",seoTitle:"",seoDescription:""};
const emptySector = {title:"",short:"",image:"",heroImage:"",categories:[] as string[]};

async function getDraft(table:string,keyName:string,key:string){
  const rows=await adminRest<any[]>(`${table}?${keyName}=eq.${encodeURIComponent(key)}&select=*`);
  return rows?.[0] ?? null;
}
async function saveRow(table:string,keyName:string,key:string,label:string,payload:Json){
  return adminRest(table,{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify({[keyName]:key,label,...payload,updated_at:new Date().toISOString()})});
}

function Field({label,value,onChange,multiline=false,placeholder=""}:{label:string;value:string;onChange:(v:string)=>void;multiline?:boolean;placeholder?:string}){
  return <label className="adminField"><span>{label}</span>{multiline?<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>:<input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>}</label>
}

export default function AdminApp(){
 const router=useRouter(); const [tab,setTab]=useState<Tab>("overview"); const [ready,setReady]=useState(false); const [notice,setNotice]=useState("");
 useEffect(()=>{if(!getSession()) router.replace("/admin/login"); else setReady(true)},[router]);
 if(!ready)return <div className="adminLoading">Checking admin session…</div>;
 const nav:[Tab,string,string][]=[
   ["overview","Dashboard","01"],
   ["pages","Pages","02"],
   ["sectors","Sectors","03"],
   ["media","Media Library","04"],
   ["settings","Site Settings","05"],
   ["forms","Forms","06"]
 ];
 const activeLabel=nav.find(([k])=>k===tab)?.[1]||"Dashboard";
 return <div className="adminShell">
   <aside className="adminSidebar">
     <div className="adminBrand">
       <div className="adminBrandMark">IH</div>
       <div><strong>Iraq Home Expo</strong><span>Content Management</span></div>
     </div>
     <div className="adminNavLabel">Workspace</div>
     <nav>{nav.map(([k,l,n])=><button key={k} className={tab===k?"active":""} onClick={()=>{setTab(k);setNotice("")}}><span className="adminNavNumber">{n}</span><span>{l}</span></button>)}</nav>
     <div className="adminSidebarFooter">
       <a className="adminViewSite" href="/" target="_blank"><span>View website</span><b>↗</b></a>
       <button className="adminSignout" onClick={()=>{signOut();router.replace('/admin/login')}}>Sign out</button>
     </div>
   </aside>
   <main className="adminMain">
     <header className="adminWorkspaceHeader">
       <div><span>Private CMS</span><strong>{activeLabel}</strong></div>
       <div className="adminWorkspaceStatus"><i></i> Connected</div>
     </header>
     <div className="adminContent">
       {notice&&<div className="adminNotice">{notice}</div>}
       {tab==="overview"&&<Overview onNavigate={setTab}/>}
       {tab==="pages"&&<PagesEditor onNotice={setNotice}/>}
       {tab==="sectors"&&<SectorsEditor onNotice={setNotice}/>}
       {tab==="media"&&<MediaLibrary onNotice={setNotice}/>}
       {tab==="settings"&&<SettingsEditor onNotice={setNotice}/>}
       {tab==="forms"&&<FormsEditor onNotice={setNotice}/>}
     </div>
   </main>
 </div>
}

function Overview({onNavigate}:{onNavigate:(t:Tab)=>void}){return <>
  <div className="adminHero">
    <div>
      <span className="adminEyebrow">Iraq Home Expo 2027</span>
      <h1>Website dashboard</h1>
      <p>Manage approved content, sector information, imagery and site settings without touching the design code.</p>
    </div>
    <button className="adminPrimaryAction" onClick={()=>onNavigate("pages")}>Edit website content <span>→</span></button>
  </div>

  <div className="adminMetricGrid">
    <button onClick={()=>onNavigate("pages")}><span className="metricIndex">01</span><strong>9</strong><span>Editable pages</span><small>Hero copy, images and SEO</small></button>
    <button onClick={()=>onNavigate("sectors")}><span className="metricIndex">02</span><strong>8</strong><span>Exhibition sectors</span><small>Cards, heroes and categories</small></button>
    <button onClick={()=>onNavigate("media")}><span className="metricIndex">03</span><strong>Media</strong><span>Asset library</span><small>Upload and reuse site imagery</small></button>
    <button onClick={()=>onNavigate("settings")}><span className="metricIndex">04</span><strong>Global</strong><span>Site settings</span><small>Event, contacts and socials</small></button>
  </div>

  <div className="adminOverviewGrid">
    <section className="adminInfo">
      <div className="adminSectionHeading"><span>Publishing</span><h2>Safe editing workflow</h2></div>
      <div className="adminWorkflow">
        <div><b>1</b><span><strong>Edit</strong><small>Change content or imagery in the relevant section.</small></span></div>
        <div><b>2</b><span><strong>Save draft</strong><small>Keep changes private while you review them.</small></span></div>
        <div><b>3</b><span><strong>Publish</strong><small>Send approved content to the public website.</small></span></div>
      </div>
    </section>
    <aside className="adminGuardrail">
      <span>Design protection</span>
      <h3>Layout stays locked.</h3>
      <p>The dashboard edits content only. Navigation, spacing, CSS and responsive layout remain protected in the codebase.</p>
      <div><i></i> Code fallback enabled</div>
    </aside>
  </div>
</>}

function PagesEditor({onNotice}:{onNotice:(s:string)=>void}){
 const [key,setKey]=useState("home"), [form,setForm]=useState<Json>(emptyPage), [loading,setLoading]=useState(false), [published,setPublished]=useState<Json|null>(null);
 const label=pageDefinitions.find(x=>x[0]===key)?.[1]||key;
 async function load(k=key){setLoading(true);try{const [draft,pub]=await Promise.all([getDraft("cms_page_drafts","key",k),getDraft("cms_pages","key",k)]);setForm({...emptyPage,...(draft?.content||pub?.content||{})});setPublished(pub?.content||null)}catch(e:any){onNotice(e.message)}finally{setLoading(false)}}
 useEffect(()=>{load(key)},[key]);
 const set=(k:string,v:any)=>setForm((f:Json)=>({...f,[k]:v}));
 async function save(){try{await saveRow("cms_page_drafts","key",key,label,{content:form});onNotice(`${label} draft saved.`)}catch(e:any){onNotice(e.message)}}
 async function publish(){try{await saveRow("cms_page_drafts","key",key,label,{content:form});await saveRow("cms_pages","key",key,label,{content:form});setPublished(form);onNotice(`${label} published. Public cache updates within about 30 seconds.`)}catch(e:any){onNotice(e.message)}}
 return <><div className="adminTop"><div><span>Content</span><h1>Page editor</h1><p>Edit hero content and SEO without touching page layout.</p></div><select value={key} onChange={e=>setKey(e.target.value)}>{pageDefinitions.map(([k,l])=><option key={k} value={k}>{l}</option>)}</select></div>{loading?<div className="adminLoading">Loading…</div>:<div className="adminEditorGrid"><section className="adminCard"><h2>{label} hero</h2><Field label="Eyebrow" value={form.eyebrow} onChange={v=>set("eyebrow",v)}/><Field label="Title" value={form.title} onChange={v=>set("title",v)}/><Field label="Description" multiline value={form.copy} onChange={v=>set("copy",v)}/><Field label="Hero image URL" value={form.heroImage} onChange={v=>set("heroImage",v)} placeholder="/assets/image.webp or media URL"/><Field label="Image alt text" value={form.heroAlt} onChange={v=>set("heroAlt",v)}/><Field label="Image position" value={form.heroPosition} onChange={v=>set("heroPosition",v)} placeholder="center center / bottom center"/><div className="adminTwo"><Field label="CTA label" value={form.primary} onChange={v=>set("primary",v)}/><Field label="CTA link" value={form.primaryHref} onChange={v=>set("primaryHref",v)}/></div><h3>SEO</h3><Field label="SEO title" value={form.seoTitle} onChange={v=>set("seoTitle",v)}/><Field label="SEO description" multiline value={form.seoDescription} onChange={v=>set("seoDescription",v)}/><div className="adminActions"><button onClick={save}>Save Draft</button><button className="primary" onClick={publish}>Publish</button></div></section><aside className="adminPreview"><span>Status</span><strong>{published?"Published content exists":"Using code fallback"}</strong><p>Hero image</p>{form.heroImage?<img src={form.heroImage} alt="Preview"/>:<div className="adminEmptyPreview">Choose an image from Media Library and paste its URL here.</div>}</aside></div>}</>
}

function SectorsEditor({onNotice}:{onNotice:(s:string)=>void}){
 const [slug,setSlug]=useState("interiors"),[form,setForm]=useState<Json>(emptySector),[loading,setLoading]=useState(false); const label=sectorDefinitions.find(x=>x[0]===slug)?.[1]||slug;
 async function load(){setLoading(true);try{const [draft,pub]=await Promise.all([getDraft("cms_sector_drafts","slug",slug),getDraft("cms_sectors","slug",slug)]);const c=draft?.content||pub?.content||{};setForm({...emptySector,...c,categories:Array.isArray(c.categories)?c.categories:[]})}catch(e:any){onNotice(e.message)}finally{setLoading(false)}}
 useEffect(()=>{load()},[slug]); const set=(k:string,v:any)=>setForm((f:Json)=>({...f,[k]:v}));
 async function save(publish=false){try{await saveRow("cms_sector_drafts","slug",slug,label,{content:form});if(publish)await saveRow("cms_sectors","slug",slug,label,{content:form});onNotice(`${label} ${publish?"published":"draft saved"}.`)}catch(e:any){onNotice(e.message)}}
 return <><div className="adminTop"><div><span>Exhibition</span><h1>Sector editor</h1><p>Control card images, sector hero images and sector copy.</p></div><select value={slug} onChange={e=>setSlug(e.target.value)}>{sectorDefinitions.map(([k,l])=><option key={k} value={k}>{l}</option>)}</select></div>{loading?<div className="adminLoading">Loading…</div>:<section className="adminCard wide"><Field label="Sector title" value={form.title} onChange={v=>set("title",v)}/><Field label="Short description" multiline value={form.short} onChange={v=>set("short",v)}/><div className="adminTwo"><Field label="Card cover image URL" value={form.image} onChange={v=>set("image",v)}/><Field label="Hero image URL" value={form.heroImage} onChange={v=>set("heroImage",v)}/></div><Field label="Product categories — one per line" multiline value={(form.categories||[]).join("\n")} onChange={v=>set("categories",v.split("\n").map((x:string)=>x.trim()).filter(Boolean))}/><div className="adminActions"><button onClick={()=>save(false)}>Save Draft</button><button className="primary" onClick={()=>save(true)}>Publish</button></div></section>}</>
}

function MediaLibrary({onNotice}:{onNotice:(s:string)=>void}){
 const [items,setItems]=useState<any[]>([]),[busy,setBusy]=useState(false); async function load(){try{setItems(await adminRest<any[]>("media_assets?select=*&order=created_at.desc"))}catch(e:any){onNotice(e.message)}} useEffect(()=>{load()},[]);
 async function upload(file?:File){if(!file)return;setBusy(true);try{const url=await uploadMedia(file);await load();await navigator.clipboard?.writeText(url);onNotice("Image uploaded. Public URL copied to clipboard.")}catch(e:any){onNotice(e.message)}finally{setBusy(false)}}
 return <><div className="adminTop"><div><span>Assets</span><h1>Media library</h1><p>Upload website images and reuse their public URLs in page and sector editors.</p></div><label className="adminUpload">{busy?"Uploading…":"Upload image"}<input type="file" accept="image/*" disabled={busy} onChange={e=>upload(e.target.files?.[0])}/></label></div><div className="adminMediaGrid">{items.map(item=><article key={item.id}><img src={item.public_url} alt={item.name}/><div><strong>{item.name}</strong><button onClick={()=>{navigator.clipboard.writeText(item.public_url);onNotice("Image URL copied.")}}>Copy URL</button></div></article>)}</div></>
}

const emptySettings={eventName:"Iraq Home Expo 2027",dates:"12–15 May 2027",venue:"Baghdad International Fair",city:"Baghdad, Iraq",hours:"11:00 AM – 6:00 PM",infoEmail:"info@iraqhomeexpo.com",salesEmail:"sales@iraqhomeexpo.com",phone1:"+964 782 445 5860",phone2:"+964 770 255 0297",facebook:"https://www.facebook.com/profile.php?id=61591852047921",instagram:"https://www.instagram.com/iraqhomeexpo/"};
function SettingsEditor({onNotice}:{onNotice:(s:string)=>void}){const [form,setForm]=useState<Json>(emptySettings);useEffect(()=>{(async()=>{try{const d=await getDraft("cms_settings_drafts","key","site"),p=await getDraft("cms_settings","key","site");setForm({...emptySettings,...(d?.value||p?.value||{})})}catch(e:any){onNotice(e.message)}})()},[]);const set=(k:string,v:string)=>setForm(f=>({...f,[k]:v}));async function save(pub=false){try{await saveRow("cms_settings_drafts","key","site","Site settings",{value:form});if(pub)await saveRow("cms_settings","key","site","Site settings",{value:form});onNotice(pub?"Site settings published.":"Site settings draft saved.")}catch(e:any){onNotice(e.message)}}return <><div className="adminTop"><div><span>Global</span><h1>Site settings</h1><p>Event, contact and social details shared across the site.</p></div></div><section className="adminCard wide"><div className="adminTwo"><Field label="Event name" value={form.eventName} onChange={v=>set("eventName",v)}/><Field label="Dates" value={form.dates} onChange={v=>set("dates",v)}/><Field label="Venue" value={form.venue} onChange={v=>set("venue",v)}/><Field label="City" value={form.city} onChange={v=>set("city",v)}/><Field label="Opening hours" value={form.hours} onChange={v=>set("hours",v)}/><Field label="General email" value={form.infoEmail} onChange={v=>set("infoEmail",v)}/><Field label="Sales email" value={form.salesEmail} onChange={v=>set("salesEmail",v)}/><Field label="Phone 1" value={form.phone1} onChange={v=>set("phone1",v)}/><Field label="Phone 2" value={form.phone2} onChange={v=>set("phone2",v)}/><Field label="Facebook" value={form.facebook} onChange={v=>set("facebook",v)}/><Field label="Instagram" value={form.instagram} onChange={v=>set("instagram",v)}/></div><div className="adminActions"><button onClick={()=>save(false)}>Save Draft</button><button className="primary" onClick={()=>save(true)}>Publish</button></div></section></>}

function FormsEditor({onNotice}:{onNotice:(s:string)=>void}){const initial={contactTo:"info@iraqhomeexpo.com,qayszubaidi@gmail.com",salesTo:"sales@iraqhomeexpo.com,qayszubaidi@gmail.com"};const [form,setForm]=useState<Json>(initial);useEffect(()=>{(async()=>{try{const d=await getDraft("cms_private_settings_drafts","key","forms"),p=await getDraft("cms_private_settings","key","forms");setForm({...initial,...(d?.value||p?.value||{})})}catch(e:any){onNotice(e.message)}})()},[]);async function save(pub=false){try{await saveRow("cms_private_settings_drafts","key","forms","Form recipients",{value:form});if(pub)await saveRow("cms_private_settings","key","forms","Form recipients",{value:form});onNotice(pub?"Form recipients published.":"Form recipient draft saved.")}catch(e:any){onNotice(e.message)}}return <><div className="adminTop"><div><span>Private configuration</span><h1>Form delivery</h1><p>These addresses are admin-only and are not exposed through the public CMS API.</p></div></div><section className="adminCard wide"><Field label="Visitor + Contact recipients" value={form.contactTo} onChange={v=>setForm({...form,contactTo:v})}/><Field label="Exhibitor + Sponsor recipients" value={form.salesTo} onChange={v=>setForm({...form,salesTo:v})}/><p className="adminHelp">Use comma-separated email addresses.</p><div className="adminActions"><button onClick={()=>save(false)}>Save Draft</button><button className="primary" onClick={()=>save(true)}>Publish</button></div></section></>}
