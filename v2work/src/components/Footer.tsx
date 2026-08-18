import Image from "next/image";
import Link from "next/link";
import { event, sectors } from "@/data/site";

function Social({kind}:{kind:"facebook"|"instagram"}){return kind==="facebook"?<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v5h4v-5h3.2l.8-4H13V9c0-.7.3-1 1-1Z"/></svg>:<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>}

export default function Footer(){return <footer className="footer footerBaquet">
  <div className="footerPattern" aria-hidden="true"/>
  <div className="footerTop">
    <div className="footerBrand">
      <div className="footerLogo"><Image src="/assets/iraq-home-expo-logo.png" width={310} height={130} alt="Iraq Home Expo"/></div>
      <p>Iraq Home Expo brings the home, interiors and residential industry together in Baghdad.</p>
      <div className="footerSocial"><a href="#" aria-label="Facebook"><Social kind="facebook"/></a><a href="#" aria-label="Instagram"><Social kind="instagram"/></a></div>
    </div>
    <div className="footerCol"><h3>Quick Links</h3><Link href="/about">About</Link><Link href="/why-iraq">Why Iraq</Link><Link href="/visit">Visit</Link><Link href="/exhibit">Exhibit</Link><Link href="/contact">Contact</Link></div>
    <div className="footerCol"><h3>Exhibition Sectors</h3>{sectors.slice(0,6).map(s=><Link href={`/sectors/${s.slug}`} key={s.slug}>{s.title}</Link>)}</div>
    <div className="footerCol footerContact"><h3>Contact & Location</h3><div className="footerInfoCard"><span>Event</span><strong>{event.dates}</strong><small>{event.venue}<br/>{event.city}</small></div><a href="mailto:info@iraqhomeexpo.com">info@iraqhomeexpo.com</a><a href="mailto:sales@iraqhomeexpo.com">sales@iraqhomeexpo.com</a><a href="tel:+9647824455860">+964 782 445 5860</a><a href="tel:+9647702550297">+964 770 255 0297</a></div>
  </div>
  <div className="footerBottom"><span>© 2027 Iraq Home Expo. All rights reserved.</span><span>Organized by Success Steps</span><span>Creative Design & Development by <a href="https://codeyea.com" target="_blank" rel="noreferrer">CODEYEA Creative Design Agency</a></span></div>
</footer>}
