import Link from "next/link";

export default function SeoBreadcrumbs({items}:{items:{label:string;href?:string}[]}){
  return <nav className="seoBreadcrumbs" aria-label="Breadcrumb">
    {items.map((item,index)=><span className="seoBreadcrumbItem" key={`${item.label}-${index}`}>
      {index>0&&<span className="seoBreadcrumbSep" aria-hidden="true">›</span>}
      {item.href?<Link href={item.href}>{item.label}</Link>:<strong>{item.label}</strong>}
    </span>)}
  </nav>
}
