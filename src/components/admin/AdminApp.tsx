"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminRest, getSession, signOut, uploadMedia } from "@/lib/cms/adminClient";
import { pageDefinitions, sectorDefinitions } from "@/lib/cms/adminConfig";
import { sectors as codeSectors, categoryDescriptions as codeCategoryDescriptions } from "@/data/site";

import SeoDashboard from "@/components/admin/SeoDashboard";
type Tab = "overview"|"pages"|"sectors"|"media"|"settings"|"forms"|"leads"|"seo"|"ai";
type Json = Record<string, any>;

const emptyPage = {eyebrow:"",title:"",copy:"",heroImage:"",heroAlt:"",heroPosition:"center center",primary:"",primaryHref:"",seoTitle:"",seoDescription:""};
const emptySector = {title:"",short:"",intro:[] as string[],image:"",heroImage:"",categories:[] as string[],categoryDescriptions:{} as Record<string,string>};

const pageFallbacks: Record<string, Json> = {
  home: {
    eyebrow:"Iraq Home Expo 2027",
    title:"Iraq\'s home & interiors market meets here.",
    copy:"An international exhibition connecting manufacturers, brands and professional buyers across Iraq's evolving home market.",
    heroImage:"/assets/hero-interior.webp", heroAlt:"Contemporary interior design", heroPosition:"center center",
    primary:"Visit the Expo", primaryHref:"/register/visitor",
    seoTitle:"Iraq Home Expo 2027", seoDescription:"An international exhibition connecting manufacturers, brands and professional buyers across Iraq's evolving home market."
  },
  about: {
    eyebrow:"Iraq Home Expo 2027",
    title:"Where design, products & business come together.",
    copy:"An international exhibition dedicated to products, technologies and solutions for the modern home.",
    heroImage:"/assets/hero-about-expo-generated.png", heroAlt:"Contemporary furniture and interiors exhibition hall with professional visitors and business meetings", heroPosition:"center center",
    primary:"Register", primaryHref:"/register",
    seoTitle:"About Iraq Home Expo", seoDescription:"Learn about Iraq Home Expo 2027, the international exhibition for home, interiors and residential solutions in Baghdad."
  },
  "why-iraq": {
    eyebrow:"Market Opportunity", title:"Why Iraq?",
    copy:"Growing urban demand, residential development and changing lifestyles are creating opportunity across Iraq’s home and residential sectors.",
    heroImage:"/assets/hero-why-iraq-baghdad.webp", heroAlt:"Baghdad cityscape and the Tigris River", heroPosition:"center center",
    primary:"Exhibit at Iraq Home Expo", primaryHref:"/exhibit",
    seoTitle:"Why Iraq? | Iraq Home Expo 2027", seoDescription:"Explore the market opportunity for home, interiors and residential products in Iraq."
  },
  sectors: {
    eyebrow:"The Complete Home Industry", title:"Exhibition Sectors",
    copy:"Eight focused industries spanning the products, technologies and solutions shaping modern residential environments.",
    heroImage:"/assets/hero-sectors-home.webp", heroAlt:"Whole-home view showcasing interior product categories", heroPosition:"center center",
    primary:"Exhibit with Us", primaryHref:"/exhibit",
    seoTitle:"Exhibition Sectors | Iraq Home Expo 2027", seoDescription:"Explore eight exhibition sectors covering interiors, furniture, textiles, kitchen, bathroom, lighting, HVAC and digital safety systems."
  },
  visit: {
    eyebrow:"Visitor Information", title:"Visit Iraq Home Expo 2027",
    copy:"Discover products, meet suppliers and connect with companies serving Iraq’s home, interiors and residential markets.",
    heroImage:"/assets/visit-hero-new.jpg", heroAlt:"Baghdad International Fair and surrounding exhibition grounds in Baghdad", heroPosition:"bottom center",
    primary:"Register to Visit", primaryHref:"/register/visitor",
    seoTitle:"Visit Iraq Home Expo", seoDescription:"Plan your visit to Iraq Home Expo 2027 at Baghdad International Fair."
  },
  exhibit: {
    eyebrow:"12–15 May 2027 · Baghdad", title:"Exhibit at Iraq Home Expo 2027",
    copy:"Present your products, meet professional buyers and build commercial relationships in Iraq’s developing home and residential market.",
    heroImage:"/assets/exhibit-hero-new.jpg", heroAlt:"Furniture and interiors exhibition hall with visitors and exhibitors", heroPosition:"center center",
    primary:"Register as an Exhibitor", primaryHref:"/register/exhibitor",
    seoTitle:"Exhibit at Iraq Home Expo", seoDescription:"Exhibit at Iraq Home Expo 2027 and meet professional buyers, distributors and industry decision-makers in Baghdad."
  },
  sponsor: {
    eyebrow:"Partnership Opportunities", title:"Become a Sponsor",
    copy:"Put your brand at the center of Iraq Home Expo 2027 and connect with the professional audience shaping Iraq's home and interiors market.",
    heroImage:"/assets/hero-sponsor-business.webp", heroAlt:"Contemporary business meeting environment", heroPosition:"bottom center",
    primary:"Discuss Sponsorship", primaryHref:"/register/exhibitor",
    seoTitle:"Become a Sponsor | Iraq Home Expo 2027", seoDescription:"Explore sponsorship opportunities at Iraq Home Expo 2027 in Baghdad."
  },
  contact: {
    eyebrow:"Get in Touch", title:"Contact Iraq Home Expo",
    copy:"Contact our team for visitor enquiries, exhibiting opportunities, registration support and general information.",
    heroImage:"/assets/build-partnerships.webp", heroAlt:"Business professionals building partnerships", heroPosition:"center center",
    primary:"", primaryHref:"",
    seoTitle:"Contact Iraq Home Expo", seoDescription:"Contact the Iraq Home Expo team for visitor, exhibitor, sponsorship and general enquiries."
  },
  register: {
    eyebrow:"Join Iraq Home Expo 2027", title:"Choose how you want to participate.",
    copy:"Choose visitor registration, or submit an exhibitor / sponsorship enquiry through the dedicated business participation form.",
    heroImage:"/assets/expo-event.webp", heroAlt:"Professional event and exhibition audience", heroPosition:"center center",
    primary:"Register to Visit", primaryHref:"/register/visitor",
    seoTitle:"Register for Iraq Home Expo", seoDescription:"Register to visit, exhibit or enquire about sponsorship at Iraq Home Expo 2027."
  }
};

function pageDefaults(key:string){ return {...emptyPage,...(pageFallbacks[key]||{})}; }
function mergeCmsContent(defaults:Json,...layers:(Json|undefined|null)[]){
  const out={...defaults};
  for(const layer of layers){
    if(!layer) continue;
    for(const [k,v] of Object.entries(layer)){
      if(v===undefined||v===null) continue;
      if(typeof v==="string" && v.trim()==="") continue;
      if(Array.isArray(v) && v.length===0) continue;
      out[k]=v;
    }
  }
  return out;
}
function sectorDefaults(slug:string){
  const s=codeSectors.find(x=>x.slug===slug);
  const descriptions=s?Object.fromEntries(s.categories.map(category=>[category,codeCategoryDescriptions[category]||""])):{};
  return s ? {...emptySector,title:s.title,short:s.short,intro:[...s.intro],image:s.image,heroImage:s.heroImage||s.image,categories:[...s.categories],categoryDescriptions:descriptions} : {...emptySector};
}

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
   ["forms","Forms","06"],
   ["leads","Leads","07"],
   ["seo","SEO & Analytics","08"],
   ["ai","AI Assistant","09"]
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
       {tab==="leads"&&<LeadsEditor onNotice={setNotice}/>}
       {tab==="seo"&&<SeoDashboard/>}
       {tab==="ai"&&<AiAssistant onNotice={setNotice}/>}
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
 const [key,setKey]=useState("home"), [form,setForm]=useState<Json>(pageDefaults("home")), [loading,setLoading]=useState(false), [published,setPublished]=useState<Json|null>(null), [history,setHistory]=useState<any[]>([]), [showHistory,setShowHistory]=useState(false);
 const label=pageDefinitions.find(x=>x[0]===key)?.[1]||key;
 async function load(k=key){
   setLoading(true);
   try{
     const [draft,pub]=await Promise.all([getDraft("cms_page_drafts","key",k),getDraft("cms_pages","key",k)]);
     const fallback=pageDefaults(k);
     setForm(mergeCmsContent(fallback,pub?.content,draft?.content));
     setPublished(pub?.content ? mergeCmsContent(fallback,pub.content) : null);
     try{setHistory(await adminRest<any[]>(`cms_page_revisions?key=eq.${encodeURIComponent(k)}&select=*&order=created_at.desc&limit=12`))}catch{setHistory([])}
   }catch(e:any){onNotice(e.message)}finally{setLoading(false)}
 }
 useEffect(()=>{setShowHistory(false);load(key)},[key]);
 const set=(k:string,v:any)=>setForm((f:Json)=>({...f,[k]:v}));
 async function save(){try{await saveRow("cms_page_drafts","key",key,label,{content:form});onNotice(`${label} draft saved.`)}catch(e:any){onNotice(e.message)}}
 async function publish(){
   try{
     const previous=await getDraft("cms_pages","key",key);
     if(previous?.content){
       try{await adminRest("cms_page_revisions",{method:"POST",body:JSON.stringify({key,label,content:previous.content})})}catch{}
     }
     await saveRow("cms_page_drafts","key",key,label,{content:form});
     await saveRow("cms_pages","key",key,label,{content:form});
     setPublished(form);
     try{setHistory(await adminRest<any[]>(`cms_page_revisions?key=eq.${encodeURIComponent(key)}&select=*&order=created_at.desc&limit=12`))}catch{}
     onNotice(`${label} published. Public cache updates within about 30 seconds.`)
   }catch(e:any){onNotice(e.message)}
 }
 function restoreDefaults(){setForm(pageDefaults(key));onNotice(`${label} fields restored to the website's code defaults. Save as draft or Publish to apply.`)}
 function restoreRevision(row:any){setForm(mergeCmsContent(pageDefaults(key),row.content));setShowHistory(false);onNotice(`Previous ${label} version loaded into the editor. It is not public until you Publish.`)}
 return <><div className="adminTop"><div><span>Content</span><h1>Page editor</h1><p>Current website values are pre-filled. Edit safely, save a draft, and publish only when approved.</p></div><select value={key} onChange={e=>setKey(e.target.value)}>{pageDefinitions.map(([k,l])=><option key={k} value={k}>{l}</option>)}</select></div>{loading?<div className="adminLoading">Loading…</div>:<div className="adminEditorGrid"><section className="adminCard"><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}><h2 style={{marginBottom:0}}>{label} hero</h2><div style={{display:"flex",gap:8}}><button type="button" className="adminUpload" style={{background:"#fff",color:"#075453"}} onClick={()=>setShowHistory(v=>!v)}>History</button><button type="button" className="adminUpload" style={{background:"#fff",color:"#075453"}} onClick={restoreDefaults}>Restore website defaults</button></div></div>{showHistory&&<div style={{margin:"18px 0",padding:16,border:"1px solid #ded7cc",borderRadius:7,background:"#f8f5ef"}}><strong style={{display:"block",fontSize:12,marginBottom:10}}>Previously published versions</strong>{history.length===0?<p style={{fontSize:12,color:"#766f68",margin:0}}>No earlier version has been stored yet. Version history begins with the next publish.</p>:<div style={{display:"grid",gap:8}}>{history.map(row=><button type="button" key={row.id} onClick={()=>restoreRevision(row)} style={{border:"1px solid #ddd4c7",background:"#fff",padding:"10px 12px",textAlign:"left",cursor:"pointer",borderRadius:5}}><b style={{display:"block",fontSize:11}}>{row.content?.title||label}</b><span style={{fontSize:10,color:"#7d756d"}}>{new Date(row.created_at).toLocaleString()}</span></button>)}</div>}</div>}<div style={{marginTop:20}}><Field label="Eyebrow" value={form.eyebrow} onChange={v=>set("eyebrow",v)}/><Field label="Title" value={form.title} onChange={v=>set("title",v)}/><Field label="Description" multiline value={form.copy} onChange={v=>set("copy",v)}/><Field label="Hero image URL" value={form.heroImage} onChange={v=>set("heroImage",v)} placeholder="/assets/image.webp or media URL"/><Field label="Image alt text" value={form.heroAlt} onChange={v=>set("heroAlt",v)}/><Field label="Image position" value={form.heroPosition} onChange={v=>set("heroPosition",v)} placeholder="center center / bottom center"/><div className="adminTwo"><Field label="CTA label" value={form.primary} onChange={v=>set("primary",v)}/><Field label="CTA link" value={form.primaryHref} onChange={v=>set("primaryHref",v)}/></div><h3>SEO</h3><Field label="SEO title" value={form.seoTitle} onChange={v=>set("seoTitle",v)}/><Field label="SEO description" multiline value={form.seoDescription} onChange={v=>set("seoDescription",v)}/><div className="adminActions"><button onClick={save}>Save Draft</button><button className="primary" onClick={publish}>Publish</button></div></div></section><aside className="adminPreview"><span>Status</span><strong>{published?"Published CMS content":"Using website defaults"}</strong><p>Hero image</p>{form.heroImage?<img src={form.heroImage} alt="Preview"/>:<div className="adminEmptyPreview">Choose an image from Media Library and paste its URL here.</div>}</aside></div>}</>
}


function SectorImageControl({
  label,value,onChange,onNotice,ratio="16 / 9"
}:{
  label:string;value:string;onChange:(v:string)=>void;onNotice:(s:string)=>void;ratio?:string
}){
  const [busy,setBusy]=useState(false);
  const [open,setOpen]=useState(false);
  const [items,setItems]=useState<any[]>([]);
  const [loadingMedia,setLoadingMedia]=useState(false);

  async function upload(file?:File){
    if(!file) return;
    setBusy(true);
    try{
      const url=await uploadMedia(file);
      onChange(url);
      onNotice(`${label} uploaded and selected.`);
    }catch(e:any){
      onNotice(e.message);
    }finally{
      setBusy(false);
    }
  }

  async function browse(){
    setOpen(true);
    setLoadingMedia(true);
    try{
      setItems(await adminRest<any[]>("media_assets?select=*&order=created_at.desc"));
    }catch(e:any){
      onNotice(e.message);
    }finally{
      setLoadingMedia(false);
    }
  }

  return <div className="adminImageControl">
    <div className="adminImageControlHead">
      <div>
        <span>{label}</span>
        <small>Upload a new image or choose one from the Media Library.</small>
      </div>
      {value&&<button type="button" className="adminImageRemove" onClick={()=>onChange("")}>Clear</button>}
    </div>

    <div className="adminImagePreview" style={{aspectRatio:ratio}}>
      {value
        ? <img src={value} alt={`${label} preview`} />
        : <div className="adminImagePlaceholder"><span>Image preview</span><small>No image selected</small></div>}
    </div>

    <div className="adminImageControlActions">
      <label className="adminImageUpload">
        {busy?"Uploading…":"Upload image"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          disabled={busy}
          onChange={e=>upload(e.target.files?.[0])}
        />
      </label>
      <button type="button" onClick={browse}>Choose from Media</button>
    </div>

    <details className="adminImageAdvanced">
      <summary>Advanced: image URL</summary>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder="/assets/image.webp or media URL"/>
    </details>

    {open&&<div className="adminMediaPickerBackdrop" onClick={()=>setOpen(false)}>
      <div className="adminMediaPicker" onClick={e=>e.stopPropagation()}>
        <div className="adminMediaPickerHead">
          <div><span>Media Library</span><h3>Choose {label.toLowerCase()}</h3></div>
          <button type="button" onClick={()=>setOpen(false)}>×</button>
        </div>
        {loadingMedia
          ? <div className="adminLoading">Loading media…</div>
          : items.length
            ? <div className="adminMediaPickerGrid">
                {items.map(item=><button
                  type="button"
                  key={item.id}
                  className={item.public_url===value?"selected":""}
                  onClick={()=>{onChange(item.public_url);setOpen(false);onNotice(`${label} selected from Media Library.`)}}
                >
                  <img src={item.public_url} alt={item.name||"Media image"}/>
                  <span>{item.name||"Image"}</span>
                </button>)}
              </div>
            : <div className="adminEmptyPreview">No uploaded media yet. Use “Upload image” first, or add images in Media Library.</div>}
      </div>
    </div>}
  </div>
}

function SectorsEditor({onNotice}:{onNotice:(s:string)=>void}){
 const [slug,setSlug]=useState("interiors"),[form,setForm]=useState<Json>(sectorDefaults("interiors")),[loading,setLoading]=useState(false); const label=sectorDefinitions.find(x=>x[0]===slug)?.[1]||slug;
 async function load(){setLoading(true);try{const [draft,pub]=await Promise.all([getDraft("cms_sector_drafts","slug",slug),getDraft("cms_sectors","slug",slug)]);const fallback=sectorDefaults(slug);const c=mergeCmsContent(fallback,pub?.content,draft?.content);const categories=Array.isArray(c.categories)&&c.categories.length?c.categories:fallback.categories;const intro=Array.isArray(c.intro)&&c.intro.length?c.intro:fallback.intro;const descriptions={...(fallback.categoryDescriptions||{}),...(c.categoryDescriptions||{})};setForm({...c,intro,categories,categoryDescriptions:descriptions})}catch(e:any){onNotice(e.message)}finally{setLoading(false)}}
 useEffect(()=>{load()},[slug]); const set=(k:string,v:any)=>setForm((f:Json)=>({...f,[k]:v})); const setCategoryDescription=(category:string,value:string)=>setForm((f:Json)=>({...f,categoryDescriptions:{...(f.categoryDescriptions||{}),[category]:value}}));
 async function save(publish=false){try{await saveRow("cms_sector_drafts","slug",slug,label,{content:form});if(publish)await saveRow("cms_sectors","slug",slug,label,{content:form});onNotice(`${label} ${publish?"published":"draft saved"}.`)}catch(e:any){onNotice(e.message)}}
 return <><div className="adminTop"><div><span>Exhibition</span><h1>Sector editor</h1><p>Control card images, sector hero images and sector copy.</p></div><select value={slug} onChange={e=>setSlug(e.target.value)}>{sectorDefinitions.map(([k,l])=><option key={k} value={k}>{l}</option>)}</select></div>{loading?<div className="adminLoading">Loading…</div>:<section className="adminCard wide"><Field label="Sector title" value={form.title} onChange={v=>set("title",v)}/><Field label="Short description" multiline value={form.short} onChange={v=>set("short",v)}/><Field label="Sector introduction — separate paragraphs with a blank line" multiline value={(form.intro||[]).join("\n\n")} onChange={v=>set("intro",v.split(/\n\s*\n/).map((x:string)=>x.trim()).filter(Boolean))}/><div className="adminSectorImageGrid"><SectorImageControl label="Card cover image" value={form.image} onChange={v=>set("image",v)} onNotice={onNotice} ratio="4 / 5"/><SectorImageControl label="Hero image" value={form.heroImage} onChange={v=>set("heroImage",v)} onNotice={onNotice} ratio="16 / 9"/></div><Field label="Product categories — one per line" multiline value={(form.categories||[]).join("\n")} onChange={v=>set("categories",v.split("\n").map((x:string)=>x.trim()).filter(Boolean))}/><div className="adminCategoryDescriptions"><div className="adminCategoryDescriptionsHead"><span>Category copy</span><h3>Product category descriptions</h3><p>Descriptions are stored separately from the category-name list, so categories remain compatible with the CMS editor and structured data.</p></div><div className="adminCategoryDescriptionGrid">{(form.categories||[]).map((category:string,i:number)=><label className="adminCategoryDescriptionItem" key={category}><div><span>{String(i+1).padStart(2,"0")}</span><strong>{category}</strong></div><textarea value={form.categoryDescriptions?.[category]||""} onChange={e=>setCategoryDescription(category,e.target.value)} placeholder={`Description for ${category}`}/></label>)}</div></div><div className="adminActions"><button onClick={()=>save(false)}>Save Draft</button><button className="primary" onClick={()=>save(true)}>Publish</button></div></section>}</>
}

function MediaLibrary({onNotice}:{onNotice:(s:string)=>void}){
 const [items,setItems]=useState<any[]>([]),[busy,setBusy]=useState(false); async function load(){try{setItems(await adminRest<any[]>("media_assets?select=*&order=created_at.desc"))}catch(e:any){onNotice(e.message)}} useEffect(()=>{load()},[]);
 async function upload(file?:File){if(!file)return;setBusy(true);try{const url=await uploadMedia(file);await load();await navigator.clipboard?.writeText(url);onNotice("Image uploaded. Public URL copied to clipboard.")}catch(e:any){onNotice(e.message)}finally{setBusy(false)}}
 return <><div className="adminTop"><div><span>Assets</span><h1>Media library</h1><p>Upload website images and reuse their public URLs in page and sector editors.</p></div><label className="adminUpload">{busy?"Uploading…":"Upload image"}<input type="file" accept="image/*" disabled={busy} onChange={e=>upload(e.target.files?.[0])}/></label></div><div className="adminMediaGrid">{items.map(item=><article key={item.id}><img src={item.public_url} alt={item.name}/><div><strong>{item.name}</strong><button onClick={()=>{navigator.clipboard.writeText(item.public_url);onNotice("Image URL copied.")}}>Copy URL</button></div></article>)}</div></>
}

const emptySettings={eventName:"Iraq Home Expo 2027",dates:"12–15 May 2027",venue:"Baghdad International Fair",city:"Baghdad, Iraq",hours:"11:00 AM – 6:00 PM",infoEmail:"info@iraqhomeexpo.com",salesEmail:"sales@iraqhomeexpo.com",phone1:"+964 782 445 5860",phone2:"+964 770 255 0297",facebook:"https://www.facebook.com/profile.php?id=61591852047921",instagram:"https://www.instagram.com/iraqhomeexpo/"};
function SettingsEditor({onNotice}:{onNotice:(s:string)=>void}){const [form,setForm]=useState<Json>(emptySettings);useEffect(()=>{(async()=>{try{const d=await getDraft("cms_settings_drafts","key","site"),p=await getDraft("cms_settings","key","site");setForm({...emptySettings,...(d?.value||p?.value||{})})}catch(e:any){onNotice(e.message)}})()},[]);const set=(k:string,v:string)=>setForm(f=>({...f,[k]:v}));async function save(pub=false){try{await saveRow("cms_settings_drafts","key","site","Site settings",{value:form});if(pub)await saveRow("cms_settings","key","site","Site settings",{value:form});onNotice(pub?"Site settings published.":"Site settings draft saved.")}catch(e:any){onNotice(e.message)}}return <><div className="adminTop"><div><span>Global</span><h1>Site settings</h1><p>Event, contact and social details shared across the site.</p></div></div><section className="adminCard wide"><div className="adminTwo"><Field label="Event name" value={form.eventName} onChange={v=>set("eventName",v)}/><Field label="Dates" value={form.dates} onChange={v=>set("dates",v)}/><Field label="Venue" value={form.venue} onChange={v=>set("venue",v)}/><Field label="City" value={form.city} onChange={v=>set("city",v)}/><Field label="Opening hours" value={form.hours} onChange={v=>set("hours",v)}/><Field label="General email" value={form.infoEmail} onChange={v=>set("infoEmail",v)}/><Field label="Sales email" value={form.salesEmail} onChange={v=>set("salesEmail",v)}/><Field label="Phone 1" value={form.phone1} onChange={v=>set("phone1",v)}/><Field label="Phone 2" value={form.phone2} onChange={v=>set("phone2",v)}/><Field label="Facebook" value={form.facebook} onChange={v=>set("facebook",v)}/><Field label="Instagram" value={form.instagram} onChange={v=>set("instagram",v)}/></div><div className="adminActions"><button onClick={()=>save(false)}>Save Draft</button><button className="primary" onClick={()=>save(true)}>Publish</button></div></section></>}


type LeadRow={
  id:string; form_type:"visitor"|"exhibitor"|"contact"; status:"new"|"contacted"|"archived";
  name?:string; company?:string; email:string; phone?:string; country?:string; subject?:string;
  participation_type?:string; data?:Json; email_sent:boolean; delivery_error?:string;
  source?:string; created_at:string; updated_at:string;
};

function LeadsEditor({onNotice}:{onNotice:(s:string)=>void}){
  const [rows,setRows]=useState<LeadRow[]>([]);
  const [loading,setLoading]=useState(true);
  const [query,setQuery]=useState("");
  const [type,setType]=useState("all");
  const [status,setStatus]=useState("active");
  const [selected,setSelected]=useState<LeadRow|null>(null);

  async function load(){
    setLoading(true);
    try{
      const data=await adminRest<LeadRow[]>("form_leads?select=*&order=created_at.desc&limit=500");
      setRows(data||[]);
    }catch(e:any){onNotice(e.message)}
    finally{setLoading(false)}
  }
  useEffect(()=>{load()},[]);

  async function setLeadStatus(lead:LeadRow,next:LeadRow["status"]){
    try{
      await adminRest(`form_leads?id=eq.${encodeURIComponent(lead.id)}`,{
        method:"PATCH",
        body:JSON.stringify({status:next,updated_at:new Date().toISOString()})
      });
      setRows(list=>list.map(x=>x.id===lead.id?{...x,status:next,updated_at:new Date().toISOString()}:x));
      setSelected(current=>current?.id===lead.id?{...current,status:next}:current);
      onNotice(`Lead marked ${next}.`);
    }catch(e:any){onNotice(e.message)}
  }

  const q=query.trim().toLowerCase();
  const filtered=rows.filter(row=>{
    if(type!=="all"&&row.form_type!==type)return false;
    if(status==="active"&&row.status==="archived")return false;
    if(status!=="all"&&status!=="active"&&row.status!==status)return false;
    if(!q)return true;
    return [row.name,row.company,row.email,row.phone,row.country,row.subject,row.participation_type]
      .some(v=>String(v||"").toLowerCase().includes(q));
  });

  const counts={
    total:rows.filter(x=>x.status!=="archived").length,
    new:rows.filter(x=>x.status==="new").length,
    exhibitors:rows.filter(x=>x.form_type==="exhibitor"&&x.status!=="archived").length,
    visitors:rows.filter(x=>x.form_type==="visitor"&&x.status!=="archived").length,
  };

  function exportCsv(){
    const headers=["Date","Type","Status","Name","Company","Email","Phone","Country","Participation","Subject","Email Sent"];
    const escape=(v:any)=>`"${String(v??"").replace(/"/g,'""')}"`;
    const lines=filtered.map(r=>[
      new Date(r.created_at).toISOString(),r.form_type,r.status,r.name,r.company,r.email,r.phone,r.country,
      r.participation_type,r.subject,r.email_sent?"Yes":"No"
    ].map(escape).join(","));
    const blob=new Blob([[headers.map(escape).join(","),...lines].join("\n")],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=`iraq-home-expo-leads-${new Date().toISOString().slice(0,10)}.csv`;a.click();
    URL.revokeObjectURL(url);
  }

  const labelFor=(k:string)=>k.replace(/([A-Z])/g," $1").replace(/^./,c=>c.toUpperCase());

  return <>
    <div className="adminTop">
      <div><span>CRM</span><h1>Website leads</h1><p>Visitor registrations, exhibitor/sponsor enquiries and contact submissions in one place.</p></div>
      <div className="adminLeadTopActions"><button onClick={load}>Refresh</button><button className="primary" onClick={exportCsv}>Export CSV</button></div>
    </div>

    <div className="adminLeadMetrics">
      <div><strong>{counts.total}</strong><span>Active leads</span></div>
      <div><strong>{counts.new}</strong><span>New</span></div>
      <div><strong>{counts.exhibitors}</strong><span>Exhibitor / Sponsor</span></div>
      <div><strong>{counts.visitors}</strong><span>Visitor registrations</span></div>
    </div>

    <section className="adminCard adminLeadCard">
      <div className="adminLeadFilters">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name, company, email or phone…" />
        <select value={type} onChange={e=>setType(e.target.value)}>
          <option value="all">All form types</option><option value="visitor">Visitors</option>
          <option value="exhibitor">Exhibitors / Sponsors</option><option value="contact">Contact enquiries</option>
        </select>
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="active">Active</option><option value="new">New</option>
          <option value="contacted">Contacted</option><option value="archived">Archived</option><option value="all">All</option>
        </select>
      </div>

      {loading?<div className="adminLoading">Loading leads…</div>:filtered.length===0?
        <div className="adminLeadEmpty">No leads match the current filters.</div>:
        <div className="adminLeadTableWrap"><table className="adminLeadTable">
          <thead><tr><th>Lead</th><th>Type</th><th>Company</th><th>Contact</th><th>Received</th><th>Status</th></tr></thead>
          <tbody>{filtered.map(row=><tr key={row.id} onClick={()=>setSelected(row)}>
            <td><strong>{row.name||"Unnamed lead"}</strong><span>{row.country||"—"}</span></td>
            <td><span className={`leadType leadType--${row.form_type}`}>{row.form_type==="exhibitor"?(row.participation_type||"Exhibitor"):row.form_type}</span></td>
            <td>{row.company||"—"}</td>
            <td><a href={`mailto:${row.email}`} onClick={e=>e.stopPropagation()}>{row.email}</a><span>{row.phone||""}</span></td>
            <td>{new Date(row.created_at).toLocaleDateString()}<span>{new Date(row.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span></td>
            <td><span className={`leadStatus leadStatus--${row.status}`}>{row.status}</span></td>
          </tr>)}</tbody>
        </table></div>}
    </section>

    {selected&&<div className="adminLeadDrawerBackdrop" onClick={()=>setSelected(null)}>
      <aside className="adminLeadDrawer" onClick={e=>e.stopPropagation()}>
        <div className="adminLeadDrawerHead">
          <div><span>{selected.form_type} lead</span><h2>{selected.name||selected.company||"Lead details"}</h2><p>{new Date(selected.created_at).toLocaleString()}</p></div>
          <button onClick={()=>setSelected(null)}>×</button>
        </div>
        <div className="adminLeadQuick">
          <a href={`mailto:${selected.email}`}>Email</a>
          {selected.phone&&<a href={`tel:${selected.phone}`}>Call</a>}
          {selected.status!=="contacted"&&<button onClick={()=>setLeadStatus(selected,"contacted")}>Mark Contacted</button>}
          {selected.status==="contacted"&&<button onClick={()=>setLeadStatus(selected,"new")}>Mark New</button>}
        </div>

        <div className="adminLeadDetailGrid">
          <div><span>Email</span><strong>{selected.email}</strong></div>
          <div><span>Phone</span><strong>{selected.phone||"—"}</strong></div>
          <div><span>Company</span><strong>{selected.company||"—"}</strong></div>
          <div><span>Country</span><strong>{selected.country||"—"}</strong></div>
          {selected.participation_type&&<div><span>Participation</span><strong>{selected.participation_type}</strong></div>}
          {selected.subject&&<div><span>Subject</span><strong>{selected.subject}</strong></div>}
          <div><span>Email delivery</span><strong>{selected.email_sent?"Sent":"Not confirmed"}</strong></div>
          <div><span>Status</span><strong>{selected.status}</strong></div>
        </div>

        {selected.delivery_error&&<div className="adminLeadDeliveryError"><b>Email delivery error</b><span>{selected.delivery_error}</span></div>}

        <section className="adminLeadSubmission">
          <span>Submitted form</span>
          <div>{Object.entries(selected.data||{}).filter(([k])=>k!=="consent").map(([k,v])=><div key={k}><b>{labelFor(k)}</b><p>{Array.isArray(v)?v.join(", "):String(v||"—")}</p></div>)}</div>
        </section>

        <div className="adminLeadDrawerFooter">
          {selected.status!=="archived"?<button onClick={()=>setLeadStatus(selected,"archived")}>Archive lead</button>:<button onClick={()=>setLeadStatus(selected,"new")}>Restore lead</button>}
        </div>
      </aside>
    </div>}
  </>
}

function FormsEditor({onNotice}:{onNotice:(s:string)=>void}){const initial={contactTo:"info@iraqhomeexpo.com,qayszubaidi@gmail.com",salesTo:"sales@iraqhomeexpo.com,qayszubaidi@gmail.com"};const [form,setForm]=useState<Json>(initial);useEffect(()=>{(async()=>{try{const d=await getDraft("cms_private_settings_drafts","key","forms"),p=await getDraft("cms_private_settings","key","forms");setForm({...initial,...(d?.value||p?.value||{})})}catch(e:any){onNotice(e.message)}})()},[]);async function save(pub=false){try{await saveRow("cms_private_settings_drafts","key","forms","Form recipients",{value:form});if(pub)await saveRow("cms_private_settings","key","forms","Form recipients",{value:form});onNotice(pub?"Form recipients published.":"Form recipient draft saved.")}catch(e:any){onNotice(e.message)}}return <><div className="adminTop"><div><span>Private configuration</span><h1>Form delivery</h1><p>These addresses are admin-only and are not exposed through the public CMS API.</p></div></div><section className="adminCard wide"><Field label="Visitor + Contact recipients" value={form.contactTo} onChange={v=>setForm({...form,contactTo:v})}/><Field label="Exhibitor + Sponsor recipients" value={form.salesTo} onChange={v=>setForm({...form,salesTo:v})}/><p className="adminHelp">Use comma-separated email addresses.</p><div className="adminActions"><button onClick={()=>save(false)}>Save Draft</button><button className="primary" onClick={()=>save(true)}>Publish</button></div></section></>}


type AiMode="ask"|"change"|"audit"|"developer";
type AiOperation={target:"page"|"sector"|"settings";key:string;label:string;fields:{field:string;value:string}[]};
type AiResult={
  reply:string;
  operations:AiOperation[];
  developer_plan:{title:string;summary:string;files:string[];steps:string[];risk:string;requires_git:boolean};
};

function AiAssistant({onNotice}:{onNotice:(s:string)=>void}){
  const [mode,setMode]=useState<AiMode>("ask");
  const [message,setMessage]=useState("");
  const [busy,setBusy]=useState(false);
  const [result,setResult]=useState<AiResult|null>(null);
  const [model,setModel]=useState("");
  const [applied,setApplied]=useState(false);

  async function run(){
    if(!message.trim()) return;
    const session=getSession();
    if(!session?.access_token){onNotice("Your admin session expired. Sign in again.");return}
    setBusy(true);setApplied(false);
    try{
      const response=await fetch("/api/admin/ai",{
        method:"POST",
        headers:{"Content-Type":"application/json",Authorization:`Bearer ${session.access_token}`},
        body:JSON.stringify({mode,message})
      });
      const payload=await response.json();
      if(!response.ok) throw new Error(payload?.error||"AI request failed.");
      setResult(payload.result);
      setModel(payload.model||"");
    }catch(e:any){onNotice(e.message)}
    finally{setBusy(false)}
  }

  function fieldsToObject(fields:{field:string;value:string}[]){
    const out:Json={};
    for(const item of fields){
      if(item.field==="categories") out[item.field]=item.value.split("\\n").map(x=>x.trim()).filter(Boolean);
      else out[item.field]=item.value;
    }
    return out;
  }

  async function applyDrafts(){
    if(!result?.operations?.length)return;
    setBusy(true);
    try{
      for(const op of result.operations){
        if(op.target==="page"){
          const draft=await getDraft("cms_page_drafts","key",op.key);
          const published=await getDraft("cms_pages","key",op.key);
          const base=mergeCmsContent(pageDefaults(op.key),published?.content,draft?.content);
          const next={...base,...fieldsToObject(op.fields)};
          await saveRow("cms_page_drafts","key",op.key,op.label||op.key,{content:next});
        }else if(op.target==="sector"){
          const draft=await getDraft("cms_sector_drafts","slug",op.key);
          const published=await getDraft("cms_sectors","slug",op.key);
          const base=mergeCmsContent(sectorDefaults(op.key),published?.content,draft?.content);
          const next={...base,...fieldsToObject(op.fields)};
          await saveRow("cms_sector_drafts","slug",op.key,op.label||op.key,{content:next});
        }else if(op.target==="settings"){
          const draft=await getDraft("cms_settings_drafts","key",op.key);
          const published=await getDraft("cms_settings","key",op.key);
          const base={...(published?.value||{}),...(draft?.value||{})};
          const next={...base,...fieldsToObject(op.fields)};
          await saveRow("cms_settings_drafts","key",op.key,op.label||op.key,{value:next});
        }
      }
      setApplied(true);
      onNotice("AI changes saved to drafts only. Review them in Pages, Sectors or Site Settings before publishing.");
    }catch(e:any){onNotice(e.message)}
    finally{setBusy(false)}
  }

  const examples:Record<AiMode,string[]>={
    ask:[
      "Which pages still use the same image?",
      "What is currently configured for the About page?"
    ],
    change:[
      "Change the About hero copy to be more concise, but keep the existing title and image.",
      "Use the newest suitable media image for the Kitchen card and save it as a draft."
    ],
    audit:[
      "Audit the site for duplicated imagery, empty SEO fields and inconsistent contact details.",
      "Check the eight sectors for missing or weak content."
    ],
    developer:[
      "Add a countdown timer to the Home page for 12 May 2027.",
      "Add a cinematic video section below the About hero with subtle scroll animation."
    ]
  };

  return <>
    <div className="adminTop">
      <div><span>Controlled AI</span><h1>AI website assistant</h1><p>Ask about the site, prepare CMS drafts, run audits, or plan new website features.</p></div>
    </div>

    <section className="adminAiLayout">
      <div className="adminAiComposer adminCard">
        <div className="adminAiModes">
          {([
            ["ask","Ask"],
            ["change","Make Changes"],
            ["audit","Audit Website"],
            ["developer","Developer"]
          ] as [AiMode,string][]).map(([k,l])=><button type="button" key={k} className={mode===k?"active":""} onClick={()=>{setMode(k);setResult(null);setApplied(false)}}>{l}</button>)}
        </div>

        <div className="adminAiModeIntro">
          <strong>{mode==="ask"?"Ask about the website":mode==="change"?"Create safe CMS drafts":mode==="audit"?"Inspect the website content": "Plan a new code feature"}</strong>
          <span>{mode==="developer"?"Developer mode creates a code implementation plan. It does not push code or deploy automatically.":"AI never publishes automatically. Proposed content changes are saved to Draft first."}</span>
        </div>

        <textarea className="adminAiInput" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Tell the assistant what you want to do…" />

        <div className="adminAiExamples">
          <span>Try:</span>
          {examples[mode].map(x=><button type="button" key={x} onClick={()=>setMessage(x)}>{x}</button>)}
        </div>

        <div className="adminAiSendRow">
          <span>Admin-authenticated · server-side AI key</span>
          <button className="adminPrimaryAction" type="button" disabled={busy||!message.trim()} onClick={run}>{busy?"Working…":"Send to AI"} <span>→</span></button>
        </div>
      </div>

      <aside className="adminAiSafety">
        <span>Safety model</span>
        <h3>Draft first. Publish yourself.</h3>
        <p>CMS requests can be prepared automatically, but the live site changes only after you review and press Publish.</p>
        <ul>
          <li>AI cannot access your Supabase service key in the browser.</li>
          <li>AI cannot publish CMS content automatically.</li>
          <li>Developer mode does not change Git or deploy code.</li>
          <li>Existing design rules stay protected.</li>
        </ul>
      </aside>
    </section>

    {result&&<section className="adminAiResult">
      <div className="adminCard">
        <div className="adminAiResultHead"><div><span>AI response</span>{model&&<small>{model}</small>}</div></div>
        <p className="adminAiReply">{result.reply}</p>

        {!!result.operations?.length&&<>
          <h3>Proposed CMS changes</h3>
          <div className="adminAiOperations">
            {result.operations.map((op,i)=><article key={`${op.target}-${op.key}-${i}`}>
              <div><span>{op.target}</span><strong>{op.label||op.key}</strong></div>
              <ul>{op.fields.map((f,j)=><li key={`${f.field}-${j}`}><b>{f.field}</b><span>{f.value}</span></li>)}</ul>
            </article>)}
          </div>
          <div className="adminActions">
            <button type="button" onClick={()=>setResult(null)}>Discard</button>
            <button type="button" className="primary" disabled={busy||applied} onClick={applyDrafts}>{applied?"Saved to Drafts":"Apply to Drafts"}</button>
          </div>
        </>}

        {mode==="developer"&&result.developer_plan?.title&&<>
          <h3>Developer implementation plan</h3>
          <div className="adminDeveloperPlan">
            <strong>{result.developer_plan.title}</strong>
            <p>{result.developer_plan.summary}</p>
            {!!result.developer_plan.files?.length&&<div><span>Likely files</span><ul>{result.developer_plan.files.map(x=><li key={x}>{x}</li>)}</ul></div>}
            {!!result.developer_plan.steps?.length&&<div><span>Implementation</span><ol>{result.developer_plan.steps.map(x=><li key={x}>{x}</li>)}</ol></div>}
            <div className="adminDeveloperRisk"><b>Risk / review</b><span>{result.developer_plan.risk}</span></div>
          </div>
        </>}
      </div>
    </section>}
  </>
}
