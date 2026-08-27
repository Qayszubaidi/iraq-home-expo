import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const items = [
  ["/assets/sector-card-interiors.webp", "Interiors", "/sectors/interiors"],
  ["/assets/sector-card-furniture.webp", "Furniture", "/sectors/furniture-home-furnishings"],
  ["/assets/sector-card-kitchen.webp", "Kitchen", "/sectors/kitchen"],
  ["/assets/sector-card-textiles.webp", "Home Textiles", "/sectors/home-textiles"],
  ["/assets/sector-card-lighting.webp", "Lighting & Electrical", "/sectors/home-lighting-electrical"],
] as const;

export default function ImageGallery() {
  return (
    <section className="editorialGallery">
      <Reveal className="galleryIntro">
        <span className="eyebrow dark">Inside the home industry</span>
        <h2 className="displayHeading">Designed to be explored.</h2>
        <p>
          A visual journey through the products, spaces and systems shaping modern residential
          environments.
        </p>
        <Link className="textLink" href="/sectors">
          Explore all sectors <span className="arrow">→</span>
        </Link>
      </Reveal>
      <div className="galleryMosaic">
        {items.map(([img, title, href], i) => (
          <Reveal key={title} className={`galleryTileWrap tile${i + 1}`}>
            <Link href={href} className="galleryTile">
              <Image fill src={img} alt={title} sizes="(max-width:768px) 100vw, 50vw" />
              <div className="galleryShade" />
              <span className="galleryIndex">{String(i + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
