import type {MetadataRoute} from "next";
import {sectors} from "@/data/site";

export default function sitemap():MetadataRoute.Sitemap{
  const base="https://iraqhomeexpo.com";
  const now=new Date();
  const routes=[
    ["",1,"weekly"],
    ["/exhibit",.95,"weekly"],
    ["/visit",.95,"weekly"],
    ["/sectors",.9,"weekly"],
    ["/why-iraq",.9,"weekly"],
    ["/about",.85,"monthly"],
    ["/sponsor",.85,"monthly"],
    ["/register",.9,"monthly"],
    ["/register/visitor",.9,"monthly"],
    ["/register/exhibitor",.9,"monthly"],
    ["/contact",.8,"monthly"],
    ["/privacy",.3,"yearly"],
    ["/terms",.3,"yearly"],
  ] as const;
  return [
    ...routes.map(([path,priority,changeFrequency])=>({url:base+path,lastModified:now,changeFrequency,priority})),
    ...sectors.map(s=>({url:`${base}/sectors/${s.slug}`,lastModified:now,changeFrequency:"monthly" as const,priority:.85}))
  ];
}
