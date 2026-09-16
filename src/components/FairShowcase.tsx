import Image from "next/image";
import Link from "next/link";
import { event } from "@/data/site";

export default function FairShowcase({compact=false}:{compact?:boolean}){
  const displayDates=event.dates.replace("–"," to ");
  return <section className={`fairShowcase ${compact?"compact":""}`}>
    <div className="fairCopy">
      <span className="eyebrow dark">The Venue</span>
      <h2>Baghdad International Fair.</h2>
      <p>Iraq Home Expo 2027 takes place at Baghdad International Fair, bringing the home industry together in the heart of Baghdad.</p>
      <div className="fairMeta"><div><small>Date</small><strong>{displayDates}</strong></div><div><small>Location</small><strong>{event.city}</strong></div></div>
      <Link className="button gold" href="/visit">Plan Your Visit <span>→</span></Link>
    </div>
    <div className="fairImages">
      <figure className="fairDay"><Image src="/assets/baghdad-fair-day.jpeg" fill alt="Baghdad International Fair entrance" sizes="(max-width: 900px) 100vw, 50vw"/></figure>
      <figure className="fairNight"><Image src="/assets/baghdad-fair-night.jpeg" fill alt="Baghdad International Fair at night" sizes="(max-width: 900px) 100vw, 50vw"/></figure>
    </div>
  </section>
}
