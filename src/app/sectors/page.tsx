import SeoJsonLd from "@/components/SeoJsonLd";
import type { Metadata } from "next";
import SeoBreadcrumbs from "@/components/SeoBreadcrumbs";
import { breadcrumbJsonLd, sectorsCollectionJsonLd } from "@/lib/seo";
import PageHero from "@/components/PageHero"; import Image from "next/image"; import Link from "next/link"; import {sectors} from "@/data/site"; import {getCmsSectors} from "@/lib/cms/public";
export const metadata: Metadata = {
  title: "Iraq Exhibition Sectors | Furniture, Interiors & Home Expo 2027",
  description: "Explore Iraq Home Expo 2027 exhibition sectors including furniture, interiors, home textiles, kitchen, bathroom, lighting, HVAC and smart-home solutions.",
  alternates:{canonical:"https://iraqhomeexpo.com/sectors"},
  openGraph:{title:"Iraq Exhibition Sectors | Furniture, Interiors & Home Expo 2027",description:"Explore Iraq Home Expo 2027 exhibition sectors including furniture, interiors, home textiles, kitchen, bathroom, lighting, HVAC and smart-home solutions.",url:"https://iraqhomeexpo.com/sectors",type:"website"},
};
export default async function Sectors(){const displaySectors=await getCmsSectors(sectors);return <><PageHero cmsKey="sectors" eyebrow="The Complete Home Industry" title="Exhibition Sectors" copy="Eight focused industries spanning the products, technologies and solutions shaping modern residential environments." image="/assets/hero-sectors-home.webp" imageAlt="Furniture, interiors and home product exhibition sectors at Iraq Home Expo 2027" primary="Exhibit with Us" primaryHref="/exhibit"/>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbJsonLd([{name:"Iraq Home Expo 2027",path:"/"},{name:"Exhibition Sectors",path:"/sectors"}]))}}/>
<SeoJsonLd data={sectorsCollectionJsonLd(displaySectors)}/>
<SeoBreadcrumbs items={[{label:"Home",href:"/"},{label:"Exhibition Sectors"}]}/>
<section className="sectorIndex">{displaySectors.map((s,i)=><Link href={`/sectors/${s.slug}`} key={s.slug} className="sectorIndexCard"><Image src={s.image} fill alt={`${s.title} exhibition sector at Iraq Home Expo 2027 in Baghdad`} sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1180px) 45vw, 390px"/><div className="cardShade"/><span>0{i+1}</span><div><h2>{s.title}</h2><p>{s.short}</p><b>Explore sector ↗</b></div></Link>)}</section></>}