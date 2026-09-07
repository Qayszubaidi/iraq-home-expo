import type {Metadata} from "next";
import PageHero from "@/components/PageHero";
import {SmartForm} from "@/components/Forms";
import {getPublicSiteSettings} from "@/lib/cms/public";
import ContactPageTracking from "@/components/ContactPageTracking";

export const metadata:Metadata={
  title:"Contact Iraq Home Expo 2027 | Baghdad, Iraq",
  description:"Contact Iraq Home Expo 2027 for visitor registration, exhibitor opportunities, sponsorship and general enquiries in Baghdad, Iraq.",
  alternates:{canonical:"https://iraqhomeexpo.com/contact"},
  openGraph:{
    title:"Contact Iraq Home Expo 2027 | Baghdad, Iraq",
    description:"Contact the Iraq Home Expo team for visitor, exhibitor and sponsorship enquiries.",
    url:"https://iraqhomeexpo.com/contact",
    type:"website"
  }
};

export default async function Contact(){
  const s=await getPublicSiteSettings();
  const info=s?.infoEmail||"info@iraqhomeexpo.com",
    sales=s?.salesEmail||"sales@iraqhomeexpo.com",
    phone1=s?.phone1||"+964 782 445 5860",
    phone2=s?.phone2||"+964 770 255 0297",
    venue=s?.venue||"Baghdad International Fair",
    city=s?.city||"Baghdad, Iraq";
  return <>
    <ContactPageTracking/>
    <PageHero cmsKey="contact" eyebrow="Get in Touch" title="Contact Iraq Home Expo" copy="Contact our team for visitor enquiries, exhibiting opportunities, registration support and general information." image="/assets/build-partnerships.webp" imageAlt="Iraq Home Expo business team discussing exhibitor and visitor enquiries"/>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbJsonLd([{name:"Iraq Home Expo 2027",path:"/"},{name:"Contact",path:"/contact"}]))}}/>
<SeoBreadcrumbs items={[{label:"Home",href:"/"},{label:"Contact"}]}/>
    <section className="contactGrid"><div><span>General Enquiries</span><a href={`mailto:${info}`}>{info}</a></div><div><span>Sales & Exhibiting</span><a href={`mailto:${sales}`}>{sales}</a></div><div><span>Phone / WhatsApp</span><a href={`tel:${phone1.replace(/\s/g,"")}`}>{phone1}</a><a href={`tel:${phone2.replace(/\s/g,"")}`}>{phone2}</a></div><div><span>Venue</span><strong>{venue}<br/>{city}</strong></div></section>
    <section className="formSection"><div><span className="eyebrow dark">Our team is ready to help</span><h2>Send us a message.</h2><p>We’ll route your enquiry to the appropriate Iraq Home Expo team.</p></div><SmartForm type="contact"/></section>
  </>;
}
