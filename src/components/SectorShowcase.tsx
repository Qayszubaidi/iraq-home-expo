import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Sector } from "@/data/site";

type SectorShowcaseProps = {
  sectors: Sector[];
};

export default function SectorShowcase({ sectors }: SectorShowcaseProps) {
  return (
    <section className="sectorShowcase">
      <div className="sectorShowcaseInner">
        <Reveal className="sectionHead">
          <div>
            <span className="eyebrow light">Eight Core Industries</span>
            <h2 className="displayHeading">Explore the exhibition sectors.</h2>
          </div>
          <Link href="/sectors" className="textLink light">
            View all sectors <span className="arrow">→</span>
          </Link>
        </Reveal>
        <div className="sectorRail" role="list">
          {sectors.map((s, i) => (
            <Link
              href={`/sectors/${s.slug}`}
              className={`sectorCard sectorCard--${(i % 4) + 1}`}
              key={s.slug}
              role="listitem"
            >
              <Image src={s.image} fill alt={s.title} sizes="(max-width:768px) 85vw, 420px" />
              <div className="cardShade" />
              <span className="index">{String(i + 1).padStart(2, "0")}</span>
              <div className="sectorCardBody">
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="sectorArrow" aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="sectorRailHint" aria-hidden="true">
          <span>Scroll to explore</span>
          <i />
        </div>
      </div>
    </section>
  );
}
