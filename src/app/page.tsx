import "./home-seo.css";
import SeoJsonLd from "@/components/SeoJsonLd";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import MaskReveal from "@/components/MaskReveal";
import VideoFeature from "@/components/VideoFeature";
import ImageGallery from "@/components/ImageGallery";
import SectorTicker from "@/components/SectorTicker";
import SectorShowcase from "@/components/SectorShowcase";
import StoryPanels from "@/components/StoryPanels";
import StatCard from "@/components/StatCard";
import FairShowcase from "@/components/FairShowcase";
import OpeningCeremony from "@/components/OpeningCeremony";
import CmsHomeHero from "@/components/CmsHomeHero";
import { event, marketStats, sectors, media } from "@/data/site";
import { getCmsSectors } from "@/lib/cms/public";
import type { Metadata } from "next";
import {organizationJsonLd,websiteJsonLd,eventJsonLd,fairVenueJsonLd,pageJsonLd} from "@/lib/seo";

export const metadata:Metadata={
  applicationName:"Iraq Home Expo 2027",
  title:"Iraq Home Expo 2027 | International Expo in Baghdad",
  description:"Iraq Home Expo 2027 is an international expo in Baghdad for furniture, interiors and home products at Baghdad International Fair from 12 to 15 May 2027.",
  alternates:{canonical:"https://iraqhomeexpo.com"},
  openGraph:{
    siteName:"Iraq Home Expo 2027",
    title:"Iraq Home Expo 2027 | International Expo in Baghdad",
    description:"Meet furniture, interiors and home product suppliers at Baghdad International Fair from 12 to 15 May 2027.",
    url:"https://iraqhomeexpo.com",
    type:"website",
    images:[{url:"/assets/hero-interior.webp",alt:"Iraq Home Expo 2027 furniture and interiors exhibition in Baghdad"}]
  }
};

export default async function Home() {
  const displaySectors = await getCmsSectors(sectors);
  return (
    <>
      <SeoJsonLd data={[organizationJsonLd,websiteJsonLd,fairVenueJsonLd,eventJsonLd,pageJsonLd({
        path:"/",
        name:"Iraq Home Expo 2027 | International Expo in Baghdad",
        description:"Iraq Home Expo 2027 is an international expo in Baghdad for furniture, interiors and home products at Baghdad International Fair from 12 to 15 May 2027.",
        image:"/assets/hero-interior.webp",
        keywords:["Iraq International Expo","Baghdad International Expo","Iraq International Fair","Baghdad International Fair","Iraq Expo","Baghdad Expo","Iraq Fair","Baghdad Fair","Iraq furniture exhibition","Iraq interiors exhibition","home products exhibition Iraq"]
      })]}/>
      <CmsHomeHero />

      <section className="institutional">
        <span>Organized by</span>
        <Image src="/assets/success-steps-logo.webp" width={170} height={70} alt="Success Steps exhibition organizer logo" />
        <span>With institutional partners</span>
        <Image src="/assets/ministry-trade-logo.webp" width={100} height={70} alt="Iraq Ministry of Trade institutional partner logo" />
        <Image src="/assets/expo-partner-logo.webp" width={110} height={70} alt="Iraq Home Expo institutional partner logo" />
      </section>

      <SectorTicker />

      <section className="aboutIntro homeAboutIntro">
        <div className="aboutIntroLeft">
          <span className="aboutNumber" aria-hidden="true">
            01
          </span>
          <span className="goldLine" aria-hidden="true" />
          <Reveal>
            <span className="eyebrow dark">About the Exhibition</span>
            <h2 className="displayHeading aboutHeading homeAboutHeading">
              <span className="displayHeadingLine">Where design,</span>
              <span className="displayHeadingLine">products and business</span>
              <span className="displayHeadingLine">come together.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal className="aboutIntroRight homeAboutCopy">
          <p>
            Iraq Home Expo 2027 is an international expo in Baghdad that brings furniture,
            interiors and home product companies together with buyers, developers, designers,
            distributors and procurement professionals from across Iraq.
          </p>
          <p>
            Held at Baghdad International Fair, the exhibition gives suppliers a focused place to
            present products, understand market demand, meet decision makers and build commercial
            relationships that can continue beyond the event.
          </p>
          <Link href="/about" className="textLink">
            Discover Iraq Home Expo <span className="arrow">→</span>
          </Link>
        </Reveal>
      </section>

      <SectorShowcase sectors={displaySectors} />

      <ImageGallery />

      <section className="whyIraq">
        <div className="whyIraqIntro">
          <Reveal>
            <span className="eyebrow light">Why Iraq</span>
            <h2 className="displayHeading">A market in motion.</h2>
            <p>
              Urban growth, residential development and demand for improved living standards are
              creating opportunities across Iraq&apos;s home and residential sectors.
            </p>
            <Link className="button gold" href="/why-iraq">
              Discover Why Iraq <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
        <div className="statsVisual">
          {marketStats.map(([value, label, description], i) => (
            <StatCard
              key={label}
              value={value}
              label={label}
              description={description}
              index={i}
            />
          ))}
        </div>
      </section>

      <StoryPanels />

      <FairShowcase />

      <OpeningCeremony />


      <section className="homeSponsor">
        <Reveal className="homeSponsorCopy">
          <span className="eyebrow light">Partnership Opportunities</span>
          <h2>Put your brand at the center of Iraq Home Expo.</h2>
          <p>Extend your presence beyond the stand. Sponsorship opportunities give participating brands additional visibility around the exhibition and its professional audience.</p>
          <div className="actions">
            <Link className="button gold" href="/sponsor">Become a Sponsor <span aria-hidden="true">→</span></Link>
            <Link className="button ghostLight" href="/register/exhibitor">Register Interest <span aria-hidden="true">→</span></Link>
          </div>
        </Reveal>
        <div className="homeSponsorGraphic" aria-hidden="true"><span>PARTNER</span><strong>WITH IRAQ
HOME EXPO</strong><i /></div>
      </section>

      <VideoFeature
        title="Experience the work behind the exhibition"
        copy="Watch organizer achievements and previous exhibition work. This panel currently links to the Success Steps YouTube channel and is ready for a specific showreel embed when you provide it."
        channelUrl={media.organizerYoutube}
      />

      <section className="finalCta">
        <div className="finalCtaContent">
          <span className="eyebrow light">Be part of Iraq Home Expo 2027</span>
          <h2 className="displayHeading finalCtaTitle">Meet the market in Baghdad.</h2>
          <div className="finalCtaMeta">
            <span className="finalCtaDate">{event.dates}</span>
            <span className="finalCtaVenue">{event.venue}</span>
          </div>
        </div>
        <div className="finalCtaActions">
          <Link className="button gold" href="/register/visitor">
            Register to Visit <span aria-hidden="true">→</span>
          </Link>
          <Link className="button ghostLight" href="/register/exhibitor">
            Exhibit with Us <span aria-hidden="true">→</span>
          </Link>
          <Link className="button ghostLight sponsorCta" href="/sponsor">
            Become a Sponsor <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
