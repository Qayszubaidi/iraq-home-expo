import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
export const metadata: Metadata = {
  title: "Register for Iraq Home Expo 2027 | Visitor & Exhibitor Registration",
  description: "Register for Iraq Home Expo 2027 in Baghdad. Choose visitor registration or submit an exhibitor and sponsorship enquiry.",
  alternates:{canonical:"https://iraqhomeexpo.com/register"},
  openGraph:{title:"Register for Iraq Home Expo 2027 | Visitor & Exhibitor Registration",description:"Register for Iraq Home Expo 2027 in Baghdad. Choose visitor registration or submit an exhibitor and sponsorship enquiry.",url:"https://iraqhomeexpo.com/register",type:"website"},
};
export default function Register(){return <><PageHero cmsKey="register" compact eyebrow="Join Iraq Home Expo 2027" title="Choose how you want to participate." copy="Choose visitor registration, or submit an exhibitor / sponsorship enquiry through the dedicated business participation form." image="/assets/expo-event.webp" imageAlt="Professional visitors at an international exhibition in Baghdad, Iraq" primary="Register to Visit" primaryHref="/register/visitor"/>
<section className="registrationChoices standalone"><Link href="/register/visitor"><span>01</span><h2>Visitor Registration</h2><p>For professional visitors discovering suppliers, products and business opportunities.</p><b>Register to Visit →</b></Link><Link href="/register/exhibitor"><span>02</span><h2>Exhibitor & Sponsor Registration</h2><p>For manufacturers, suppliers, brands and partners interested in exhibiting, sponsoring, or combining both opportunities.</p><b>Exhibit or Sponsor →</b></Link></section></>}