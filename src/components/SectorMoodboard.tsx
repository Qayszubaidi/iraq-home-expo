import Image from "next/image";
import { sectors } from "@/data/site";

export default function SectorMoodboard({title,slug}:{title:string;slug:string}){
  const index = sectors.findIndex((sector) => sector.slug === slug);
  const current = sectors[index];
  const next = sectors[(index + 1) % sectors.length];
  const nextTwo = sectors[(index + 2) % sectors.length];

  const tiles=[
    {image:current.image,label:`${title} focus`,className:"moodMain"},
    {image:next.image,label:next.title,className:"moodSide"},
    {image:nextTwo.image,label:nextTwo.title,className:"moodSide"},
  ];

  return <section className="sectorMoodboard">
    <div className="moodIntro">
      <span className="eyebrow dark">Products · spaces · business</span>
      <h2>A sector designed to be explored.</h2>
      <p>Large-format imagery gives each industry its own visual identity while keeping the focus on products, environments and the exhibition experience.</p>
    </div>
    <div className="moodGrid">
      {tiles.map((tile,i)=><figure className={tile.className} key={`${tile.label}-${i}`}>
        <Image fill src={tile.image} alt={tile.label}/><div className="moodShade"/><figcaption><span>{String(i+1).padStart(2,"0")}</span>{tile.label}</figcaption>
      </figure>)}
    </div>
  </section>
}
