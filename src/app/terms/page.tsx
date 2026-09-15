import type { Metadata } from "next";
import SeoBreadcrumbs from "@/components/SeoBreadcrumbs";
import SeoJsonLd from "@/components/SeoJsonLd";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/seo";
import PageHero from "@/components/PageHero";
export const metadata: Metadata={title:"Terms & Conditions",description:"Terms governing use of the Iraq Home Expo website and online visitor, exhibitor and sponsorship enquiry services.",alternates:{canonical:"https://iraqhomeexpo.com/terms"}};
export default function Terms(){return <><SeoJsonLd data={pageJsonLd({path:"/terms",name:"Terms & Conditions | Iraq Home Expo 2027",description:"Terms governing use of the Iraq Home Expo website and online visitor, exhibitor and sponsorship enquiry services.",keywords:["Iraq Home Expo","Iraq Expo"]})}/>
<PageHero eyebrow="Legal" title="Terms & Conditions" copy="Terms governing use of the Iraq Home Expo website and online registration services."/>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbJsonLd([{name:"Iraq Home Expo 2027",path:"/"},{name:"Terms & Conditions",path:"/terms"}]))}}/>
<SeoBreadcrumbs items={[{label:"Home",href:"/"},{label:"Terms & Conditions"}]}/>
<section className="contentSplit"><div><h2>Website terms.</h2></div><div><p>This page is reserved for final approved terms and conditions. No admission-price, payment or automatic stand-booking terms are assumed in the current website build.</p></div></section></>}
