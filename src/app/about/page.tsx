import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import VideoFeature from "@/components/VideoFeature";
import VisualBand from "@/components/VisualBand";
import ImageGallery from "@/components/ImageGallery";
import FairShowcase from "@/components/FairShowcase";
import Link from "next/link";
import {media} from "@/data/site";

export const metadata={title:"About Iraq Home Expo"};
export default function About(){return <><PageHero cmsKey="about" eyebrow="Iraq Home Expo 2027" title="Connecting the global home industry with opportunities in Iraq" copy="An international exhibition dedicated to products, technologies and solutions for the modern home." image="/assets/hero-about-expo-generated.png" imageAlt="Contemporary furniture and interiors exhibition hall with professional visitors and business meetings"/>
<section className="contentSplit"><Reveal><span className="eyebrow dark">About the exhibition</span><h2>A business platform for the home industry.</h2></Reveal><Reveal><p>Iraq Home Expo creates a focused meeting point for manufacturers and suppliers seeking to enter or expand within Iraq while giving professional buyers direct access to products, technologies and industry developments.</p><p>From furniture and interiors to kitchens, electrical systems, HVAC, smart technologies and security solutions, the complete home industry comes together under one roof.</p></Reveal></section>
<section className="featureGrid">{[["Showcase products & solutions","Present your products directly to buyers, distributors and professionals."],["Meet industry decision-makers","Connect with importers, wholesalers, retailers, designers and purchasing specialists."],["Develop business partnerships","Establish relationships with distributors, agents, customers and long-term partners."],["Explore the Iraqi market","Understand demand and identify opportunities across Iraq’s developing home sectors."]].map(([h,p])=><Reveal key={h} className="feature"><h3>{h}</h3><p>{p}</p></Reveal>)}</section>
<FairShowcase compact/>
<VisualBand image="/assets/build-partnerships.webp" eyebrow="International supply · Iraqi demand" title="A meeting place built around business." copy="Iraq Home Expo is designed to move conversations from product discovery to sourcing, distribution and long-term commercial relationships." href="/exhibit" label="Exhibit with Us"/>
<ImageGallery/>
<VideoFeature title="Success Steps — organizer achievements" copy="A visual archive of Success Steps projects, exhibition footage and organizer achievements. The current placeholder opens the official YouTube channel until the final showreel URL is selected." channelUrl={media.organizerYoutube}/>
<section className="finalCta"><div><span className="eyebrow">12–15 May 2027 · Baghdad</span><h2>Be part of Iraq Home Expo 2027.</h2></div><div><Link className="button gold" href="/register/visitor">Register to Visit ↗</Link><Link className="button ghost" href="/exhibit">Exhibit with Us ↗</Link><Link className="button ghost" href="/sponsor">Become a Sponsor ↗</Link></div></section></>}
