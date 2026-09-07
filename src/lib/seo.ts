export const SITE_URL = "https://iraqhomeexpo.com";

export const organizationJsonLd = {
  "@context":"https://schema.org",
  "@type":"Organization",
  "@id":`${SITE_URL}/#organization`,
  name:"Iraq Home Expo",
  url:SITE_URL,
  logo:`${SITE_URL}/icon.jpg`,
  email:"info@iraqhomeexpo.com",
  telephone:"+9647824455860",
  sameAs:[
    "https://www.facebook.com/profile.php?id=61591852047921",
    "https://www.instagram.com/iraqhomeexpo/"
  ]
};

export const websiteJsonLd = {
  "@context":"https://schema.org",
  "@type":"WebSite",
  "@id":`${SITE_URL}/#website`,
  name:"Iraq Home Expo 2027",
  alternateName:"Iraq Home Expo",
  url:SITE_URL,
  publisher:{"@id":`${SITE_URL}/#organization`}
};

export const eventJsonLd = {
  "@context":"https://schema.org",
  "@type":"ExhibitionEvent",
  "@id":`${SITE_URL}/#event`,
  name:"Iraq Home Expo 2027",
  alternateName:["Iraq Home Expo","Iraq International Home Expo","Iraq Furniture & Interiors Expo"],
  description:"International exhibition for furniture, interiors, home products and residential solutions, 12–15 May 2027 at Baghdad International Fair in Baghdad, Iraq.",
  url:SITE_URL,
  startDate:"2027-05-12T11:00:00+03:00",
  endDate:"2027-05-15T18:00:00+03:00",
  eventStatus:"https://schema.org/EventScheduled",
  eventAttendanceMode:"https://schema.org/OfflineEventAttendanceMode",
  image:[`${SITE_URL}/assets/hero-interior.webp`],
  location:{
    "@type":"Place",
    name:"Baghdad International Fair",
    address:{"@type":"PostalAddress","addressLocality":"Baghdad","addressCountry":"IQ"}
  },
  organizer:{"@id":`${SITE_URL}/#organization`}
};

export function breadcrumbJsonLd(items:{name:string;path:string}[]){
  return {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    itemListElement:items.map((item,index)=>({
      "@type":"ListItem",
      position:index+1,
      name:item.name,
      item:`${SITE_URL}${item.path}`
    }))
  };
}
