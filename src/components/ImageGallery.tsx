import Image from "next/image";
import Link from "next/link";

const items=[
  ["/assets/interiors.webp","Interiors","/sectors/interiors"],
  ["/assets/furniture.webp","Furniture","/sectors/furniture-home-furnishings"],
  ["/assets/kitchen.webp","Kitchen","/sectors/kitchen"],
  ["/assets/home-textiles.webp","Home Textiles","/sectors/home-textiles"],
  ["/assets/lighting-electrical.webp","Lighting & Electrical","/sectors/home-lighting-electrical"],
] as const;

export default function ImageGallery(){return <section className="editorialGallery"><div className="galleryIntro"><span className="eyebrow dark">Inside the home industry</span><h2>Designed to be explored.</h2><p>A visual journey through the products, spaces and systems shaping modern residential environments.</p><Link className="textLink" href="/sectors">Explore all sectors ↗</Link></div><div className="galleryMosaic">{items.map(([img,title,href],i)=><Link href={href} className={`galleryTile tile${i+1}`} key={title}><Image fill src={img} alt={title}/><div className="galleryShade"/><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3></Link>)}</div></section>}
