import Image from "next/image";
import {sectors} from "@/data/site";

const freshStock:Record<string,{src:string;alt:string}>={
  interiors:{src:"https://images.unsplash.com/photo-1771888703723-01d85da1dae1?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",alt:"Modern living room interior"},
  "furniture-home-furnishings":{src:"https://images.unsplash.com/photo-1771888703723-01d85da1dae1?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",alt:"Modern furniture and living room"},
  kitchen:{src:"https://images.unsplash.com/photo-1779314687592-7d64bea77e8a?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",alt:"Modern white kitchen interior"},
  "bathroom-cleaning":{src:"https://images.pexels.com/photos/10919434/pexels-photo-10919434.jpeg?auto=compress&dpr=1&h=1000&w=1600",alt:"Modern bathroom interior"},
  "digital-safety-security":{src:"https://images.unsplash.com/photo-1774876549476-254b00a5d648?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",alt:"Smart home thermostat"},
  "hvac-r":{src:"https://images.unsplash.com/photo-1774876549476-254b00a5d648?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",alt:"Climate control technology"}
};

export default function SectorGallery({slug,title}:{slug:string,title:string}){
  const current=sectors.find(s=>s.slug===slug)!;
  const index=sectors.findIndex(s=>s.slug===slug);
  const others=sectors.filter(s=>s.slug!==slug);
  const picks=[current,...others.slice(Math.max(0,index-1),Math.max(0,index-1)+3)].slice(0,4);
  const stock=freshStock[slug];
  return <section className="sectorGallery"><div className="sectorGalleryHead"><div><span className="eyebrow dark">Sector Gallery</span><h2>See the products, spaces and solutions behind {title}.</h2></div><p>Visual references help visitors and exhibitors understand the breadth of products represented across this sector. Additional event and exhibitor photography can be added as it becomes available.</p></div><div className="sectorGalleryGrid">{picks.map((item,i)=><figure key={`${item.slug}-${i}`} className={`sectorGalleryItem g${i+1}`}>{i===1&&stock?<img src={stock.src} alt={stock.alt} loading="lazy"/>:<Image src={item.image} fill alt={`${title} visual reference`} sizes="(max-width: 760px) 100vw, 50vw"/>}<figcaption><span>{String(i+1).padStart(2,"0")}</span><strong>{i===0?title:i===1&&stock?stock.alt:item.title}</strong></figcaption></figure>)}</div></section>
}
