import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const esc=(v:unknown)=>String(v??"").replace(/[<>&]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;"}[c]!));
const label=(k:string)=>k.replace(/([A-Z])/g," $1").replace(/^./,c=>c.toUpperCase());

export async function POST(req:NextRequest){
  try{
    const body=await req.json();
    if(body.website) return NextResponse.json({ok:true});
    const type=body.type as "visitor"|"exhibitor"|"contact";
    if(!["visitor","exhibitor","contact"].includes(type)) return NextResponse.json({error:"Invalid form"},{status:400});
    const email=String(body.email||"").trim();
    if(!email || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({error:"Valid email required"},{status:400});
    if(type==="visitor" && (!body.fullName || !body.phone)) return NextResponse.json({error:"Required fields missing"},{status:400});
    if(type==="exhibitor" && (!body.companyName || !body.contactPerson || !body.phone)) return NextResponse.json({error:"Required fields missing"},{status:400});
    if(type==="contact" && (!body.fullName || !body.message)) return NextResponse.json({error:"Required fields missing"},{status:400});

    const host=process.env.SMTP_HOST;
    const user=process.env.SMTP_USER;
    const pass=process.env.SMTP_PASS;
    if(!host || !user || !pass) return NextResponse.json({error:"Mail service is not configured"},{status:503});

    const transporter=nodemailer.createTransport({
      host,
      port:Number(process.env.SMTP_PORT||587),
      secure:process.env.SMTP_SECURE==="true",
      auth:{user,pass},
    });
    const to=type==="exhibitor"?(process.env.SALES_TO||"sales@iraqhomeexpo.com"):(process.env.CONTACT_TO||"info@iraqhomeexpo.com");
    const title=type==="visitor"?"New Visitor Registration — Iraq Home Expo 2027":type==="exhibitor"?"New Exhibitor Registration — Iraq Home Expo 2027":`New Contact Enquiry — Iraq Home Expo 2027${body.subject?` — ${esc(body.subject)}`:""}`;
    const entries=Object.entries(body).filter(([k])=>!["type","website"].includes(k));
    const rows=entries.map(([k,v])=>`<tr><td style="padding:10px;border-bottom:1px solid #e7e1d7;width:34%"><strong>${esc(label(k))}</strong></td><td style="padding:10px;border-bottom:1px solid #e7e1d7">${esc(Array.isArray(v)?v.join(", "):v)}</td></tr>`).join("");
    await transporter.sendMail({
      from:process.env.SMTP_FROM||"Iraq Home Expo <website@iraqhomeexpo.com>",
      to,
      replyTo:email,
      subject:title,
      html:`<div style="font-family:Arial,sans-serif;color:#231f20;max-width:760px"><div style="background:#005251;color:#fff;padding:24px"><h2 style="margin:0">${esc(title)}</h2></div><table style="border-collapse:collapse;width:100%;background:#fff">${rows}</table><p style="font-size:12px;color:#777">Submitted via iraqhomeexpo.com</p></div>`
    });
    return NextResponse.json({ok:true});
  }catch(e){console.error(e);return NextResponse.json({error:"Send failed"},{status:500})}
}
