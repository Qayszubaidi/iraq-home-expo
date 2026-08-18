import Image from "next/image";
import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  copy,
  image = "/assets/hero-interior.webp",
  primary = "Register",
  primaryHref = "/register",
}:{
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  primary?: string;
  primaryHref?: string;
}) {
  return (
    <section className="pageHero classicPageHero">
      <Image src={image} fill priority alt="" className="cover" sizes="100vw" />
      <div className="shade" />
      <div className="pageHeroContent">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
        <Link className="button gold" href={primaryHref}>
          {primary}<span>↗</span>
        </Link>
      </div>
    </section>
  );
}
