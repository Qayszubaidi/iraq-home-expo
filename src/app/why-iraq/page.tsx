import SeoJsonLd from "@/components/SeoJsonLd";
import type { Metadata } from "next";
import SeoBreadcrumbs from "@/components/SeoBreadcrumbs";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/seo";
import PageHero from "@/components/PageHero"; import Reveal from "@/components/Reveal"; import {marketStats,marketStatsSource,whyIraqReasons,marketOpportunity} from "@/data/site"; import Link from "next/link";
export const metadata: Metadata = {
  title: "Why Exhibit in Iraq | Iraq Home Expo 2027 Market Opportunities",
  description: "Explore the Iraqi market opportunity for furniture, interiors and home-industry brands. Discover why international suppliers exhibit at Iraq Home Expo 2027 in Baghdad.",
  alternates:{canonical:"https://iraqhomeexpo.com/why-iraq"},
  openGraph:{title:"Why Exhibit in Iraq | Iraq Home Expo 2027 Market Opportunities",description:"Explore the Iraqi market opportunity for furniture, interiors and home-industry brands. Discover why international suppliers exhibit at Iraq Home Expo 2027 in Baghdad.",url:"https://iraqhomeexpo.com/why-iraq",type:"website",images:[{url:"/assets/hero-why-iraq-baghdad.webp",alt:"Baghdad, Iraq cityscape representing the Iraq market"}]},
};
export default function WhyIraq(){return <><SeoJsonLd data={pageJsonLd({path:"/why-iraq",type:"WebPage",name:"Why Exhibit in Iraq | Iraq Home Expo 2027 Market Opportunities",description:"Explore the Iraqi market opportunity for furniture, interiors and home-industry brands. Discover why international suppliers exhibit at Iraq Home Expo 2027 in Baghdad.",image:"/assets/hero-why-iraq-baghdad.webp",keywords:["Iraq business opportunities", "Iraq market", "exhibit in Iraq"]})}/>
<PageHero cmsKey="why-iraq" eyebrow="Market Opportunity" title="Why Iraq?" copy="Growing urban demand, residential development and changing lifestyles are creating opportunity across Iraq’s home and residential sectors." image="/assets/hero-why-iraq-baghdad.webp" imageAlt="Baghdad, Iraq cityscape and Tigris River representing the Iraq market" primary="Exhibit at Iraq Home Expo" primaryHref="/exhibit"/>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbJsonLd([{name:"Iraq Home Expo 2027",path:"/"},{name:"Why Iraq",path:"/why-iraq"}]))}}/>
<SeoBreadcrumbs items={[{label:"Home",href:"/"},{label:"Why Iraq"}]}/>
<section className="contentSplit"><Reveal><span className="eyebrow dark">A market in transformation</span><h2>The home is at the heart of life in Iraq.</h2></Reveal><Reveal><p>Home has strong cultural importance in Iraq, representing family, stability and identity. Alongside this, urbanization and residential development are increasing demand for modern products and solutions.</p><p>Iraq Home Expo creates a meeting point between this developing demand and international products, technologies and expertise.</p></Reveal></section>
<section className="contentSplit"><Reveal><span className="eyebrow dark">Market opportunity</span><h2>{marketOpportunity.heading}</h2></Reveal><Reveal><p>{marketOpportunity.body}</p></Reveal></section>
<section className="statsPage">{marketStats.map(([n,l,d])=><Reveal key={l} className="bigStat"><strong>{n}</strong><h3>{l}</h3><p>{d}</p></Reveal>)}</section>
<p className="statsSource">Source: {marketStatsSource}.</p>
<section className="featureGrid">{whyIraqReasons.map(r=><Reveal key={r.title} className="feature"><h3>{r.title}</h3><p>{r.body}</p></Reveal>)}</section>
<section className="finalCta"><div><span className="eyebrow">Enter · Connect · Grow</span><h2>Turn market potential into business opportunity.</h2></div><div><Link className="button gold" href="/exhibit">Exhibit with Us ↗</Link><Link className="button ghost" href="/sectors">Explore Sectors ↗</Link><Link className="button ghost" href="/sponsor">Become a Sponsor ↗</Link></div></section></>}