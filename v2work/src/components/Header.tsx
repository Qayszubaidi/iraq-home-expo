"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, sectors, event } from "@/data/site";

function Chevron(){return <svg className="chevron" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5 6 6.5l5-5"/></svg>}
function SocialIcon({type}:{type:"facebook"|"instagram"}){return type==="facebook"?
<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v5h4v-5h3.2l.8-4H13V9c0-.7.3-1 1-1Z"/></svg>:
<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>36);onScroll();addEventListener("scroll",onScroll,{passive:true});return()=>removeEventListener("scroll",onScroll)},[]);
  useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow=""}},[open]);
  const closeMenu=()=>{setOpen(false);setSectorsOpen(false)};

  return <>
    <div className={`utilityBar ${scrolled?"hideUtility":""}`}>
      <div className="utilityInner">
        <div className="utilityInfo">
          <span>Baghdad International Fair</span><i/>
          <span>{event.dates}</span><i/>
          <a href="mailto:info@iraqhomeexpo.com">info@iraqhomeexpo.com</a>
        </div>
        <div className="utilitySocial"><a href="#" aria-label="Facebook"><SocialIcon type="facebook"/></a><a href="#" aria-label="Instagram"><SocialIcon type="instagram"/></a></div>
      </div>
    </div>
    <header className={`siteHeader ${scrolled?"isScrolled":""}`}>
      <div className="headerInner">
        <Link href="/" className="logoLockup" aria-label="Iraq Home Expo home">
          <Image src="/assets/iraq-home-expo-logo.png" alt="Iraq Home Expo" width={310} height={130} priority/>
        </Link>
        <nav className="desktopNav" aria-label="Primary navigation">
          {nav.map(([label,href])=>label==="Sectors"?<div className="megaWrap" key={href}>
            <Link href={href} className="navWithChevron">{label}<Chevron/></Link>
            <div className="megaMenu" role="menu">
              <div className="megaIntro"><span>Exhibition sectors</span><strong>Explore the complete home industry.</strong><p>Eight focused sectors bringing products, technologies and suppliers together in Baghdad.</p><Link href="/sectors">View all sectors <b>→</b></Link></div>
              <div className="megaLinks">{sectors.map((s,i)=><Link key={s.slug} href={`/sectors/${s.slug}`} role="menuitem"><em>{String(i+1).padStart(2,"0")}</em><b>{s.title}</b><span>↗</span></Link>)}</div>
            </div>
          </div>:<Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className="headerCta actionCta" href="/register"><span>Register</span><b>→</b></Link>
        <button className={`menuButton ${open?"isOpen":""}`} aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)}><span/><span/><span/></button>
      </div>
    </header>
    <div className={`mobileMenuOverlay ${open?"open":""}`} aria-hidden={!open}>
      <nav className="mobileMenu" aria-label="Mobile navigation">
        {nav.map(([label,href])=>label==="Sectors"?<div className="mobileNavGroup" key={href}><button className="mobileNavToggle" type="button" aria-expanded={sectorsOpen} onClick={()=>setSectorsOpen(!sectorsOpen)}><span>{label}</span><Chevron/></button>{sectorsOpen&&<div className="mobileSubNav"><Link onClick={closeMenu} href="/sectors">All Sectors</Link>{sectors.map(s=><Link key={s.slug} onClick={closeMenu} href={`/sectors/${s.slug}`}>{s.title}<span>↗</span></Link>)}</div>}</div>:<Link onClick={closeMenu} key={href} href={href} className="mobileNavLink">{label}</Link>)}
        <Link onClick={closeMenu} href="/register" className="mobileRegisterCta">Register <span>→</span></Link>
        <div className="mobileContact"><a href="tel:+9647824455860">+964 782 445 5860</a><a href="mailto:info@iraqhomeexpo.com">info@iraqhomeexpo.com</a></div>
      </nav>
    </div>
  </>;
}
