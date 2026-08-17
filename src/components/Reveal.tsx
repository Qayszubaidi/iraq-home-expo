"use client";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
export default function Reveal({children,className=""}:PropsWithChildren<{className?:string}>){const ref=useRef<HTMLDivElement>(null);const [on,setOn]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);io.disconnect()}},{threshold:.15});io.observe(el);return()=>io.disconnect()},[]);return <div ref={ref} className={`reveal ${on?"in":""} ${className}`}>{children}</div>}
