import {notFound} from "next/navigation";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import Image from "next/image";
import SectorMoodboard from "@/components/SectorMoodboard";
import SectorGallery from "@/components/SectorGallery";
import {sectors} from "@/data/site";
export function generateStaticParams(){return sectors.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=sectors.find(x=>x.slug===slug);return {title:s?.title||"Exhibition Sector",description:s?.short}}
export default async function SectorPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=sectors.find(x=>x.slug===slug);if(!s)notFound();const related=sectors.filter(x=>x.slug!==s.slug).slice(0,3);return <><PageHero eyebrow="Exhibition Sector" title={s.title} copy={s.short} image={s.image} imageAlt={`${s.title} products and solutions`} primary="Register as an Exhibitor" primaryHref="/register/exhibitor"/>
<section className="sectorDetail"><div><span className="eyebrow dark">Product Categories</span><h2>Explore {s.title}</h2><p>Discover products, systems and solutions represented within this sector at Iraq Home Expo 2027.</p></div><div className="categoryGrid">{s.categories.map((c,i)=><div className="category" key={c}><span>{String(i+1).padStart(2,"0")}</span><h3>{c}</h3></div>)}</div></section>
<SectorGallery slug={s.slug} title={s.title}/>
<SectorMoodboard title={s.title} image={s.image}/>
<section className="sectorVisual"><Image fill src={s.image} alt={s.title}/><div className="sectorVisualShade"/><div><span className="eyebrow">Exhibit in {s.title}</span><h2>Put your products in front of the Iraqi market.</h2><p>Meet professional buyers, distributors and industry specialists looking for products, technologies and business partnerships.</p><Link className="button gold" href="/register/exhibitor">Register as an Exhibitor ↗</Link></div></section>
<section className="relatedSectors"><span className="eyebrow dark">Continue exploring</span><h2>Related exhibition sectors.</h2><div>{related.map(r=><Link href={`/sectors/${r.slug}`} key={r.slug}><Image fill src={r.image} alt={r.title}/><div className="cardShade"/><strong>{r.title}</strong><span>↗</span></Link>)}</div></section>
<section className="finalCta"><div><h2>Showcase your products to the Iraqi market.</h2></div><div><Link className="button gold" href="/register/exhibitor">Register as an Exhibitor ↗</Link><Link className="button ghost" href="/register/visitor">Register to Visit ↗</Link></div></section></>}
