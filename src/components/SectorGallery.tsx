import Image from "next/image";
import {sectors} from "@/data/site";

export default function SectorGallery({slug,title}:{slug:string,title:string}){
  const current=sectors.find(s=>s.slug===slug)!;
  const index=sectors.findIndex(s=>s.slug===slug);
  const related=[
    current,
    sectors[(index+1)%sectors.length],
    sectors[(index+2)%sectors.length],
    sectors[(index+3)%sectors.length],
  ];
  return <section className="sectorGallery">
    <div className="sectorGalleryHead">
      <div><span className="eyebrow dark">Sector Gallery</span><h2>Products, spaces and solutions across {title}.</h2></div>
      <p>The gallery uses Iraq Home Expo&apos;s approved visual library. Sector-specific exhibitor and event photography can replace these references as new material becomes available.</p>
    </div>
    <div className="sectorGalleryGrid">
      {related.map((item,i)=><figure key={`${item.slug}-${i}`} className={`sectorGalleryItem g${i+1}`}>
        <Image src={item.image} fill alt={`${item.title} visual reference`} sizes="(max-width: 760px) 100vw, 50vw"/>
        <figcaption><span>{String(i+1).padStart(2,"0")}</span><strong>{item.title}</strong></figcaption>
      </figure>)}
    </div>
  </section>
}
