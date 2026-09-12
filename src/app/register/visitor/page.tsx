import SeoJsonLd from "@/components/SeoJsonLd";
import { pageJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import {SmartForm} from "@/components/Forms";
import {event} from "@/data/site";
export const metadata: Metadata = {
  title: "Register to Visit Iraq Home Expo 2027 | Baghdad Exhibition",
  description: "Register to visit Iraq Home Expo 2027 at Baghdad International Fair and discover international furniture, interiors and home-industry suppliers.",
  alternates:{canonical:"https://iraqhomeexpo.com/register/visitor"},
  openGraph:{title:"Register to Visit Iraq Home Expo 2027 | Baghdad Exhibition",description:"Register to visit Iraq Home Expo 2027 at Baghdad International Fair and discover international furniture, interiors and home-industry suppliers.",url:"https://iraqhomeexpo.com/register/visitor",type:"website"},
};
export default function VisitorRegistration(){return <><SeoJsonLd data={pageJsonLd({path:"/register/visitor",name:"Register to Visit Iraq Home Expo 2027 | Baghdad Exhibition",description:"Register to visit Iraq Home Expo 2027 at Baghdad International Fair and discover international furniture, interiors and home-industry suppliers.",keywords:["visitor registration Iraq Expo", "Baghdad exhibition visitor"]})}/><section className="standaloneFormPage"><div className="formPageIntro"><span className="eyebrow dark">Register as a Visitor</span><h1>Join us at Iraq Home Expo 2027.</h1><p>Register your professional visit and meet suppliers, products and industry professionals across eight exhibition sectors.</p><div className="formFacts"><span>{event.dates}</span><span>{event.venue}</span><span>{event.city}</span></div><aside><h3>Why register?</h3><ul><li>Fast event entry</li><li>Discover international suppliers</li><li>Explore new products and solutions</li><li>Build professional connections</li></ul><p><strong>Need help?</strong><br/>info@iraqhomeexpo.com<br/>+964 782 445 5860</p></aside></div><div className="formPageCard"><div className="stepBar"><span className="active">1</span><i/> <span>2</span><i/> <span>3</span></div><h2>Personal & Professional Information</h2><SmartForm type="visitor"/></div></section></>}