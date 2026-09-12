import SeoJsonLd from "@/components/SeoJsonLd";
import type { Metadata } from "next";
import SeoBreadcrumbs from "@/components/SeoBreadcrumbs";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/seo";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { event } from "@/data/site";

export const metadata: Metadata = {
  title: "Sponsor Iraq Home Expo 2027 | Exhibition Sponsorship Opportunities",
  description: "Explore sponsorship opportunities at Iraq Home Expo 2027 and build brand visibility with buyers, distributors and decision-makers in Iraq's home and interiors market.",
  alternates:{canonical:"https://iraqhomeexpo.com/sponsor"},
  openGraph:{title:"Sponsor Iraq Home Expo 2027 | Exhibition Sponsorship Opportunities",description:"Explore sponsorship opportunities at Iraq Home Expo 2027 and build brand visibility with buyers, distributors and decision-makers in Iraq's home and interiors market.",url:"https://iraqhomeexpo.com/sponsor",type:"website",images:[{url:"/assets/hero-sponsor-business.webp",alt:"Business sponsorship meeting for Iraq Home Expo 2027"}]},
};
const benefits = [
  ["01", "Brand Visibility", "Strengthen your brand presence around selected exhibition communications, visitor touchpoints and event experiences."],
  ["02", "Industry Positioning", "Associate your company with Iraq's dedicated international exhibition for home, interiors and residential solutions."],
  ["03", "Professional Reach", "Build visibility with buyers, distributors, designers, developers and decision-makers attending the exhibition."],
  ["04", "Tailored Opportunities", "Discuss sponsorship opportunities with our team so your participation can reflect your objectives and market priorities."],
];

export default function SponsorPage() {
  return <>
    <SeoJsonLd data={pageJsonLd({path:"/sponsor",type:"WebPage",name:"Sponsor Iraq Home Expo 2027 | Exhibition Sponsorship Opportunities",description:"Explore sponsorship opportunities at Iraq Home Expo 2027 and build brand visibility with buyers, distributors and decision-makers in Iraq's home and interiors market.",image:"/assets/hero-sponsor-business.webp",keywords:["Iraq expo sponsorship", "Baghdad business exhibition"]})}/>
<PageHero
      compact
      eyebrow="Partnership Opportunities"
      title="Become a Sponsor"
      copy="Put your brand at the center of Iraq Home Expo 2027 and connect with the professional audience shaping Iraq's home and interiors market."
      image="/assets/hero-sponsor-business.webp"
      imageAlt="Business sponsorship meeting for Iraq Home Expo 2027 in Baghdad"
      imagePosition="bottom center"
      primary="Discuss Sponsorship"
      primaryHref="/register/exhibitor"
    />
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbJsonLd([{name:"Iraq Home Expo 2027",path:"/"},{name:"Sponsor Iraq Home Expo",path:"/sponsor"}]))}}/>
<SeoBreadcrumbs items={[{label:"Home",href:"/"},{label:"Sponsor Iraq Home Expo"}]}/>

    <section className="contentSplit sponsorIntro">
      <Reveal>
        <span className="eyebrow dark">Sponsor Iraq Home Expo</span>
        <h2>Build visibility around a focused industry platform.</h2>
      </Reveal>
      <Reveal>
        <p>Iraq Home Expo brings together manufacturers, suppliers, buyers and professionals across furniture, interiors, home textiles, kitchen, bathroom, lighting, HVAC and smart-home sectors.</p>
        <p>Sponsorship offers participating brands an additional way to strengthen their presence around the exhibition and create meaningful visibility before and during the event.</p>
      </Reveal>
    </section>

    <section className="sponsorBenefits">
      {benefits.map(([number, title, copy]) => <Reveal className="sponsorBenefit" key={title}>
        <span>{number}</span>
        <h3>{title}</h3>
        <p>{copy}</p>
      </Reveal>)}
    </section>

    <section className="sponsorBand">
      <div>
        <span className="eyebrow light">{event.dates} · {event.venue}</span>
        <h2>Interested in sponsoring Iraq Home Expo 2027?</h2>
        <p>Select <strong>Sponsor</strong> or <strong>Exhibitor + Sponsor</strong> in the participation form and our team will contact you to discuss suitable opportunities.</p>
      </div>
      <div className="sponsorBandActions">
        <Link className="button gold" href="/register/exhibitor">Become a Sponsor <span>→</span></Link>
        <a className="button ghostLight" href="mailto:sales@iraqhomeexpo.com">Contact Sales <span>→</span></a>
      </div>
    </section>
  </>;
}