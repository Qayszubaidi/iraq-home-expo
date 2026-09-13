import SeoJsonLd from "@/components/SeoJsonLd";
import type { Metadata } from "next";
import SeoBreadcrumbs from "@/components/SeoBreadcrumbs";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import VideoFeature from "@/components/VideoFeature";
import VisualBand from "@/components/VisualBand";
import ImageGallery from "@/components/ImageGallery";
import FairShowcase from "@/components/FairShowcase";
import Link from "next/link";
import {media} from "@/data/site";

export const metadata: Metadata = {
  title: "About the Exhibition",
  description: "Learn about Iraq Home Expo 2027, an international furniture, interiors and home-industry exhibition connecting global suppliers with buyers and business opportunities in Iraq.",
  alternates:{canonical:"https://iraqhomeexpo.com/about"},
  openGraph:{title:"About Iraq Home Expo 2027 | International Exhibition in Baghdad",description:"Learn about Iraq Home Expo 2027, an international furniture, interiors and home-industry exhibition connecting global suppliers with buyers and business opportunities in Iraq.",url:"https://iraqhomeexpo.com/about",type:"website",images:[{url:"/assets/hero-about-expo-generated.png",alt:"Furniture and interiors exhibition environment for Iraq Home Expo 2027"}]},
};
export default function About(){return <><SeoJsonLd data={pageJsonLd({path:"/about",type:"AboutPage",name:"About Iraq Home Expo 2027 | International Exhibition in Baghdad",description:"Learn about Iraq Home Expo 2027, an international furniture, interiors and home-industry exhibition connecting global suppliers with buyers and business opportunities in Iraq.",image:"/assets/hero-about-expo-generated.png",keywords:["Iraq exhibition", "international exhibition Baghdad", "Iraq business"]})}/>
<PageHero cmsKey="about" eyebrow="Iraq Home Expo 2027" title="Connecting the global home industry with opportunities in Iraq" copy="An international exhibition dedicated to products, technologies and solutions for the modern home." image="/assets/hero-about-expo-generated.png" imageAlt="Contemporary furniture and interiors exhibition hall with professional visitors and business meetings"/>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbJsonLd([{name:"Iraq Home Expo 2027",path:"/"},{name:"About Iraq Home Expo",path:"/about"}]))}}/>
<SeoBreadcrumbs items={[{label:"Home",href:"/"},{label:"About Iraq Home Expo"}]}/>
<section className="contentSplit"><Reveal><span className="eyebrow dark">About the exhibition</span><h2>A business platform for the home industry.</h2></Reveal><Reveal><p>Iraq Home Expo creates a focused meeting point for manufacturers and suppliers seeking to enter or expand within Iraq while giving professional buyers direct access to products, technologies and industry developments.</p><p>From furniture and interiors to kitchens, electrical systems, HVAC, smart technologies and security solutions, the complete home industry comes together under one roof.</p></Reveal></section>
<section className="featureGrid">{[["Showcase products & solutions","Present your products directly to buyers, distributors and professionals."],["Meet industry decision-makers","Connect with importers, wholesalers, retailers, designers and purchasing specialists."],["Develop business partnerships","Establish relationships with distributors, agents, customers and long-term partners."],["Explore the Iraqi market","Understand demand and identify opportunities across Iraq’s developing home sectors."]].map(([h,p])=><Reveal key={h} className="feature"><h3>{h}</h3><p>{p}</p></Reveal>)}</section>
<FairShowcase compact/>
<VisualBand image="/assets/build-partnerships.webp" eyebrow="International supply · Iraqi demand" title="A meeting place built around business." copy="Iraq Home Expo is designed to move conversations from product discovery to sourcing, distribution and long-term commercial relationships." href="/exhibit" label="Exhibit with Us"/>
<ImageGallery/>
<VideoFeature title="Success Steps — organizer achievements" copy="A visual archive of Success Steps projects, exhibition footage and organizer achievements. The current placeholder opens the official YouTube channel until the final showreel URL is selected." channelUrl={media.organizerYoutube}/>
<section className="finalCta"><div><span className="eyebrow">12–15 May 2027 · Baghdad</span><h2>Be part of Iraq Home Expo 2027.</h2></div><div><Link className="button gold" href="/register/visitor">Register to Visit ↗</Link><Link className="button ghost" href="/exhibit">Exhibit with Us ↗</Link><Link className="button ghost" href="/sponsor">Become a Sponsor ↗</Link></div></section></>}