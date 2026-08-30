import Image from "next/image";
import Link from "next/link";
import MaskReveal from "@/components/MaskReveal";
import { event } from "@/data/site";
import { getCmsPage, getPublicSiteSettings } from "@/lib/cms/public";

export default async function CmsHomeHero() {
  const [cms, settings] = await Promise.all([getCmsPage("home"), getPublicSiteSettings()]);
  const dates = settings?.dates || event.dates;
  const city = settings?.city || event.city;
  const venue = settings?.venue || event.venue;
  const hours = settings?.hours || event.hours;
  const image = cms?.heroImage || "/assets/hero-interior.webp";
  const title = cms?.title || "Iraq's home & interiors market meets here.";
  const copy = cms?.copy || "An international exhibition connecting manufacturers, brands and professional buyers across Iraq's evolving home market.";
  return <section className="hero">
    <Image src={image} fill priority alt={cms?.heroAlt || "Contemporary interior design"} className="cover heroImage" sizes="100vw" style={{objectPosition: cms?.heroPosition || "center center"}} />
    <div className="heroGradient"/><div className="heroPattern" aria-hidden="true"/>
    <div className="heroContent"><MaskReveal>
      <div className="heroLabels"><span className="archLabel">{dates}</span><span className="archLabel">{city}</span></div>
      <h1 className="heroTitle"><span className="heroTitleLine">{title}</span></h1>
      <p className="heroLead">{copy}</p>
      <div className="actions"><Link className="button gold" href={cms?.primaryHref || "/register/visitor"}>{cms?.primary || "Visit the Expo"} <span aria-hidden="true">→</span></Link><Link className="button ghost" href="/exhibit">Exhibit with Us <span aria-hidden="true">→</span></Link></div>
    </MaskReveal></div>
    <div className="heroMeta"><div className="archLabelBlock"><small>Venue</small><span>{venue}</span></div><div className="archLabelBlock"><small>Location</small><span>{city}</span></div><div className="archLabelBlock"><small>Hours</small><span>{hours}</span></div></div>
    <div className="scrollCue"><span>Scroll</span><i/></div>
  </section>;
}
