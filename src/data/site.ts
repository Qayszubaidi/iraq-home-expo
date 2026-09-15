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

// categories stays string[] on purpose: it's edited directly by the admin CMS
// (one category per line) and consumed by sectorPageJsonLd's ItemList schema,
// both of which expect plain strings. Per-category copy lives in
// `categoryDescriptions` below and is looked up by name, so CMS edits to the
// category list keep working — an added/renamed category just falls back to
// no description instead of breaking.
export type Sector = {
  slug: string;
  title: string;
  short: string;
  intro: string[];
  image: string;
  heroImage?: string;
  categories: string[];
};

export const sectors: Sector[] = [
  {
    slug: "interiors",
    title: "Interiors",
    short: "Materials, finishes and technologies shaping modern residential environments.",
    intro: [
      "Interiors is where Iraq Home Expo's finishing and fit-out suppliers meet the architects, contractors and developers shaping Baghdad's new residential complexes. As Iraq's construction pipeline moves from structural work into finishing, demand is rising fast for flooring, wall treatments, lighting and automation systems that match international quality standards.",
      "This sector brings together manufacturers and distributors of surfaces, fittings, textiles and smart-home technology, connecting them with the specifiers and buyers who select products for apartment towers, private villas, hotels and mixed-use developments across Iraq.",
    ],
    image: "/assets/sector-card-interiors.webp",
    heroImage: "/assets/sector-interiors-hero.webp",
    categories: ["Flooring and Surfaces","Painting and Coating","Hardware and Fittings","Home Automation","Lighting Fixtures","Linens and Textiles","Metalware","Room Dividers and Screens","Smart Home Devices","Soft Furnishings","Storage Solutions","Wall Coverings","Window Treatments"],
  },
  {
    slug: "furniture-home-furnishings",
    title: "Furniture & Home Furnishings",
    short: "Furniture and furnishing solutions for living, dining, sleeping, office and outdoor spaces.",
    intro: [
      "Furniture & Home Furnishings is the largest sector at Iraq Home Expo, reflecting the scale of Iraq's residential furnishing demand as new housing developments and renovated apartments reach the market. From bedroom and living-room ranges to outdoor and contract furniture, this sector connects manufacturers with the retailers, hospitality buyers and interior specifiers furnishing Iraq's homes.",
      "Iraq's furniture market is projected to be worth close to US$100 million in 2026, with living-room furniture the largest single segment — a clear signal of where buyer demand is concentrated for exhibitors entering the market.",
    ],
    image: "/assets/sector-card-furniture.webp",
    categories: ["Bathroom Furniture","Bedding","Bedroom Furniture and Accessories","Baby and Children Furniture","Dining Rooms","Divans","Function Sofas","Kitchen Furniture","Living Room and System Furniture","Mattresses","Occasional Furniture","Office Furniture","Outdoor Furniture","Storage Furniture","Tables, Chairs and Stools","Young People's Furniture"],
  },
  {
    slug: "home-textiles",
    title: "Home Textiles",
    short: "Textiles, carpets, curtains, bedding and decorative fabrics for contemporary homes.",
    intro: [
      "Home Textiles brings together carpet, curtain, bedding and decorative-fabric suppliers with the buyers furnishing Iraq's growing residential and hospitality market. Machine- and hand-woven carpets remain culturally significant in Iraqi homes, while modern curtain systems, bed linen and outdoor fabrics are in growing demand as households move toward international interior standards.",
      "This sector is a route into a carpets and rugs market forecast to generate more than US$100 million in revenue in Iraq in 2026 alone, alongside steady demand across bedding, drapery and decorative textile categories.",
    ],
    image: "/assets/sector-card-textiles.webp",
    categories: ["Bed Linen and Bathroom Textiles","Blankets","Carpets and Rugs","Coated Tablecloths","Curtains","Decorative and Furniture Fabrics","Doormats and Clean-Off Systems","Drapery and Curtain Hardware","Duvets and Pillows","Furniture Leather","Handicrafts","Machine and Hand-Woven Carpets","Mattresses","Outdoor Fabrics","Sun Protection Systems","Table and Kitchen Linen"],
  },
  {
    slug: "kitchen",
    title: "Kitchen",
    short: "Appliances, equipment, cookware, refrigeration and food-preparation solutions.",
    intro: [
      "Kitchen brings cooking appliances, cookware, refrigeration and food-preparation equipment together with the retailers, distributors and hospitality buyers driving one of Iraq's fastest-growing home categories. Iraq's kitchenware market alone is projected to reach around US$42 million in revenue in 2027, and the wider home-appliance market is forecast at close to US$6.8 billion in the same year.",
      "Suppliers use this sector to reach both residential retail buyers and the HoReCa channel, from independent kitchen showrooms to hotel and restaurant procurement teams sourcing equipment for new openings across Iraq.",
    ],
    image: "/assets/sector-card-kitchen.webp",
    categories: ["Cooking Appliances","Cookware and Utensils","Dishwashing Equipment","Food Holding and Warming Equipment","Food Preparation Equipment","Food Storage Equipment","Glassware","Guest Amenities","Houseware","Kitchen Appliances","Kitchen Equipment","Refrigeration Equipment","Small Appliances","Tableware and Serveware"],
  },
  {
    slug: "bathroom-cleaning",
    title: "Bathroom & Cleaning",
    short: "Bathroom products, surfaces, laundry and residential and professional cleaning solutions.",
    intro: [
      "Bathroom & Cleaning covers everything from ceramics and sanitaryware to laundry appliances and professional cleaning equipment, serving both residential renovation projects and Iraq's expanding hospitality sector.",
      "As new apartment blocks and hotels move toward completion across Baghdad and other Iraqi cities, bathroom fit-out and cleaning-equipment suppliers are seeing consistent demand from contractors, facilities managers and retail buyers alike.",
    ],
    image: "/assets/sector-card-bathroom.webp",
    heroImage: "/assets/sector-bathroom-cleaning-hero.webp",
    categories: ["Ceramics, Marble and Porcelain","Bathroom Accessories","Bathroom and Restroom Equipment","Bathroom Furniture","Cleaning Appliances","Cleaning Chemicals","Cleaning Tools and Equipment","Dispensers and Accessories","Floor Mats and Entrance Mats","Laundry Appliances","Laundry Supplies","Personal Protective Equipment","Restroom Supplies","Small Appliances","Specialized Cleaning Equipment"],
  },
  {
    slug: "home-lighting-electrical",
    title: "Home Lighting & Electrical",
    short: "Power, lighting, distribution, cabling, monitoring and electrical infrastructure.",
    intro: [
      "Home Lighting & Electrical connects suppliers of cabling, power distribution, backup power and electrical infrastructure with the contractors and developers building out Iraq's residential and commercial projects.",
      "Reliable power supply remains a priority for Iraqi households and businesses, driving strong demand for generators, UPS systems, voltage regulators and distribution equipment alongside standard residential electrical products.",
    ],
    image: "/assets/sector-card-lighting.webp",
    categories: ["Battery Banks","Electrical Cables and Wiring","Electrical Distribution Equipment","Electrical Switchgear","Emergency Generators","Power Conditioning Equipment","Power Distribution Units (UPS)","Power Monitoring and Metering Devices","Transformers","UPS Systems","Voltage and Current Regulators"],
  },
  {
    slug: "hvac-r",
    title: "HVAC + R",
    short: "Heating, ventilation, air conditioning, refrigeration, filtration and controls.",
    intro: [
      "HVAC + R covers heating, ventilation, air conditioning and refrigeration — categories with year-round relevance in Iraq's climate. Cooling equipment in particular is a high-demand category across Iraqi households, offices and hospitality venues.",
      "This sector connects manufacturers and distributors with the contractors and procurement teams specifying climate-control systems for new and renovated buildings across the country.",
    ],
    image: "/assets/sector-card-hvac.webp",
    heroImage: "/assets/sector-hvac-r-hero.webp",
    categories: ["Air Filtration and Purification Equipment","Climate Control Appliances","Cooling Equipment","Ductwork and Distribution Components","Heating and Heat Recovery Equipment","Humidification and Dehumidification Equipment","HVAC Controls and Automation Systems","Maintenance and Testing Equipment","Refrigeration Equipment","Thermostats and Temperature Controls","Ventilation Equipment"],
  },
  {
    slug: "digital-safety-security",
    title: "Digital Systems, Safety & Security",
    short: "Connected systems, access control, fire safety, surveillance and smart technologies.",
    intro: [
      "Digital Systems, Safety & Security brings together access control, surveillance, fire safety and connected-building technology — a category with growing importance as Iraq's residential and hospitality developments adopt international safety and smart-building standards.",
      "This sector connects security-technology suppliers with developers, facilities managers and hospitality operators sourcing systems for new construction and renovation projects across Iraq.",
    ],
    image: "/assets/sector-card-digital.webp",
    categories: ["Channel Management Systems","Energy Management Systems","Wi-Fi and Internet Access","In-Room Technology","Mobile Key Technology","Online Booking Engine","Point of Sale (POS) Systems","Access Control Systems","Emergency Systems and Equipment","Fire Safety Equipment","Identification and Access Management","Perimeter Security Measures","Safety and First Aid Supplies","Security and Surveillance Systems","Vehicle Safety and Parking Security","Warning Systems and Rescue Equipment"],
  },
];

// One-line description per category, looked up by exact name from `sectors[].categories`.
// Kept separate from the Sector type (rather than turning categories into objects)
// so the admin CMS's plain "one category per line" editor keeps working unmodified;
// a category added or renamed in the CMS simply renders without a description.
export const categoryDescriptions: Record<string, string> = {
  "Flooring and Surfaces": "Tiles, marble, laminate, vinyl and engineered flooring for residential and commercial interiors.",
  "Painting and Coating": "Interior and exterior paints, protective coatings and decorative finishing systems.",
  "Hardware and Fittings": "Door and window hardware, hinges, handles and fixing systems for interior fit-out.",
  "Home Automation": "Connected lighting, climate and access systems for modern residential control.",
  "Lighting Fixtures": "Decorative, architectural and functional lighting for homes and hospitality interiors.",
  "Linens and Textiles": "Interior fabrics, upholstery textiles and soft-furnishing materials.",
  "Metalware": "Decorative and structural metal components for interior design applications.",
  "Room Dividers and Screens": "Partition systems and decorative screens for flexible interior layouts.",
  "Smart Home Devices": "IoT-enabled sensors, controls and devices for connected residential living.",
  "Soft Furnishings": "Cushions, throws, upholstery and decorative textile accessories.",
  "Storage Solutions": "Built-in and modular storage systems for residential and commercial interiors.",
  "Wall Coverings": "Wallpaper, panelling and decorative wall-finishing products.",
  "Window Treatments": "Blinds, shutters and drapery systems for residential and commercial windows.",

  "Bathroom Furniture": "Vanities, cabinetry and storage furniture for residential bathrooms.",
  "Bedding": "Duvets, pillows, mattress protectors and bedroom textile sets.",
  "Bedroom Furniture and Accessories": "Beds, wardrobes and bedroom furniture ranges for residential interiors.",
  "Baby and Children Furniture": "Cots, cribs and furniture designed for nurseries and children's rooms.",
  "Dining Rooms": "Dining tables, chairs and complete dining-room furniture sets.",
  "Divans": "Divan bases, sofa beds and multi-purpose seating furniture.",
  "Function Sofas": "Sofa beds, recliners and multi-function seating solutions.",
  "Kitchen Furniture": "Cabinetry, units and fitted furniture for residential kitchens.",
  "Living Room and System Furniture": "Sofas, modular seating and living-room system furniture.",
  "Occasional Furniture": "Side tables, accent chairs and complementary furniture pieces.",
  "Office Furniture": "Desks, seating and storage furniture for home and commercial offices.",
  "Outdoor Furniture": "Garden, balcony and terrace furniture built for outdoor use.",
  "Storage Furniture": "Wardrobes, cabinets and standalone storage furniture units.",
  "Tables, Chairs and Stools": "Dining, occasional and bar-height tables, chairs and stools.",
  "Young People's Furniture": "Furniture ranges designed for teenagers' and young adults' bedrooms.",
  "Mattresses": "Spring, foam and hybrid mattresses for residential and hospitality use.",

  "Bed Linen and Bathroom Textiles": "Sheets, towels and textile essentials for bedrooms and bathrooms.",
  "Blankets": "Woven and knitted blankets and throws for residential use.",
  "Carpets and Rugs": "Machine-made and handmade carpets and area rugs for homes.",
  "Coated Tablecloths": "Wipeable and coated tablecloths for kitchen and dining use.",
  "Curtains": "Ready-made and made-to-measure curtains for residential interiors.",
  "Decorative and Furniture Fabrics": "Upholstery and decorative fabrics for furniture and soft furnishings.",
  "Doormats and Clean-Off Systems": "Entrance matting and clean-off systems for homes and buildings.",
  "Drapery and Curtain Hardware": "Rods, tracks and fixings for curtain and drapery systems.",
  "Duvets and Pillows": "Filled bedding including duvets, pillows and cushion inserts.",
  "Furniture Leather": "Leather and leather-look upholstery materials for furniture manufacturing.",
  "Handicrafts": "Handmade textile and decorative craft products for the home.",
  "Machine and Hand-Woven Carpets": "Traditional and contemporary carpets produced by machine- and hand-weaving.",
  "Outdoor Fabrics": "Weather-resistant fabrics for outdoor furniture and shading.",
  "Sun Protection Systems": "Blinds, awnings and shading textiles for sun and heat control.",
  "Table and Kitchen Linen": "Tablecloths, napkins and kitchen textile products.",

  "Cooking Appliances": "Ovens, cooktops and cooking ranges for residential and commercial kitchens.",
  "Cookware and Utensils": "Pots, pans and hand tools for everyday food preparation.",
  "Dishwashing Equipment": "Domestic and commercial dishwashing machines and accessories.",
  "Food Holding and Warming Equipment": "Equipment for holding and serving food at safe temperatures.",
  "Food Preparation Equipment": "Mixers, processors and preparation tools for kitchens of all sizes.",
  "Food Storage Equipment": "Containers and storage systems for fresh and dry food.",
  "Glassware": "Drinkware and glass tableware for home and hospitality use.",
  "Guest Amenities": "In-room and guest-facing amenities for hotels and serviced apartments.",
  "Houseware": "General household items supporting everyday kitchen and home tasks.",
  "Kitchen Appliances": "Major and built-in appliances for fitted residential kitchens.",
  "Kitchen Equipment": "Commercial-grade equipment for professional and semi-professional kitchens.",
  "Refrigeration Equipment": "Refrigerators, freezers and cold-storage units for homes and businesses.",
  "Small Appliances": "Countertop appliances including blenders, kettles and coffee machines.",
  "Tableware and Serveware": "Plates, bowls and serving pieces for dining and hospitality.",

  "Ceramics, Marble and Porcelain": "Sanitaryware, tiles and stone surfaces for bathroom installations.",
  "Bathroom Accessories": "Fittings and accessories including taps, rails and fixtures.",
  "Bathroom and Restroom Equipment": "Fixtures and equipment for residential and public restrooms.",
  "Cleaning Appliances": "Vacuum cleaners and powered cleaning equipment for homes and buildings.",
  "Cleaning Chemicals": "Detergents and cleaning agents for residential and commercial use.",
  "Cleaning Tools and Equipment": "Mops, brushes and manual tools for everyday cleaning.",
  "Dispensers and Accessories": "Soap, sanitiser and paper dispensers for washrooms.",
  "Floor Mats and Entrance Mats": "Protective and entrance matting for homes and commercial buildings.",
  "Laundry Appliances": "Washing machines, dryers and laundry-care equipment.",
  "Laundry Supplies": "Detergents, fabric care and laundry-room consumables.",
  "Personal Protective Equipment": "Protective gear for cleaning and maintenance staff.",
  "Restroom Supplies": "Paper products and consumables for washroom facilities.",
  "Specialized Cleaning Equipment": "Industrial and specialist equipment for large-scale cleaning operations.",

  "Battery Banks": "Battery storage systems for backup and off-grid power.",
  "Electrical Cables and Wiring": "Cables and wiring products for residential and commercial installation.",
  "Electrical Distribution Equipment": "Panels and equipment for distributing electrical supply within buildings.",
  "Electrical Switchgear": "Switching and protection equipment for electrical systems.",
  "Emergency Generators": "Backup generators for homes, businesses and critical facilities.",
  "Power Conditioning Equipment": "Equipment that stabilises and protects electrical power supply.",
  "Power Distribution Units (UPS)": "Distribution units supporting uninterrupted power delivery.",
  "Power Monitoring and Metering Devices": "Devices for monitoring and metering electrical consumption.",
  "Transformers": "Transformers for voltage conversion in residential and commercial power.",
  "UPS Systems": "Uninterruptible power supply systems for continuous electrical backup.",
  "Voltage and Current Regulators": "Regulators that protect equipment from voltage and current fluctuation.",

  "Air Filtration and Purification Equipment": "Filtration and purification systems for improved indoor air quality.",
  "Climate Control Appliances": "Appliances that regulate indoor temperature and comfort.",
  "Cooling Equipment": "Air conditioning and cooling systems for homes and buildings.",
  "Ductwork and Distribution Components": "Ducting and components for distributing conditioned air.",
  "Heating and Heat Recovery Equipment": "Heating systems and heat-recovery technology for buildings.",
  "Humidification and Dehumidification Equipment": "Equipment for managing indoor humidity levels.",
  "HVAC Controls and Automation Systems": "Controls and automation for climate-system management.",
  "Maintenance and Testing Equipment": "Tools and equipment for HVAC servicing and diagnostics.",
  "Thermostats and Temperature Controls": "Devices for setting and controlling indoor temperature.",
  "Ventilation Equipment": "Fans and ventilation systems for indoor air circulation.",

  "Channel Management Systems": "Software systems for managing hospitality distribution channels.",
  "Energy Management Systems": "Systems for monitoring and optimising building energy use.",
  "Wi-Fi and Internet Access": "Connectivity infrastructure for residential and hospitality buildings.",
  "In-Room Technology": "Connected technology for hotel and serviced-apartment rooms.",
  "Mobile Key Technology": "Smartphone-based access and mobile key systems.",
  "Online Booking Engine": "Booking and reservation technology for hospitality operators.",
  "Point of Sale (POS) Systems": "Payment and transaction systems for retail and hospitality.",
  "Access Control Systems": "Systems controlling entry to buildings and secured areas.",
  "Emergency Systems and Equipment": "Equipment for managing building emergencies and evacuation.",
  "Fire Safety Equipment": "Detection, suppression and fire-safety equipment for buildings.",
  "Identification and Access Management": "Systems for identity verification and access permissions.",
  "Perimeter Security Measures": "Fencing, barriers and perimeter-protection systems.",
  "Safety and First Aid Supplies": "First-aid and general safety supplies for buildings.",
  "Security and Surveillance Systems": "Cameras and surveillance technology for residential and commercial security.",
  "Vehicle Safety and Parking Security": "Security systems for vehicle access and parking areas.",
  "Warning Systems and Rescue Equipment": "Alarm systems and rescue equipment for emergency response.",
};

// Source: Statista Market Insights country outlooks for Iraq (Household Appliances,
// Kitchenware, Furniture, Carpets & Rugs, Smart Home categories), accessed 2026.
export const marketStatsSource = "Statista Market Insights, Iraq country outlooks";

export const marketStats = [
  ["US$6.81B", "Home Appliances", "Projected market revenue in Iraq in 2027"],
  ["US$42.34M", "Kitchenware", "Projected market revenue in Iraq in 2027"],
  ["US$102.20M", "Carpets & Rugs", "Projected market revenue in Iraq for 2026"],
  ["US$99.67M", "Furniture", "Projected market revenue in Iraq for 2026"],
  ["13.99%", "Smart Homes", "Stated CAGR for 2024–2028"],
  ["5.92%", "Small Appliances", "Stated CAGR for 2024–2029"],
] as const;

export const whyIraqReasons = [
  {
    title: "Home carries deep cultural weight",
    body: "Home holds significant cultural meaning in Iraq, symbolizing stability, family and identity. This puts sustained emphasis on home solutions and the creation of comfortable, well-furnished living spaces — a durable demand driver independent of short-term market cycles.",
  },
  {
    title: "Rapid urbanization is reshaping demand",
    body: "Iraq is experiencing rapid urbanization, with a growing share of the population living in cities. As urban populations increase, so does demand for modern housing, fitted interiors and the products that furnish them — from Baghdad to Basra and Erbil.",
  },
  {
    title: "A rising middle class wants modern living",
    body: "The emergence of a larger Iraqi middle class signals increased purchasing power and rising expectations for living standards. This demographic is actively seeking innovative technologies, quality finishes and modern lifestyle products for the home.",
  },
  {
    title: "Iraq is a regional gateway, not just a domestic market",
    body: "As a cultural and economic hub in the Middle East, Iraq's influence extends across the region. An exhibition based in Baghdad draws regional stakeholders — designers, manufacturers and investors — creating cross-border collaboration and trade opportunities beyond the domestic market alone.",
  },
  {
    title: "The fundamentals support long-term investment",
    body: "Iraq's socio-economic trajectory, cultural heritage and growing technological readiness make it a market suited to sustained investment. Addressing pressing housing needs while catalyzing innovation and economic growth positions the home sector as one of Iraq's most active areas of commercial opportunity.",
  },
] as const;

export const visitorProfile = [
  { title: "Importers", description: "Sourcing international home, furniture and interiors products for the Iraqi market." },
  { title: "Exporters", description: "Identifying distribution partners and market entry routes into Iraq." },
  { title: "Producers", description: "Local and regional manufacturers benchmarking products and sourcing components." },
  { title: "Wholesalers", description: "Building supplier relationships across furniture, textiles and home-appliance categories." },
  { title: "Retailers", description: "Sourcing new ranges for showrooms and retail outlets across Iraq." },
  { title: "Interior Designers", description: "Discovering materials, finishes and furnishing solutions for residential and hospitality projects." },
  { title: "Purchasing Specialists", description: "Comparing suppliers and negotiating terms for procurement pipelines." },
  { title: "Chain Stores", description: "Evaluating suppliers for multi-outlet retail expansion." },
  { title: "Public-Sector Representatives", description: "Assessing suppliers and solutions for government and municipal housing initiatives." },
  { title: "Press & Media", description: "Covering exhibitor launches, market trends and the Iraqi home industry." },
] as const;

export const venue = {
  name: "Baghdad International Fair",
  description: [
    "Baghdad International Fair is accredited as Iraq's foremost comprehensive exhibition centre, fully equipped with conference halls, extensive car parking, unlimited floor loads, central air-conditioning and food & beverage outlets — the infrastructure a four-day international trade exhibition requires.",
    "The venue occupies one of Baghdad's most prominent locations, close to several five-star hotels, shopping destinations and sightseeing areas, and only minutes from Baghdad International Airport — making it straightforward for international exhibitors and visitors to reach.",
  ],
} as const;

export const marketOpportunity = {
  heading: "A construction pipeline creating sustained demand",
  body: "The construction of residential complexes and homes continues to expand across Iraq year after year, creating consistent downstream demand for the furniture, interiors, kitchen, bathroom and building-systems products showcased at Iraq Home Expo. For international suppliers evaluating new export markets, this construction pipeline — and the fit-out and furnishing spend that follows it — is what makes Iraq one of the more significant emerging markets in the region.",
} as const;
