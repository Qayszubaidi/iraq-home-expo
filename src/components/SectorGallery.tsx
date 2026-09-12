import Image from "next/image";
import Link from "next/link";
import {sectors} from "@/data/site";

export default function SectorGallery({slug,title}:{slug:string,title:string}){
  const current=sectors.find(s=>s.slug===slug)!;
  const index=sectors.findIndex(s=>s.slug===slug);
  const related=[current,sectors[(index+1)%sectors.length],sectors[(index+2)%sectors.length],sectors[(index+3)%sectors.length]];
  return <section className="sectorGallery" aria-labelledby={`${slug}-gallery-heading`}>
    <div className="sectorGalleryHead">
      <div><span className="eyebrow dark">Sector Gallery</span><h2 id={`${slug}-gallery-heading`}>Products, spaces and solutions across {title}.</h2></div>
      <p>The gallery uses Iraq Home Expo&apos;s approved visual library. Sector-specific exhibitor and event photography can replace these references as new material becomes available.</p>
    </div>
    <div className="sectorGalleryGrid">
      {related.map((item,i)=><Link href={`/sectors/${item.slug}`} key={`${item.slug}-${i}`} className={`sectorGalleryItem g${i+1}`} aria-label={`Explore ${item.title} exhibition sector`}>
        <Image src={item.image} fill alt={`${item.title} products and exhibition solutions at Iraq Home Expo 2027 in Baghdad`} sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1180px) 45vw, 600px"/>
        <div className="sectorGalleryCaption"><span>{String(i+1).padStart(2,"0")}</span><strong>{item.title}</strong><b aria-hidden="true">↗</b></div>
      </Link>)}
    </div>
  </section>
}
