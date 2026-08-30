import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getCmsPage } from "@/lib/cms/public";

export default async function PageHero({
  eyebrow,
  title,
  copy,
  image = "/assets/hero-interior.webp",
  imageAlt = "Iraq Home Expo",
  primary = "Register",
  primaryHref = "/register",
  compact = false,
  imagePosition = "center center",
  cmsKey,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  imageAlt?: string;
  primary?: string;
  primaryHref?: string;
  compact?: boolean;
  imagePosition?: string;
  cmsKey?: string;
}) {
  const cms = cmsKey ? await getCmsPage(cmsKey) : null;
  const hero = {
    eyebrow: cms?.eyebrow || eyebrow,
    title: cms?.title || title,
    copy: cms?.copy || copy,
    image: cms?.heroImage || image,
    imageAlt: cms?.heroAlt || imageAlt,
    primary: cms?.primary || primary,
    primaryHref: cms?.primaryHref || primaryHref,
    imagePosition: cms?.heroPosition || imagePosition,
  };
  return (
    <section className={`modernPageHero ${compact ? "compact" : ""}`}>
      <div className="modernPageHeroShell">
        <div className="modernPageHeroCopy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p>{hero.copy}</p>
          <Link className="button gold" href={hero.primaryHref}>
            {hero.primary}<span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="modernPageHeroMedia" style={{ "--hero-object-position": hero.imagePosition } as CSSProperties}>
          <Image src={hero.image} fill priority alt={hero.imageAlt} sizes="(max-width: 900px) 100vw, 58vw" />
          <div className="modernPageHeroMediaShade" aria-hidden="true" />
          <div className="modernPageHeroArch" aria-hidden="true" />
          <span className="modernPageHeroIndex" aria-hidden="true">Iraq Home Expo · 2027</span>
        </div>
      </div>
    </section>
  );
}
