import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VisualBand from "@/components/VisualBand";
import VideoFeature from "@/components/VideoFeature";
import FairShowcase from "@/components/FairShowcase";
import OpeningCeremony from "@/components/OpeningCeremony";
import Link from "next/link";
import {event,sectors,media} from "@/data/site";
export const metadata: Metadata = {
  title: "Visit Iraq Home Expo 2027 | Baghdad International Fair",
  description: "Plan your visit to Iraq Home Expo 2027 at Baghdad International Fair, 12–15 May. Discover furniture, interiors and home-industry suppliers in Baghdad, Iraq.",
  alternates:{canonical:"https://iraqhomeexpo.com/visit"},
  openGraph:{title:"Visit Iraq Home Expo 2027 | Baghdad International Fair",description:"Plan your visit to Iraq Home Expo 2027 at Baghdad International Fair, 12–15 May. Discover furniture, interiors and home-industry suppliers in Baghdad, Iraq.",url:"https://iraqhomeexpo.com/visit",type:"website"},
};
export default function Visit(){return <><PageHero cmsKey="visit" eyebrow="Visitor Information" title="Visit Iraq Home Expo 2027" copy="Discover products, meet suppliers and connect with companies serving Iraq’s home, interiors and residential markets." image="/assets/visit-hero-new.jpg" imageAlt="Baghdad International Fair venue for Iraq Home Expo 2027 in Baghdad, Iraq" imagePosition="bottom center" primary="Register to Visit" primaryHref="/register/visitor"/>
<OpeningCeremony compact/>
<section className="infoTriplet">{[["Date",event.dates],["Opening Hours",event.hours],["Venue",`${event.venue} · ${event.city}`]].map(([a,b])=><div key={a}><span>{a}</span><strong>{b}</strong></div>)}</section>
<FairShowcase compact/>
<section className="contentSplit"><div><span className="eyebrow dark">Discover · Connect · Source</span><h2>Why visit Iraq Home Expo?</h2></div><div><p>Professional visitors gain direct access to international suppliers, products and solutions across the modern home industry.</p><div className="miniList">{["Discover new products","Meet suppliers directly","Find sourcing opportunities","Build business connections","Explore multiple sectors","Understand market developments"].map(x=><span key={x}>{x}</span>)}</div></div></section>
<VisualBand image="/assets/expo-event.webp" eyebrow="Four days in Baghdad" title="Meet the industry face-to-face." copy="Use your visit to compare solutions, start supplier conversations and develop professional relationships across the home industry." href="/register/visitor" label="Register to Visit"/>
<section className="audienceSection"><div><span className="eyebrow dark">Professional Visitors</span><h2>Who should visit?</h2><p>The exhibition is designed for professionals involved in buying, sourcing, specifying, distributing and promoting products for the Iraqi market.</p></div><div className="audienceGrid">{["Importers","Exporters","Producers","Wholesalers","Retailers","Interior Designers","Purchasing Specialists","Chain Stores","Designers","Public-Sector Representatives","Press & Media"].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span><strong>{x}</strong></div>)}</div></section>
<VideoFeature eyebrow="Exhibition Atmosphere" title="See the experience behind Success Steps events" copy="This mobile-friendly video area is reserved for exhibition highlights and organizer achievements. Until a specific highlight reel is selected, it opens the Success Steps YouTube channel." channelUrl={media.organizerYoutube} poster="/assets/industry-professionals.webp"/>
<section className="sectorChips">{sectors.map(s=><Link key={s.slug} href={`/sectors/${s.slug}`}>{s.title}<span>↗</span></Link>)}</section>
<section className="finalCta"><div><span className="eyebrow">Join us in Baghdad</span><h2>Register to visit Iraq Home Expo 2027.</h2><p>{event.dates} · {event.venue}</p></div><div className="finalCtaActions"><Link className="button gold" href="/register/visitor">Register to Visit ↗</Link><Link className="button ghost" href="/sponsor">Become a Sponsor ↗</Link></div></section></>}