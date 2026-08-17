import Image from "next/image";

export default function SectorMoodboard({title,image}:{title:string;image:string}){
  const tiles=[
    {image,label:`${title} focus`,className:"moodMain"},
    {image:"/assets/hero-interior.webp",label:"Interior context",className:"moodSide"},
    {image:"/assets/expo-event.webp",label:"Exhibition experience",className:"moodSide"},
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
