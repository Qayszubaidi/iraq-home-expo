import Image from "next/image";
import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  copy,
  image = "/assets/hero-interior.webp",
  imageAlt = "Iraq Home Expo",
  primary = "Register",
  primaryHref = "/register",
  compact = false,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  imageAlt?: string;
  primary?: string;
  primaryHref?: string;
  compact?: boolean;
}) {
  return (
    <section className={`modernPageHero ${compact ? "compact" : ""}`}>
      <div className="modernPageHeroShell">
        <div className="modernPageHeroCopy">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{copy}</p>
          <Link className="button gold" href={primaryHref}>
            {primary}<span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="modernPageHeroMedia">
          <Image src={image} fill priority alt={imageAlt} sizes="(max-width: 900px) 100vw, 58vw" />
          <div className="modernPageHeroMediaShade" aria-hidden="true" />
          <div className="modernPageHeroArch" aria-hidden="true" />
          <span className="modernPageHeroIndex" aria-hidden="true">Iraq Home Expo · 2027</span>
        </div>
      </div>
    </section>
  );
}
