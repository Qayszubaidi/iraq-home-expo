from pathlib import Path


def replace_once(path: str, old: str, new: str):
    p = Path(path)
    text = p.read_text()
    if old not in text:
        raise SystemExit(f"Expected pattern not found in {path}: {old[:100]!r}")
    p.write_text(text.replace(old, new, 1))


replace_once(
    "src/lib/cms/public.ts",
    "export type CmsSectorContent = {\n  title?: string;\n  short?: string;\n  image?: string;\n  heroImage?: string;\n  categories?: string[];\n};",
    "export type CmsSectorContent = {\n  title?: string;\n  short?: string;\n  intro?: string[];\n  image?: string;\n  heroImage?: string;\n  categories?: string[];\n  categoryDescriptions?: Record<string,string>;\n};",
)

replace_once(
    "src/app/sectors/[slug]/page.tsx",
    "export default async function SectorPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const base=sectors.find(x=>x.slug===slug);if(!base)notFound();const override=await getCmsSector(slug);const s={...base,...(override||{})};const displaySectors=await getCmsSectors(sectors);const related=displaySectors.filter(x=>x.slug!==s.slug).slice(0,3);",
    "export default async function SectorPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const base=sectors.find(x=>x.slug===slug);if(!base)notFound();const override=await getCmsSector(slug);const s={...base,...(override||{})};const sectorIntro=Array.isArray(s.intro)&&s.intro.length?s.intro:base.intro;const sectorCategoryDescriptions={...categoryDescriptions,...(s.categoryDescriptions||{})};const displaySectors=await getCmsSectors(sectors);const related=displaySectors.filter(x=>x.slug!==s.slug).slice(0,3);",
)

replace_once(
    "src/app/sectors/[slug]/page.tsx",
    "<section className=\"sectorDetail\"><div><span className=\"eyebrow dark\">{s.title}</span><h2>{s.title} at Iraq Home Expo 2027</h2>{(base.intro??[]).map((p,i)=><p key={i}>{p}</p>)}</div></section>\n<section className=\"sectorDetail\"><div><span className=\"eyebrow dark\">Product Categories</span><h2>Explore {s.title}</h2><p>Discover {s.title.toLowerCase()} products, systems and solutions represented at <Link className=\"seoTextLink\" href=\"/about\">Iraq Home Expo 2027</Link>, an international exhibition connecting suppliers with professional buyers at <Link className=\"seoTextLink\" href=\"/visit\">Baghdad International Fair</Link>.</p></div><div className=\"categoryGrid\">{s.categories.map((c,i)=><div className=\"category\" key={c}><span>{String(i+1).padStart(2,\"0\")}</span><h3>{c}</h3>{categoryDescriptions[c]?<p>{categoryDescriptions[c]}</p>:null}</div>)}</div></section>",
    "<section className=\"sectorIntro\"><div className=\"sectorIntroHeading\"><span className=\"eyebrow dark\">Sector overview</span><h2>{s.title} at Iraq Home Expo 2027</h2></div><div className=\"sectorIntroCopy\">{sectorIntro.map((p,i)=><p key={i}>{p}</p>)}</div></section>\n<section className=\"sectorCatalog\"><div className=\"sectorCatalogIntro\"><span className=\"eyebrow dark\">Product Categories</span><h2>Explore {s.title}</h2><p>Discover {s.title.toLowerCase()} products, systems and solutions represented at <Link className=\"seoTextLink\" href=\"/about\">Iraq Home Expo 2027</Link>, an international exhibition connecting suppliers with professional buyers at <Link className=\"seoTextLink\" href=\"/visit\">Baghdad International Fair</Link>.</p><span className=\"sectorCategoryCount\">{s.categories.length} product categories</span></div><div className=\"categoryGrid\">{s.categories.map((c,i)=><article className=\"category\" key={c}><span className=\"categoryNumber\">{String(i+1).padStart(2,\"0\")}</span><div className=\"categoryBody\"><h3>{c}</h3>{sectorCategoryDescriptions[c]?<p>{sectorCategoryDescriptions[c]}</p>:null}</div></article>)}</div></section>",
)

replace_once(
    "src/components/admin/AdminApp.tsx",
    'import { sectors as codeSectors } from "@/data/site";',
    'import { sectors as codeSectors, categoryDescriptions as codeCategoryDescriptions } from "@/data/site";',
)
replace_once(
    "src/components/admin/AdminApp.tsx",
    'const emptySector = {title:"",short:"",image:"",heroImage:"",categories:[] as string[]};',
    'const emptySector = {title:"",short:"",intro:[] as string[],image:"",heroImage:"",categories:[] as string[],categoryDescriptions:{} as Record<string,string>};',
)
replace_once(
    "src/components/admin/AdminApp.tsx",
    '  return s ? {...emptySector,title:s.title,short:s.short,image:s.image,heroImage:s.heroImage||s.image,categories:[...s.categories]} : {...emptySector};',
    '  const descriptions=s?Object.fromEntries(s.categories.map(category=>[category,codeCategoryDescriptions[category]||""])):{};\n  return s ? {...emptySector,title:s.title,short:s.short,intro:[...s.intro],image:s.image,heroImage:s.heroImage||s.image,categories:[...s.categories],categoryDescriptions:descriptions} : {...emptySector};',
)
replace_once(
    "src/components/admin/AdminApp.tsx",
    ' async function load(){setLoading(true);try{const [draft,pub]=await Promise.all([getDraft("cms_sector_drafts","slug",slug),getDraft("cms_sectors","slug",slug)]);const fallback=sectorDefaults(slug);const c=mergeCmsContent(fallback,pub?.content,draft?.content);setForm({...c,categories:Array.isArray(c.categories)&&c.categories.length?c.categories:fallback.categories})}catch(e:any){onNotice(e.message)}finally{setLoading(false)}}',
    ' async function load(){setLoading(true);try{const [draft,pub]=await Promise.all([getDraft("cms_sector_drafts","slug",slug),getDraft("cms_sectors","slug",slug)]);const fallback=sectorDefaults(slug);const c=mergeCmsContent(fallback,pub?.content,draft?.content);const categories=Array.isArray(c.categories)&&c.categories.length?c.categories:fallback.categories;const intro=Array.isArray(c.intro)&&c.intro.length?c.intro:fallback.intro;const descriptions={...(fallback.categoryDescriptions||{}),...(c.categoryDescriptions||{})};setForm({...c,intro,categories,categoryDescriptions:descriptions})}catch(e:any){onNotice(e.message)}finally{setLoading(false)}}',
)
replace_once(
    "src/components/admin/AdminApp.tsx",
    ' useEffect(()=>{load()},[slug]); const set=(k:string,v:any)=>setForm((f:Json)=>({...f,[k]:v}));',
    ' useEffect(()=>{load()},[slug]); const set=(k:string,v:any)=>setForm((f:Json)=>({...f,[k]:v})); const setCategoryDescription=(category:string,value:string)=>setForm((f:Json)=>({...f,categoryDescriptions:{...(f.categoryDescriptions||{}),[category]:value}}));',
)
replace_once(
    "src/components/admin/AdminApp.tsx",
    '<Field label="Sector title" value={form.title} onChange={v=>set("title",v)}/><Field label="Short description" multiline value={form.short} onChange={v=>set("short",v)}/><div className="adminSectorImageGrid">',
    '<Field label="Sector title" value={form.title} onChange={v=>set("title",v)}/><Field label="Short description" multiline value={form.short} onChange={v=>set("short",v)}/><Field label="Sector introduction — separate paragraphs with a blank line" multiline value={(form.intro||[]).join("\\n\\n")} onChange={v=>set("intro",v.split(/\\n\\s*\\n/).map((x:string)=>x.trim()).filter(Boolean))}/><div className="adminSectorImageGrid">',
)
replace_once(
    "src/components/admin/AdminApp.tsx",
    '<Field label="Product categories — one per line" multiline value={(form.categories||[]).join("\\n")} onChange={v=>set("categories",v.split("\\n").map((x:string)=>x.trim()).filter(Boolean))}/><div className="adminActions">',
    '<Field label="Product categories — one per line" multiline value={(form.categories||[]).join("\\n")} onChange={v=>set("categories",v.split("\\n").map((x:string)=>x.trim()).filter(Boolean))}/><div className="adminCategoryDescriptions"><div className="adminCategoryDescriptionsHead"><span>Category copy</span><h3>Product category descriptions</h3><p>Descriptions are stored separately from the category-name list, so categories remain compatible with the CMS editor and structured data.</p></div><div className="adminCategoryDescriptionGrid">{(form.categories||[]).map((category:string,i:number)=><label className="adminCategoryDescriptionItem" key={category}><div><span>{String(i+1).padStart(2,"0")}</span><strong>{category}</strong></div><textarea value={form.categoryDescriptions?.[category]||""} onChange={e=>setCategoryDescription(category,e.target.value)} placeholder={`Description for ${category}`}/></label>)}</div></div><div className="adminActions">',
)

css = Path("src/app/globals.css")
text = css.read_text()
marker = "/* === SECTOR EDITORIAL LAYOUT + CMS DESCRIPTION UI === */"
if marker not in text:
    text += r'''

/* === SECTOR EDITORIAL LAYOUT + CMS DESCRIPTION UI === */
.sectorIntro,.sectorCatalog{width:min(var(--site-max),calc(100% - (var(--site-gutter) * 2)));margin-left:auto;margin-right:auto}
.sectorIntro{padding:clamp(76px,8vw,118px) 0 clamp(72px,7vw,104px);display:grid;grid-template-columns:minmax(300px,.82fr) minmax(0,1.18fr);gap:clamp(44px,7vw,118px);align-items:start;border-bottom:1px solid #e3ddd3}
.sectorIntroHeading h2,.sectorCatalogIntro h2{font-family:var(--font-display),"Montserrat",sans-serif;font-weight:700;letter-spacing:-.035em;color:var(--ink);margin:14px 0 0;text-wrap:balance}
.sectorIntroHeading h2{font-size:clamp(38px,4.2vw,64px);line-height:.98}
.sectorIntroCopy{max-width:780px;padding-top:28px;border-top:3px solid var(--gold)}
.sectorIntroCopy p{font-size:clamp(16px,1.25vw,19px);line-height:1.8;color:#5f5a54;margin:0 0 22px}.sectorIntroCopy p:last-child{margin-bottom:0}
.sectorCatalog{padding:clamp(72px,8vw,116px) 0 clamp(86px,9vw,132px);display:grid;grid-template-columns:minmax(270px,.62fr) minmax(0,1.38fr);gap:clamp(42px,6vw,96px);align-items:start}
.sectorCatalogIntro{position:sticky;top:118px}.sectorCatalogIntro h2{font-size:clamp(34px,3.5vw,52px);line-height:1.02}.sectorCatalogIntro>p{font-size:15px;line-height:1.75;color:#68625c;margin:22px 0 28px;max-width:430px}
.sectorCategoryCount{display:inline-flex;align-items:center;gap:10px;padding-top:16px;border-top:1px solid #d9d3c9;color:#817a72;font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase}.sectorCategoryCount:before{content:"";width:26px;height:2px;background:var(--gold)}
.sectorCatalog .categoryGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:#dcd5ca;border:1px solid #dcd5ca}
.sectorCatalog .category{min-height:178px;padding:28px;background:#fff;border:0;display:grid;grid-template-columns:38px minmax(0,1fr);gap:14px;align-items:start;transition:background .25s ease}.sectorCatalog .category:hover{background:#faf8f4}
.sectorCatalog .categoryNumber{color:var(--gold);font:700 11px/1 var(--font-sans);letter-spacing:.1em;padding-top:5px}.sectorCatalog .categoryBody h3{font-family:var(--font-display),"Montserrat",sans-serif;font-size:clamp(18px,1.45vw,23px);line-height:1.16;letter-spacing:-.02em;margin:0 0 11px;color:#292526}.sectorCatalog .categoryBody p{font-size:13px;line-height:1.65;color:#746d66;margin:0;max-width:44ch}
.adminCategoryDescriptions{margin-top:30px;padding-top:28px;border-top:1px solid #ded7cc}.adminCategoryDescriptionsHead{max-width:760px;margin-bottom:18px}.adminCategoryDescriptionsHead>span{display:block;color:#9a6b16;font-size:9px;font-weight:750;letter-spacing:.14em;text-transform:uppercase;margin-bottom:6px}.adminCategoryDescriptionsHead h3{margin:0 0 8px!important;font:700 20px/1.2 var(--font-display)!important}.adminCategoryDescriptionsHead p{margin:0;color:#766f68;font-size:11px;line-height:1.6}.adminCategoryDescriptionGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.adminCategoryDescriptionItem{display:block;background:#f8f5ef;border:1px solid #ded7cc;padding:14px;border-radius:6px}.adminCategoryDescriptionItem>div{display:flex;gap:9px;align-items:flex-start;margin-bottom:10px}.adminCategoryDescriptionItem>div span{color:#9a6b16;font-size:9px;font-weight:750;letter-spacing:.1em;padding-top:2px}.adminCategoryDescriptionItem>div strong{font-size:11px;line-height:1.35;color:#403a35}.adminCategoryDescriptionItem textarea{width:100%;min-height:96px;resize:vertical;border:1px solid #d8d0c5;background:#fff;padding:10px 11px;border-radius:4px;font:11px/1.55 var(--font-sans);color:#4d4741}.adminCategoryDescriptionItem textarea:focus{outline:0;border-color:#9a6b16;box-shadow:0 0 0 2px rgba(154,107,22,.08)}
@media(max-width:980px){.sectorIntro,.sectorCatalog{grid-template-columns:1fr;gap:34px}.sectorCatalogIntro{position:static}.sectorIntroCopy{padding-top:22px}}
@media(max-width:760px){.sectorIntro,.sectorCatalog{width:calc(100% - 32px)}.sectorIntro{padding:64px 0 58px}.sectorCatalog{padding:58px 0 78px}.sectorCatalog .categoryGrid,.adminCategoryDescriptionGrid{grid-template-columns:1fr}.sectorCatalog .category{min-height:0;padding:22px 18px}.sectorIntroHeading h2{font-size:36px}.sectorCatalogIntro h2{font-size:32px}}
'''
    css.write_text(text)
