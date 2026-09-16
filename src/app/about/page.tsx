import "../visit-about.css";
import SeoJsonLd from "@/components/SeoJsonLd";
import type { Metadata } from "next";
import SeoBreadcrumbs from "@/components/SeoBreadcrumbs";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import VideoFeature from "@/components/VideoFeature";
import ImageGallery from "@/components/ImageGallery";
import FairShowcase from "@/components/FairShowcase";
import Link from "next/link";
import {media,sectors} from "@/data/site";

export const metadata: Metadata = {
  title: "About Iraq Home Expo",
  description: "Learn about Iraq Home Expo 2027, an international exhibition in Baghdad for furniture, interiors, home products and residential solutions at Baghdad International Fair.",
  alternates:{canonical:"https://iraqhomeexpo.com/about"},
  openGraph:{
    title:"About Iraq Home Expo 2027 | International Exhibition in Baghdad",
    description:"Iraq Home Expo 2027 connects international suppliers with buyers, developers, designers and business opportunities across Iraq's furniture, interiors and home products market.",
    url:"https://iraqhomeexpo.com/about",
    type:"website",
    images:[{url:"/assets/hero-about-expo-generated.png",alt:"Furniture and interiors exhibition environment for Iraq Home Expo 2027"}]
  },
};

const businessGroups = [
  ["International suppliers","Present products to professional buyers, explore routes into the Iraqi market and meet potential distributors, agents and commercial partners."],
  ["Iraqi buyers and specifiers","Compare products, meet suppliers directly and discover solutions for residential, retail, hospitality and development projects."],
  ["Industry professionals","Connect with developers, engineering firms, interior designers, procurement specialists and other professionals involved in shaping homes and residential projects in Iraq."],
] as const;

const professionalAudience = [
  "Residential complex owners",
  "Real estate developers",
  "Engineering firms",
  "Interior designers",
  "Procurement specialists",
  "Importers",
  "Wholesalers",
  "Retailers",
] as const;

export default function About(){
  return <>
    <SeoJsonLd data={pageJsonLd({
      path:"/about",
      type:"AboutPage",
      name:"About Iraq Home Expo 2027 | International Exhibition in Baghdad",
      description:"Iraq Home Expo 2027 is an international exhibition in Baghdad for furniture, interiors, home products and residential solutions, connecting global suppliers with professional buyers in Iraq.",
      image:"/assets/hero-about-expo-generated.png",
      keywords:["Iraq Home Expo","Iraq Expo","Iraq International Expo","Iraq International Fair","Baghdad International Fair","furniture exhibition Iraq","interiors exhibition Iraq","home products exhibition Iraq","international exhibition Baghdad"]
    })}/>

    <PageHero
      cmsKey="about"
      eyebrow="Iraq Home Expo 2027"
      title="Where the global home industry meets Iraq"
      copy="An international exhibition in Baghdad connecting furniture, interiors and home product suppliers with professional buyers and business opportunities in Iraq."
      image="/assets/hero-about-expo-generated.png"
      imageAlt="Contemporary furniture and interiors exhibition hall with professional visitors and business meetings"
    />

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbJsonLd([
        {name:"Iraq Home Expo 2027",path:"/"},
        {name:"About Iraq Home Expo",path:"/about"}
      ]))}}
    />
    <SeoBreadcrumbs items={[{label:"Home",href:"/"},{label:"About Iraq Home Expo"}]}/>

    <section className="aboutStory">
      <Reveal className="aboutStoryTitle">
        <span className="eyebrow dark">About the exhibition</span>
        <h2>An international home exhibition in Baghdad built around real business.</h2>
      </Reveal>
      <Reveal className="aboutStoryCopy">
        <p>Iraq Home Expo 2027 brings the home industry together at Baghdad International Fair from 12 to 15 May 2027. The exhibition covers furniture, interiors, home textiles, kitchen products, bathroom solutions, lighting, electrical systems, HVAC, smart technology, safety and security.</p>
        <p>The purpose is simple. Give international manufacturers and suppliers a direct way to meet people who are actively buying, specifying and developing projects in Iraq, while giving Iraqi professionals a focused place to compare products and build relationships with suppliers.</p>
        <p>For companies looking at Iraq as an export market, the exhibition creates a practical meeting point where product discovery can lead to distribution conversations, sourcing opportunities and future commercial partnerships.</p>
      </Reveal>
    </section>

    <section className="aboutBusiness">
      <div className="aboutSectionHead">
        <span className="eyebrow dark">Built for business</span>
        <h2>Connecting international supply with professional demand in Iraq.</h2>
      </div>
      <div className="aboutBusinessGrid">
        {businessGroups.map(([title,copy],i)=><Reveal key={title} className="aboutBusinessCard"><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
      </div>
    </section>

    <section className="aboutConnections">
      <div>
        <span className="eyebrow dark">Who the exhibition connects</span>
        <h2>Meet the people behind purchasing, projects and market growth.</h2>
        <p>The original exhibition concept was built around connecting suppliers with active buyers and decision makers in Iraq. That includes companies developing residential projects as well as professionals responsible for sourcing, design and purchasing.</p>
      </div>
      <div className="aboutAudienceTags">
        {professionalAudience.map((item,i)=><span key={item}><b>{String(i+1).padStart(2,"0")}</b>{item}</span>)}
      </div>
    </section>

    <section className="aboutSectors">
      <div className="aboutSectorsIntro">
        <span className="eyebrow dark">Exhibition sectors</span>
        <h2>Furniture, interiors and home products in one exhibition.</h2>
        <p>Iraq Home Expo brings together eight focused sectors so visitors can move from furniture and finishes to kitchen, bathroom, lighting, climate systems and connected home technology without leaving the exhibition.</p>
        <Link className="textLink" href="/sectors">Explore all exhibition sectors <span>→</span></Link>
      </div>
      <div className="aboutSectorLinks">
        {sectors.map((sector,i)=><Link key={sector.slug} href={`/sectors/${sector.slug}`}><span>{String(i+1).padStart(2,"0")}</span><strong>{sector.title}</strong><b>↗</b></Link>)}
      </div>
    </section>

    <FairShowcase compact/>

    <ImageGallery/>

    <VideoFeature
      title="See the experience behind Success Steps exhibitions"
      copy="Explore previous Success Steps events and see the exhibition atmosphere, professional audience and organizer experience behind Iraq Home Expo 2027."
      channelUrl={media.organizerYoutube}
    />

    <section className="finalCta">
      <div>
        <span className="eyebrow">12 to 15 May 2027, Baghdad</span>
        <h2>Be part of Iraq Home Expo 2027.</h2>
      </div>
      <div>
        <Link className="button gold" href="/register/visitor">Register to Visit ↗</Link>
        <Link className="button ghost" href="/exhibit">Exhibit with Us ↗</Link>
        <Link className="button ghost" href="/sponsor">Become a Sponsor ↗</Link>
      </div>
    </section>
  </>
}
