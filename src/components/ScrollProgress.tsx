"use client";
import {useEffect,useState} from "react";
export default function ScrollProgress(){const [p,setP]=useState(0);useEffect(()=>{const on=()=>{const max=document.documentElement.scrollHeight-innerHeight;setP(max>0?scrollY/max:0)};on();addEventListener("scroll",on,{passive:true});addEventListener("resize",on);return()=>{removeEventListener("scroll",on);removeEventListener("resize",on)}},[]);return <div className="scrollProgress" style={{transform:`scaleX(${p})`}}/>}
