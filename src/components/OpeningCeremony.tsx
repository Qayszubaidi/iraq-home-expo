import Image from "next/image";
import Link from "next/link";

export default function OpeningCeremony({compact=false}:{compact?:boolean}){
  return <section className={`openingCeremony ${compact?"compact":""}`}>
    <div className="openingCeremonyMedia">
      <Image src="/assets/baghdad-fair-night.jpeg" fill alt="Baghdad International Fair illuminated at night" sizes="(max-width: 900px) 100vw, 46vw" />
      <span>Baghdad International Fair</span>
    </div>
    <div className="openingCeremonyCopy">
      <span className="eyebrow dark">Opening Ceremony</span>
      <h2>A distinguished opening in Baghdad.</h2>
      <p>The opening ceremony will welcome distinguished government representatives, leading Iraqi businesspeople, and prominent VIP guests.</p>
      <Link className="textLink" href="/visit">Plan your visit <span>→</span></Link>
    </div>
  </section>
}
