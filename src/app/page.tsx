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
import { event, marketStats, sectors, media } from "@/data/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Image
          src="/assets/hero-interior.webp"
          fill
          priority
          alt="Contemporary interior design"
          className="cover heroImage"
          sizes="100vw"
        />
        <div className="heroGradient" />
        <div className="heroPattern" aria-hidden="true" />
        <div className="heroContent">
          <MaskReveal>
            <div className="heroLabels">
              <span className="archLabel">{event.dates}</span>
              <span className="archLabel">{event.city}</span>
            </div>
            <h1 className="heroTitle">
              <span className="heroTitleLine">Iraq&apos;s home &amp;</span>
              <span className="heroTitleLine">interiors market</span>
              <span className="heroTitleLine heroTitleAccent">
                meets here<span className="heroTitleDot">.</span>
              </span>
            </h1>
            <p className="heroLead">
              An international exhibition connecting manufacturers, brands and professional
              buyers across Iraq&apos;s evolving home market.
            </p>
            <div className="actions">
              <Link className="button gold" href="/register#visitor">
                Visit the Expo <span aria-hidden="true">→</span>
              </Link>
              <Link className="button ghost" href="/exhibit">
                Exhibit with Us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </MaskReveal>
        </div>
        <div className="heroMeta">
          <div className="archLabelBlock">
            <small>Venue</small>
            <span>{event.venue}</span>
          </div>
          <div className="archLabelBlock">
            <small>Location</small>
            <span>{event.city}</span>
          </div>
          <div className="archLabelBlock">
            <small>Hours</small>
            <span>{event.hours}</span>
          </div>
        </div>
        <div className="scrollCue">
          <span>Scroll</span>
          <i />
        </div>
      </section>

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

      <SectorShowcase sectors={sectors} />

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
          <Link className="button gold" href="/register#visitor">
            Register to Visit <span aria-hidden="true">→</span>
          </Link>
          <Link className="button ghostLight" href="/register#exhibitor">
            Exhibit with Us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
