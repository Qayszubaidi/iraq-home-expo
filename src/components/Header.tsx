"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { event, nav, sectors } from "@/data/site";

function Chevron(){return <svg className="v4Chevron" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5 6 6.5l5-5"/></svg>}
function SocialIcon({type}:{type:"facebook"|"instagram"}){return type==="facebook"?
<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v5h4v-5h3.2l.8-4H13V9c0-.7.3-1 1-1Z"/></svg>:
<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>}

export default function Header(){
  const pathname = usePathname();
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  const [sectorsOpen,setSectorsOpen]=useState(false);
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>42);f();window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f)},[]);
  useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow=""}},[open]);
  const close=()=>{setOpen(false);setSectorsOpen(false)};
  const active=(href:string)=>href==="/"?pathname===href:pathname.startsWith(href);
  return <>
    <div className={`v4Utility ${scrolled?"isHidden":""}`}>
      <div className="v4UtilityInner">
        <div className="v4UtilityInfo">
          <span>{event.venue}</span><i/><span>{event.dates}</span><i/><a href="mailto:info@iraqhomeexpo.com">info@iraqhomeexpo.com</a>
        </div>
        <div className="v4UtilitySocial"><a href="https://www.facebook.com/profile.php?id=61591852047921" target="_blank" rel="noreferrer" aria-label="Facebook"><SocialIcon type="facebook"/></a><a href="https://www.instagram.com/iraqhomeexpo/" target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon type="instagram"/></a></div>
      </div>
    </div>
    <header className={`v4Header ${scrolled?"isScrolled":""}`}>
      <div className="v4HeaderInner">
        <Link href="/" className="v4Logo" aria-label="Iraq Home Expo home"><Image src="/assets/iraq-home-expo-logo.png" alt="Iraq Home Expo" width={2048} height={635} priority/></Link>
        <nav className="v4Nav" aria-label="Primary navigation">
          {nav.map(([label,href])=>label==="Sectors"?<div className="v4MegaWrap" key={href}>
            <Link href={href} className={`v4NavLink v4NavSector ${active(href)?"active":""}`}>{label}<Chevron/></Link>
            <div className="v4MegaMenu">
              <div className="v4MegaHeader"><span>Exhibition sectors</span><strong>Explore Iraq Home Expo</strong><Link href="/sectors">View all sectors <b>→</b></Link></div>
              <div className="v4MegaGrid">{sectors.map((s,i)=><Link href={`/sectors/${s.slug}`} key={s.slug}><em>{String(i+1).padStart(2,"0")}</em><span>{s.title}</span><b>↗</b></Link>)}</div>
            </div>
          </div>:<Link href={href} key={href} className={`v4NavLink ${active(href)?"active":""}`}>{label}</Link>)}
        </nav>
        <Link href="/register" className="v4Register"><span>Register</span><b>→</b></Link>
        <button className={`v4MenuButton ${open?"open":""}`} aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(!open)}><span/><span/><span/></button>
      </div>
    </header>
    <div className={`v4MobileOverlay ${open?"open":""}`}>
      <nav className="v4MobileMenu">
        {nav.map(([label,href])=>label==="Sectors"?<div className="v4MobileGroup" key={href}><button onClick={()=>setSectorsOpen(!sectorsOpen)}><span>Sectors</span><Chevron/></button>{sectorsOpen&&<div className="v4MobileSub"><Link href="/sectors" onClick={close}>All sectors</Link>{sectors.map(s=><Link href={`/sectors/${s.slug}`} key={s.slug} onClick={close}>{s.title}<span>↗</span></Link>)}</div>}</div>:<Link href={href} key={href} onClick={close}>{label}</Link>)}
        <Link href="/register" className="v4MobileRegister" onClick={close}>Register <span>→</span></Link>
      </nav>
    </div>
  </>;
}
