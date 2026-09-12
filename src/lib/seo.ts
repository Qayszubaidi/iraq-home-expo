export const SITE_URL = "https://iraqhomeexpo.com";
export const SITE_NAME = "Iraq Home Expo";

export const iraqEntity = {
  "@type":"Country",
  "@id":"https://www.wikidata.org/entity/Q796",
  name:"Iraq"
};

export const fairVenueJsonLd = {
  "@type":"Place",
  "@id":`${SITE_URL}/#baghdad-international-fair`,
  name:"Baghdad International Fair",
  alternateName:"Baghdad International Fairground",
  address:{
    "@type":"PostalAddress",
    addressLocality:"Baghdad",
    addressCountry:"IQ"
  }
};

export const organizationJsonLd = {
  "@context":"https://schema.org",
  "@type":"Organization",
  "@id":`${SITE_URL}/#organization`,
  name:"Iraq Home Expo",
  url:SITE_URL,
  logo:{
    "@type":"ImageObject",
    url:`${SITE_URL}/assets/iraq-home-expo-logo.png`,
    caption:"Iraq Home Expo logo"
  },
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
  name:SITE_NAME,
  alternateName:["Iraq Home Expo 2027","Iraq Expo","iraqhomeexpo.com"],
  url:SITE_URL,
  publisher:{"@id":`${SITE_URL}/#organization`},
  inLanguage:"en"
};

export const eventJsonLd = {
  "@context":"https://schema.org",
  "@type":"ExhibitionEvent",
  "@id":`${SITE_URL}/#event`,
  name:"Iraq Home Expo 2027",
  alternateName:["Iraq Home Expo","Iraq Furniture & Interiors Expo"],
  description:"International exhibition for furniture, interiors, home products and residential solutions, 12–15 May 2027 at Baghdad International Fair in Baghdad, Iraq.",
  url:SITE_URL,
  startDate:"2027-05-12T11:00:00+03:00",
  endDate:"2027-05-15T18:00:00+03:00",
  eventStatus:"https://schema.org/EventScheduled",
  eventAttendanceMode:"https://schema.org/OfflineEventAttendanceMode",
  image:[
    {"@type":"ImageObject",url:`${SITE_URL}/assets/hero-interior.webp`,caption:"Iraq Home Expo 2027 furniture and interiors exhibition"}
  ],
  location:{"@id":`${SITE_URL}/#baghdad-international-fair`},
  organizer:{"@id":`${SITE_URL}/#organization`},
  about:[
    {"@type":"Thing",name:"Furniture exhibition in Iraq"},
    {"@type":"Thing",name:"Interiors exhibition in Iraq"},
    {"@type":"Thing",name:"Home products exhibition in Iraq"},
    {"@type":"Thing",name:"Iraq business and trade opportunities"}
  ]
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

type PageSchemaOptions = {
  path:string;
  name:string;
  description:string;
  type?:"WebPage"|"AboutPage"|"ContactPage"|"CollectionPage"|"ProfilePage";
  image?:string;
  keywords?:string[];
  about?:Array<Record<string,unknown>>;
  mentions?:Array<Record<string,unknown>>;
};

export function pageJsonLd({
  path,name,description,type="WebPage",image,keywords=[],about=[],mentions=[]
}:PageSchemaOptions){
  const url=`${SITE_URL}${path}`;
  return {
    "@context":"https://schema.org",
    "@type":type,
    "@id":`${url}#webpage`,
    url,
    name,
    description,
    isPartOf:{"@id":`${SITE_URL}/#website`},
    primaryImageOfPage:image?{
      "@type":"ImageObject",
      url:image.startsWith("http")?image:`${SITE_URL}${image}`,
      caption:name
    }:undefined,
    about:[
      {"@id":`${SITE_URL}/#event`},
      {"@type":"Thing",name:"Iraq exhibitions"},
      {"@type":"Thing",name:"International exhibitions in Iraq"},
      ...about
    ],
    mentions:[
      iraqEntity,
      {"@id":`${SITE_URL}/#baghdad-international-fair`},
      ...mentions
    ],
    keywords:[
      "Iraq Home Expo",
      "Iraq Expo",
      "Iraq International Expo",
      "Iraq International Fair",
      "Baghdad International Fair",
      ...keywords
    ].join(", "),
    inLanguage:"en",
    publisher:{"@id":`${SITE_URL}/#organization`}
  };
}

export function sectorPageJsonLd({slug,title,description,image,categories}:{slug:string;title:string;description:string;image:string;categories:string[]}){
  return {
    ...pageJsonLd({
      path:`/sectors/${slug}`,
      name:`${title} Exhibition in Iraq | Iraq Home Expo 2027`,
      description,
      image,
      keywords:[`${title} exhibition Iraq`,`${title} Baghdad`,`Iraq business`],
      about:[{"@type":"Thing",name:title}]
    }),
    mainEntity:{
      "@type":"ItemList",
      name:`${title} product categories`,
      itemListElement:categories.map((name,index)=>({"@type":"ListItem",position:index+1,name}))
    }
  };
}

export function sectorsCollectionJsonLd(sectors:{slug:string;title:string;short:string;image:string}[]){
  return {
    ...pageJsonLd({
      path:"/sectors",
      type:"CollectionPage",
      name:"Iraq Home Expo 2027 Exhibition Sectors",
      description:"Furniture, interiors, home textiles, kitchen, bathroom, lighting, HVAC and digital safety exhibition sectors in Baghdad, Iraq.",
      image:"/assets/hero-sectors-home.webp",
      keywords:["Iraq furniture exhibition","Iraq interiors exhibition","home products exhibition Iraq"]
    }),
    mainEntity:{
      "@type":"ItemList",
      name:"Iraq Home Expo exhibition sectors",
      itemListElement:sectors.map((sector,index)=>({
        "@type":"ListItem",
        position:index+1,
        url:`${SITE_URL}/sectors/${sector.slug}`,
        name:sector.title,
        description:sector.short,
        image:sector.image.startsWith("http")?sector.image:`${SITE_URL}${sector.image}`
      }))
    }
  };
}
