import type { Metadata } from "next";
import SeoBreadcrumbs from "@/components/SeoBreadcrumbs";
import SeoJsonLd from "@/components/SeoJsonLd";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/seo";
import PageHero from "@/components/PageHero";
export const metadata: Metadata={title:"Privacy Policy | Iraq Home Expo 2027",description:"Privacy information for Iraq Home Expo website visitors, registration enquiries, analytics and communications.",alternates:{canonical:"https://iraqhomeexpo.com/privacy"}};
export default function Privacy(){return <><SeoJsonLd data={pageJsonLd({path:"/privacy",name:"Privacy Policy | Iraq Home Expo 2027",description:"Privacy information for Iraq Home Expo website visitors, registration enquiries, analytics and communications.",keywords:["Iraq Home Expo","Iraq Expo"]})}/>
<PageHero eyebrow="Legal" title="Privacy Policy" copy="Privacy information for Iraq Home Expo website visitors and registration enquiries."/>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbJsonLd([{name:"Iraq Home Expo 2027",path:"/"},{name:"Privacy Policy",path:"/privacy"}]))}}/>
<SeoBreadcrumbs items={[{label:"Home",href:"/"},{label:"Privacy Policy"}]}/>
<section className="contentSplit"><div><h2>Privacy and registration data.</h2></div><div><p>This page is reserved for the final approved privacy policy covering website forms, registration enquiries, email communication and analytics.</p><p>Before production launch, the organizer should approve the final legal text and data-retention policy.</p></div></section></>}
