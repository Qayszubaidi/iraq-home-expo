import Image from "next/image";
import Link from "next/link";

export default function VisualBand({image="/assets/expo-event.webp",eyebrow,title,copy,href,label}:{image?:string;eyebrow:string;title:string;copy:string;href?:string;label?:string}){return <section className="visualBand"><Image src={image} fill alt=""/><div className="visualBandShade"/><div className="visualBandContent"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{copy}</p>{href&&label&&<Link className="button ghost" href={href}>{label}<span>↗</span></Link>}</div></section>}
