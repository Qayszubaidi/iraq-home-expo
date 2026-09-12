import Link from "next/link";
import { sectors } from "@/data/site";

export default function SectorTicker(){
  const loop=[...sectors,...sectors];
  return <section className="sectorTicker" aria-label="Exhibition sectors">
    <div className="tickerTrack">
      {loop.map((sector,index)=>index<sectors.length
        ? <Link key={`primary-${sector.slug}`} href={`/sectors/${sector.slug}`}><span>{sector.title}</span><i aria-hidden="true">✦</i></Link>
        : <span key={`duplicate-${sector.slug}`} className="tickerClone" aria-hidden="true"><span>{sector.title}</span><i>✦</i></span>
      )}
    </div>
  </section>
}
