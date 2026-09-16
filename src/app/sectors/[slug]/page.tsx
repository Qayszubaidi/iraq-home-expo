import SeoJsonLd from "@/components/SeoJsonLd";
import {notFound} from "next/navigation";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import Image from "next/image";
import SectorMoodboard from "@/components/SectorMoodboard";
import SectorGallery from "@/components/SectorGallery";
import {sectors,categoryDescriptions} from "@/data/site";
import {getCmsSector,getCmsSectors} from "@/lib/cms/public";
import {sectorPageJsonLd} from "@/lib/seo";
export function generateStaticParams(){return sectors.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const s=sectors.find(x=>x.slug===slug);
  if(!s) return {};
  const title=`${s.title} Exhibition in Iraq`;
  const ogTitle=`${s.title} Exhibition in Iraq | Iraq Home Expo 2027`;
  const description=`Explore ${s.title} products, suppliers and business opportunities at Iraq Home Expo 2027, 12–15 May at Baghdad International Fair, Iraq.`;
  return {
    title,
    description,
    alternates:{canonical:`https://iraqhomeexpo.com/sectors/${slug}`},
    openGraph:{title:ogTitle,description,url:`https://iraqhomeexpo.com/sectors/${slug}`,type:"website",images:[s.heroImage??s.image]},
  };
}
export default async function SectorPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const base=sectors.find(x=>x.slug===slug);if(!base)notFound();const override=await getCmsSector(slug);const s={...base,...(override||{})};const sectorIntro=Array.isArray(s.intro)&&s.intro.length?s.intro:base.intro;const sectorCategoryDescriptions={...categoryDescriptions,...(s.categoryDescriptions||{})};const displaySectors=await getCmsSectors(sectors);const related=displaySectors.filter(x=>x.slug!==s.slug).slice(0,3);
const breadcrumbJsonLd={
  "@context":"https://schema.org",
  "@type":"BreadcrumbList",
  itemListElement:[
    {"@type":"ListItem",position:1,name:"Iraq Home Expo 2027",item:"https://iraqhomeexpo.com/"},
    {"@type":"ListItem",position:2,name:"Exhibition Sectors",item:"https://iraqhomeexpo.com/sectors"},
    {"@type":"ListItem",position:3,name:s.title,item:`https://iraqhomeexpo.com/sectors/${s.slug}`}
  ]
};
return <><PageHero cmsKey={`sector:${s.slug}`} eyebrow="Exhibition Sector" title={s.title} copy={s.short} image={s.heroImage ?? s.image} imageAlt={`${s.title} products and solutions`} primary="Register as an Exhibitor" primaryHref="/register/exhibitor"/>
<SeoJsonLd data={sectorPageJsonLd({slug:s.slug,title:s.title,description:s.short,image:s.heroImage??s.image,categories:s.categories})}/>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbJsonLd)}}/>
<nav className="seoBreadcrumbs" aria-label="Breadcrumb">
  <Link href="/">Iraq Home Expo</Link><span>›</span><Link href="/sectors">Exhibition Sectors</Link><span>›</span><strong>{s.title}</strong>
</nav>
<section className="sectorIntro"><div className="sectorIntroHeading"><span className="eyebrow dark">Sector overview</span><h2>{s.title} at Iraq Home Expo 2027</h2></div><div className="sectorIntroCopy">{sectorIntro.map((p,i)=><p key={i}>{p}</p>)}</div></section>
<section className="sectorCatalog"><div className="sectorCatalogIntro"><span className="eyebrow dark">Product Categories</span><h2>Explore {s.title}</h2><p>Discover {s.title.toLowerCase()} products, systems and solutions represented at <Link className="seoTextLink" href="/about">Iraq Home Expo 2027</Link>, an international exhibition connecting suppliers with professional buyers at <Link className="seoTextLink" href="/visit">Baghdad International Fair</Link>.</p><span className="sectorCategoryCount">{s.categories.length} product categories</span></div><div className="categoryGrid">{s.categories.map((c,i)=><article className="category" key={c}><span className="categoryNumber">{String(i+1).padStart(2,"0")}</span><div className="categoryBody"><h3>{c}</h3>{sectorCategoryDescriptions[c]?<p>{sectorCategoryDescriptions[c]}</p>:null}</div></article>)}</div></section>
<SectorGallery slug={s.slug} title={s.title}/>
<SectorMoodboard title={s.title} slug={s.slug}/>
<section className="sectorVisual"><Image fill src={s.image} alt={`${s.title} products and solutions at Iraq Home Expo 2027`} sizes="100vw"/><div className="sectorVisualShade"/><div><span className="eyebrow">Exhibit in {s.title}</span><h2>Put your products in front of the Iraqi market.</h2><p>Meet professional buyers, distributors and industry specialists looking for products, technologies and business partnerships.</p><Link className="button gold" href="/register/exhibitor">Register as an Exhibitor ↗</Link></div></section>
<section className="relatedSectors"><span className="eyebrow dark">Continue exploring</span><h2>Related exhibition sectors.</h2><div>{related.map(r=><Link href={`/sectors/${r.slug}`} key={r.slug}><Image fill src={r.image} alt={`${r.title} exhibition sector at Iraq Home Expo 2027`} sizes="(max-width: 760px) 100vw, 33vw"/><div className="cardShade"/><strong>{r.title}</strong><span>↗</span></Link>)}</div></section>
<section className="finalCta"><div><h2>Showcase your products to the Iraqi market.</h2></div><div><Link className="button gold" href="/register/exhibitor">Register as an Exhibitor ↗</Link><Link className="button ghost" href="/register/visitor">Register to Visit ↗</Link></div></section></>}
