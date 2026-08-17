"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, sectors } from "@/data/site";

export default function Header(){
  const [scrolled,setScrolled]=useState(false); const [open,setOpen]=useState(false);
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>24); f(); addEventListener("scroll",f,{passive:true}); return()=>removeEventListener("scroll",f)},[]);
  return <header className={`siteHeader ${scrolled?"isScrolled":""}`}>
    <Link href="/" className="logoPlate" aria-label="Iraq Home Expo home"><Image src="/assets/iraq-home-expo-logo.png" alt="Iraq Home Expo" width={220} height={98} priority/></Link>
    <nav className="desktopNav" aria-label="Primary navigation">
      {nav.map(([label,href])=> label==="Sectors" ? <div className="megaWrap" key={href}><Link href={href}>{label}</Link><div className="megaMenu">{sectors.map(s=><Link key={s.slug} href={`/sectors/${s.slug}`}>{s.title}<span>↗</span></Link>)}</div></div> : <Link key={href} href={href}>{label}</Link>)}
    </nav>
    <Link className="headerCta" href="/register">Register <span>↗</span></Link>
    <button className="menuButton" aria-label="Open menu" onClick={()=>setOpen(!open)}><span/><span/></button>
    {open && <div className="mobileMenu">{nav.map(([l,h])=><Link onClick={()=>setOpen(false)} key={h} href={h}>{l}</Link>)}<Link onClick={()=>setOpen(false)} href="/register">Register</Link></div>}
  </header>
}
