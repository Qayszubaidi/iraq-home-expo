import "../visit-about.css";
import SeoJsonLd from "@/components/SeoJsonLd";
import type { Metadata } from "next";
import SeoBreadcrumbs from "@/components/SeoBreadcrumbs";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import VideoFeature from "@/components/VideoFeature";
import Image from "next/image";
import Link from "next/link";
import {event,sectors,media,venue,visitorProfile} from "@/data/site";

export const metadata: Metadata = {
  title: "Visit Iraq Home Expo",
  description: "Plan your visit to Iraq Home Expo 2027 at Baghdad International Fair from 12 to 15 May 2027. Meet furniture, interiors and home product suppliers in Baghdad, Iraq.",
  alternates:{canonical:"https://iraqhomeexpo.com/visit"},
  openGraph:{
    title:"Visit Iraq Home Expo 2027 | Baghdad International Fair",
    description:"Plan your visit to Iraq Home Expo 2027 at Baghdad International Fair from 12 to 15 May 2027. Meet suppliers, compare products and build business connections in Baghdad.",
    url:"https://iraqhomeexpo.com/visit",
    type:"website",
    images:[{url:"/assets/visit-hero-new.jpg",alt:"Baghdad International Fair venue for Iraq Home Expo 2027"}]
  },
};

const visitReasons = [
  ["Source new products","Compare furniture, interiors, kitchen, bathroom, lighting, HVAC and connected home solutions in one place."],
  ["Meet suppliers directly","Speak with manufacturers, brands and distributors about products, availability and business opportunities in Iraq."],
  ["Compare across sectors","Use one visit to review products and suppliers across eight focused exhibition sectors."],
  ["Build useful contacts","Meet companies and professionals who can support sourcing, distribution, design and future projects."],
] as const;

export default function Visit(){
  return <>
    <SeoJsonLd data={pageJsonLd({
      path:"/visit",
      type:"WebPage",
      name:"Visit Iraq Home Expo 2027 at Baghdad International Fair",
      description:"Plan your visit to Iraq Home Expo 2027 at Baghdad International Fair from 12 to 15 May 2027. Meet furniture, interiors and home product suppliers in Baghdad, Iraq.",
      image:"/assets/visit-hero-new.jpg",
      keywords:["visit Iraq Expo","Baghdad exhibition","Iraq International Fair","Baghdad International Fair","furniture exhibition Iraq"]
    })}/>

    <PageHero
      cmsKey="visit"
      eyebrow="Visitor Information"
      title="Visit Iraq Home Expo 2027"
      copy="Spend four focused days discovering products, meeting suppliers and building business connections across Iraq's home and interiors market."
      image="/assets/visit-hero-new.jpg"
      imageAlt="Baghdad International Fair venue for Iraq Home Expo 2027 in Baghdad, Iraq"
      imagePosition="bottom center"
      primary="Register to Visit"
      primaryHref="/register/visitor"
    />

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbJsonLd([
        {name:"Iraq Home Expo 2027",path:"/"},
        {name:"Visit Iraq Home Expo",path:"/visit"}
      ]))}}
    />
    <SeoBreadcrumbs items={[{label:"Home",href:"/"},{label:"Visit Iraq Home Expo"}]}/>

    <section className="visitPlanner">
      <div className="visitPlannerIntro">
        <span className="eyebrow dark">Plan your visit</span>
        <h2>Make your time at Iraq Home Expo useful from the moment you arrive.</h2>
        <p>Iraq Home Expo 2027 welcomes professional visitors to Baghdad International Fair from 12 to 15 May 2027. The exhibition brings suppliers and buyers together across the home, interiors and residential markets, giving you a practical way to compare products and start direct conversations in one visit.</p>
      </div>
      <div className="visitFacts">
        <div className="visitFact"><span>01</span><small>Date</small><strong>12 to 15 May 2027</strong></div>
        <div className="visitFact"><span>02</span><small>Opening hours</small><strong>11:00 AM to 6:00 PM</strong></div>
        <div className="visitFact"><span>03</span><small>Venue</small><strong>{event.venue}</strong><p>{event.city}</p></div>
      </div>
    </section>

    <section className="visitVenue">
      <div className="visitVenueMedia">
        <figure className="visitVenueMain"><Image src="/assets/baghdad-fair-day.jpeg" fill alt="Baghdad International Fair entrance in Baghdad" sizes="(max-width: 900px) 100vw, 52vw"/></figure>
        <figure className="visitVenueInset"><Image src="/assets/baghdad-fair-night.jpeg" fill alt="Baghdad International Fair illuminated at night" sizes="(max-width: 900px) 54vw, 24vw"/></figure>
      </div>
      <div className="visitVenueCopy">
        <span className="eyebrow light">Baghdad International Fair</span>
        <h2>A practical venue for a focused business visit.</h2>
        <p>Baghdad International Fair is one of Iraq's main exhibition venues, with conference halls, extensive parking, large exhibition floors, central air conditioning and food and beverage facilities suited to a major international trade event.</p>
        <p>The venue is in a prominent part of Baghdad, close to hotels, shopping destinations and visitor attractions, with convenient access for local and international exhibitors and visitors.</p>
        <Link className="button gold" href="/register/visitor">Register to Visit <span>↗</span></Link>
      </div>
    </section>

    <section className="visitReasons">
      <div className="visitReasonsHead">
        <span className="eyebrow dark">Why visit</span>
        <h2>Come with a plan. Leave with useful contacts and clearer options.</h2>
        <p>The exhibition is designed for professionals who want to source, compare and build relationships with companies serving the Iraqi market.</p>
      </div>
      <div className="visitReasonGrid">
        {visitReasons.map(([title,copy],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
    </section>

    <section className="audienceSection visitAudience">
      <div>
        <span className="eyebrow dark">Professional Visitors</span>
        <h2>Who should visit?</h2>
        <p>Iraq Home Expo is built for people involved in buying, sourcing, specifying, distributing and promoting products for homes, residential projects and related businesses in Iraq.</p>
      </div>
      <div className="audienceGrid">
        {visitorProfile.map((x,i)=><div key={x.title}><span>{String(i+1).padStart(2,"0")}</span><strong>{x.title}</strong><p>{x.description}</p></div>)}
      </div>
    </section>

    <section className="visitSectors">
      <div>
        <span className="eyebrow dark">Explore before you arrive</span>
        <h2>Eight sectors. One exhibition visit.</h2>
        <p>Review the sectors before the show and decide which suppliers, products and solutions matter most to your business.</p>
      </div>
      <div className="sectorChips visitSectorChips">{sectors.map(s=><Link key={s.slug} href={`/sectors/${s.slug}`}>{s.title}<span>↗</span></Link>)}</div>
    </section>

    <VideoFeature
      eyebrow="Exhibition Atmosphere"
      title="See the experience behind Success Steps exhibitions"
      copy="Explore highlights from previous Success Steps events and get a feel for the professional audience, exhibition environment and business activity behind the organizer's work."
      channelUrl={media.organizerYoutube}
      poster="/assets/industry-professionals.webp"
    />

    <section className="finalCta">
      <div>
        <span className="eyebrow">Join us in Baghdad</span>
        <h2>Plan your visit to Iraq Home Expo 2027.</h2>
        <p>12 to 15 May 2027, {event.venue}</p>
      </div>
      <div className="finalCtaActions">
        <Link className="button gold" href="/register/visitor">Register to Visit ↗</Link>
        <Link className="button ghost" href="/sectors">Explore Sectors ↗</Link>
      </div>
    </section>
  </>
}
