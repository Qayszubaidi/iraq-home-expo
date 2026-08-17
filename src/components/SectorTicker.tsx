import Link from "next/link";
import { sectors } from "@/data/site";

export default function SectorTicker(){
  const loop=[...sectors,...sectors];
  return <section className="sectorTicker" aria-label="Exhibition sectors">
    <div className="tickerTrack">
      {loop.map((sector,index)=><Link key={`${sector.slug}-${index}`} href={`/sectors/${sector.slug}`} aria-hidden={index>=sectors.length}>
        <span>{sector.title}</span><i>✦</i>
      </Link>)}
    </div>
  </section>
}
