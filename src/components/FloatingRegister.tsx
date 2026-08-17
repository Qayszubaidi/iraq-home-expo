"use client";
import Link from "next/link";
import { useState } from "react";

export default function FloatingRegister(){
  const [open,setOpen]=useState(false);
  return <div className={`floatingDock ${open?"open":""}`}>
    <div className="floatingPanel" aria-hidden={!open}>
      <div className="floatingPanelHead"><span>Join Iraq Home Expo</span><button onClick={()=>setOpen(false)} aria-label="Close registration menu">×</button></div>
      <p>Choose how you want to participate.</p>
      <Link onClick={()=>setOpen(false)} href="/register#visitor"><small>Professional visitors</small><strong>Register to Visit</strong><span>↗</span></Link>
      <Link onClick={()=>setOpen(false)} href="/register#exhibitor"><small>Manufacturers & brands</small><strong>Exhibitor Registration</strong><span>↗</span></Link>
    </div>
    <button className="floatingRegister" aria-expanded={open} onClick={()=>setOpen(!open)}><span className="pulseDot"/>Register<span>{open?"×":"↗"}</span></button>
  </div>
}
