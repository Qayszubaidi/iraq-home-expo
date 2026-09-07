"use client";
import {useEffect} from "react";

declare global { interface Window { dataLayer?:Record<string,unknown>[] } }

export default function ContactPageTracking(){
  useEffect(()=>{
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({event:"contact_page_view",page_type:"contact",page_path:"/contact"});
  },[]);
  return null;
}
