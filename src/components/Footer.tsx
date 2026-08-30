import Image from "next/image";
import Link from "next/link";
import { event, sectors } from "@/data/site";
import type { PublicSiteSettings } from "@/lib/cms/public";

function Social({kind}:{kind:"facebook"|"instagram"}){return kind==="facebook"?<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v5h4v-5h3.2l.8-4H13V9c0-.7.3-1 1-1Z"/></svg>:<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>}

export default function Footer({cmsSettings}:{cmsSettings?:PublicSiteSettings|null}){const site={dates:cmsSettings?.dates||event.dates,venue:cmsSettings?.venue||event.venue,city:cmsSettings?.city||event.city,infoEmail:cmsSettings?.infoEmail||"info@iraqhomeexpo.com",salesEmail:cmsSettings?.salesEmail||"sales@iraqhomeexpo.com",phone1:cmsSettings?.phone1||"+964 782 445 5860",phone2:cmsSettings?.phone2||"+964 770 255 0297",facebook:cmsSettings?.facebook||"https://www.facebook.com/profile.php?id=61591852047921",instagram:cmsSettings?.instagram||"https://www.instagram.com/iraqhomeexpo/"};return <footer className="v4Footer">
  <div className="v4FooterGlow" aria-hidden="true"/>
  <div className="v4FooterGrid">
    <section className="v4FooterBrand">
      <Link href="/" className="v4FooterLogo"><Image src="/assets/iraq-home-expo-logo-white.png" width={309} height={90} alt="Iraq Home Expo"/></Link>
      <p>Iraq Home Expo brings the home, interiors and residential industry together in Baghdad.</p>
      <div className="v4FooterSocial"><a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Social kind="facebook"/></a><a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Social kind="instagram"/></a></div>
    </section>
    <section className="v4FooterCol"><h3>Quick Links</h3><Link href="/about">About</Link><Link href="/why-iraq">Why Iraq</Link><Link href="/visit">Visit</Link><Link href="/exhibit">Exhibit</Link><Link href="/sponsor">Sponsor</Link><Link href="/contact">Contact</Link></section>
    <section className="v4FooterCol"><h3>Exhibition Sectors</h3>{sectors.slice(0,6).map(s=><Link href={`/sectors/${s.slug}`} key={s.slug}>{s.title}</Link>)}</section>
    <section className="v4FooterContact"><h3>Contact & Location</h3><div className="v4EventCard"><span>Event</span><strong>{site.dates}</strong><small>{site.venue}<br/>{site.city}</small></div><a href={`mailto:${site.infoEmail}`}>{site.infoEmail}</a><a href={`mailto:${site.salesEmail}`}>{site.salesEmail}</a><a href={`tel:${site.phone1.replace(/\s/g,"")}`}>{site.phone1}</a><a href={`tel:${site.phone2.replace(/\s/g,"")}`}>{site.phone2}</a></section>
  </div>
  <div className="v4FooterBottom"><span>© 2027 Iraq Home Expo. All rights reserved.</span><span>Organized by <a href="https://www.success-steps.co/" target="_blank" rel="noreferrer">Success Steps</a></span><span>Creative Design & Development by <a href="https://codeyea.com" target="_blank" rel="noreferrer">CODEYEA Creative Design Agency</a></span></div>
</footer>}
