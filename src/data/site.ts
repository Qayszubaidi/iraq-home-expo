export const media = {
  organizerYoutube: "https://youtube.com/@successstepsco9702?si=BoYnb_s4IRmcqGvd",
  heroImages: {
    networking: "/assets/industry-professionals.webp",
    expoHall: "/assets/baghdad-fair-night.jpeg",
    tradeShow: "/assets/expo-event.webp",
  },
};

export const event = {
  name: "Iraq Home Expo 2027",
  dates: "12–15 May 2027",
  venue: "Baghdad International Fair",
  city: "Baghdad, Iraq",
  hours: "11:00 AM – 6:00 PM",
};

export const nav = [
  ["About", "/about"],
  ["Why Iraq", "/why-iraq"],
  ["Sectors", "/sectors"],
  ["Visit", "/visit"],
  ["Exhibit", "/exhibit"],
  ["Sponsor", "/sponsor"],
  ["Contact", "/contact"],
] as const;

export type Sector = {
  slug: string; title: string; short: string; image: string; categories: string[];
};

export const sectors: Sector[] = [
  { slug:"interiors", title:"Interiors", short:"Materials, finishes and technologies shaping modern residential environments.", image:"/assets/interiors.webp", categories:["Flooring and Surfaces","Painting and Coating","Hardware and Fittings","Home Automation","Lighting Fixtures","Linens and Textiles","Metalware","Room Dividers and Screens","Smart Home Devices","Soft Furnishings","Storage Solutions","Wall Coverings","Window Treatments"] },
  { slug:"furniture-home-furnishings", title:"Furniture & Home Furnishings", short:"Furniture and furnishing solutions for living, dining, sleeping, office and outdoor spaces.", image:"/assets/furniture.webp", categories:["Bathroom Furniture","Bedding","Bedroom Furniture and Accessories","Baby and Children Furniture","Dining Rooms","Divans","Function Sofas","Kitchen Furniture","Living Room and System Furniture","Mattresses","Occasional Furniture","Office Furniture","Outdoor Furniture","Storage Furniture","Tables, Chairs and Stools","Young People's Furniture"] },
  { slug:"home-textiles", title:"Home Textiles", short:"Textiles, carpets, curtains, bedding and decorative fabrics for contemporary homes.", image:"/assets/home-textiles.webp", categories:["Bed Linen and Bathroom Textiles","Blankets","Carpets and Rugs","Coated Tablecloths","Curtains","Decorative and Furniture Fabrics","Doormats and Clean-Off Systems","Drapery and Curtain Hardware","Duvets and Pillows","Furniture Leather","Handicrafts","Machine and Hand-Woven Carpets","Mattresses","Outdoor Fabrics","Sun Protection Systems","Table and Kitchen Linen"] },
  { slug:"kitchen", title:"Kitchen", short:"Appliances, equipment, cookware, refrigeration and food-preparation solutions.", image:"/assets/kitchen.webp", categories:["Cooking Appliances","Cookware and Utensils","Dishwashing Equipment","Food Holding and Warming Equipment","Food Preparation Equipment","Food Storage Equipment","Glassware","Guest Amenities","Houseware","Kitchen Appliances","Kitchen Equipment","Refrigeration Equipment","Small Appliances","Tableware and Serveware"] },
  { slug:"bathroom-cleaning", title:"Bathroom & Cleaning", short:"Bathroom products, surfaces, laundry and residential and professional cleaning solutions.", image:"/assets/hero-interior.webp", categories:["Ceramics, Marble and Porcelain","Bathroom Accessories","Bathroom and Restroom Equipment","Bathroom Furniture","Cleaning Appliances","Cleaning Chemicals","Cleaning Tools and Equipment","Dispensers and Accessories","Floor Mats and Entrance Mats","Laundry Appliances","Laundry Supplies","Personal Protective Equipment","Restroom Supplies","Small Appliances","Specialized Cleaning Equipment"] },
  { slug:"home-lighting-electrical", title:"Home Lighting & Electrical", short:"Power, lighting, distribution, cabling, monitoring and electrical infrastructure.", image:"/assets/lighting-electrical.webp", categories:["Battery Banks","Electrical Cables and Wiring","Electrical Distribution Equipment","Electrical Switchgear","Emergency Generators","Power Conditioning Equipment","Power Distribution Units (UPS)","Power Monitoring and Metering Devices","Transformers","UPS Systems","Voltage and Current Regulators"] },
  { slug:"hvac-r", title:"HVAC + R", short:"Heating, ventilation, air conditioning, refrigeration, filtration and controls.", image:"/assets/hvac.webp", categories:["Air Filtration and Purification Equipment","Climate Control Appliances","Cooling Equipment","Ductwork and Distribution Components","Heating and Heat Recovery Equipment","Humidification and Dehumidification Equipment","HVAC Controls and Automation Systems","Maintenance and Testing Equipment","Refrigeration Equipment","Thermostats and Temperature Controls","Ventilation Equipment"] },
  { slug:"digital-safety-security", title:"Digital Systems, Safety & Security", short:"Connected systems, access control, fire safety, surveillance and smart technologies.", image:"/assets/digital-security.webp", categories:["Channel Management Systems","Energy Management Systems","Wi-Fi and Internet Access","In-Room Technology","Mobile Key Technology","Online Booking Engine","Point of Sale (POS) Systems","Access Control Systems","Emergency Systems and Equipment","Fire Safety Equipment","Identification and Access Management","Perimeter Security Measures","Safety and First Aid Supplies","Security and Surveillance Systems","Vehicle Safety and Parking Security","Warning Systems and Rescue Equipment"] },
];

export const marketStats = [
  ["US$6.81B", "Home Appliances", "Projected market revenue in Iraq in 2027"],
  ["US$42.34M", "Kitchenware", "Projected market revenue in Iraq in 2027"],
  ["US$102.20M", "Carpets & Rugs", "Projected market revenue in Iraq for 2026"],
  ["US$99.67M", "Furniture", "Projected market revenue in Iraq for 2026"],
  ["13.99%", "Smart Homes", "Stated CAGR for 2024–2028"],
  ["5.92%", "Small Appliances", "Market growth indicator in approved exhibition content"],
] as const;
