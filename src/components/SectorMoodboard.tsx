import Image from "next/image";
import Link from "next/link";
import { sectors } from "@/data/site";

export default function SectorMoodboard({title,slug}:{title:string;slug:string}){
  const index = sectors.findIndex((sector) => sector.slug === slug);
  const current = sectors[index];
  const next = sectors[(index + 1) % sectors.length];
  const nextTwo = sectors[(index + 2) % sectors.length];

  const tiles=[
    {image:current.image,label:`${title} focus`,className:"moodMain",slug:current.slug},
    {image:next.image,label:next.title,className:"moodSide",slug:next.slug},
    {image:nextTwo.image,label:nextTwo.title,className:"moodSide",slug:nextTwo.slug},
  ];

  return <section className="sectorMoodboard">
    <div className="moodIntro">
      <span className="eyebrow dark">Products · spaces · business</span>
      <h2>A sector designed to be explored.</h2>
      <p>Large-format imagery gives each industry its own visual identity while keeping the focus on products, environments and the exhibition experience.</p>
    </div>
    <div className="moodGrid">
      {tiles.map((tile,i)=><Link href={`/sectors/${tile.slug}`} className={tile.className} key={`${tile.label}-${i}`} aria-label={`Explore ${tile.label}`}>
        <Image fill src={tile.image} alt={`${tile.label} at Iraq Home Expo 2027`}/><div className="moodShade"/><figcaption><span>{String(i+1).padStart(2,"0")}</span>{tile.label}<b aria-hidden="true">↗</b></figcaption>
      </Link>)}
    </div>
  </section>
}
