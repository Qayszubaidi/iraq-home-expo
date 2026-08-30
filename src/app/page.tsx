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

export default async function Home() {
  const displaySectors = await getCmsSectors(sectors);
  return (
    <>
      <CmsHomeHero />

      <section className="institutional">
        <span>Organized by</span>
        <Image src="/assets/success-steps-logo.webp" width={170} height={70} alt="Success Steps" />
        <span>With institutional partners</span>
        <Image src="/assets/ministry-trade-logo.webp" width={100} height={70} alt="Ministry of Trade" />
        <Image src="/assets/expo-partner-logo.webp" width={110} height={70} alt="Partner" />
      </section>

      <SectorTicker />

      <section className="aboutIntro">
        <div className="aboutIntroLeft">
          <span className="aboutNumber" aria-hidden="true">
            01
          </span>
          <span className="goldLine" aria-hidden="true" />
          <Reveal>
            <span className="eyebrow dark">About the Exhibition</span>
            <h2 className="displayHeading aboutHeading">
              <span className="displayHeadingLine">Where design,</span>
              <span className="displayHeadingLine">products &amp;</span>
              <span className="displayHeadingLine">business</span>
              <span className="displayHeadingLine">come together.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal className="aboutIntroRight">
          <p>
            Iraq Home Expo creates a focused meeting point for companies serving the home,
            interiors and residential markets—connecting international supply with professional
            demand in Iraq.
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
