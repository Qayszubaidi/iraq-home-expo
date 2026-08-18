import Link from "next/link";
import PageHero from "@/components/PageHero";
export const metadata={title:"Register for Iraq Home Expo"};
export default function Register(){return <><PageHero compact eyebrow="Join Iraq Home Expo 2027" title="Choose how you want to participate." copy="Visitor and exhibitor registration are handled separately so each journey stays focused and simple." primary="Register to Visit" primaryHref="/register/visitor"/>
<section className="registrationChoices standalone"><Link href="/register/visitor"><span>01</span><h2>Visitor Registration</h2><p>For professional visitors discovering suppliers, products and business opportunities.</p><b>Register to Visit →</b></Link><Link href="/register/exhibitor"><span>02</span><h2>Exhibitor Registration</h2><p>For manufacturers, suppliers and brands interested in exhibiting at Iraq Home Expo.</p><b>Book Your Stand →</b></Link></section></>}
