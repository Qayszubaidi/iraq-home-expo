export type SeoWorkplanTask = {
  id: string;
  label: string;
};

export type SeoWorkplanMonth = {
  id: string;
  month: number;
  period: string;
  title: string;
  outcome: string;
  tasks: SeoWorkplanTask[];
};

export const SEO_WORKPLAN: SeoWorkplanMonth[] = [
  {
    id: "month-1",
    month: 1,
    period: "September 2026",
    title: "Foundation & Measurement",
    outcome: "Correct measurement, strong technical base and initial authority signals.",
    tasks: [
      {id:"m1-baseline-audit",label:"Baseline SEO audit completed"},
      {id:"m1-keyword-map",label:"Keyword map completed"},
      {id:"m1-ga4",label:"GA4 verified"},
      {id:"m1-gtm",label:"GTM verified"},
      {id:"m1-gsc",label:"Search Console verified"},
      {id:"m1-conversions",label:"Primary conversion events tested"},
      {id:"m1-schema",label:"Event and Organization schema implemented"},
      {id:"m1-technical",label:"Technical priority fixes completed"},
      {id:"m1-insights",label:"Insights section ready"},
      {id:"m1-market-hub",label:"Iraq Market hub ready"},
      {id:"m1-content4",label:"First 4 SEO pieces published or approved for publication"},
      {id:"m1-gbp",label:"Google Business Profile created or verification in progress"},
      {id:"m1-directories",label:"Priority event directory submissions started"},
      {id:"m1-report",label:"Monthly reporting template created"},
    ],
  },
  {
    id: "month-2",
    month: 2,
    period: "October 2026",
    title: "Iraq Market Authority",
    outcome: "Stronger relevance for Iraq furniture, interiors, home and trade show searches.",
    tasks: [
      {id:"m2-market-content",label:"Publish Iraq furniture and interiors opportunity content"},
      {id:"m2-why-iraq",label:"Strengthen the Why Iraq page"},
      {id:"m2-sector-pages",label:"Strengthen key sector pages"},
      {id:"m2-sector-articles",label:"Publish sector focused articles"},
      {id:"m2-internal-links",label:"Improve internal links between sectors, market pages and exhibit calls to action"},
      {id:"m2-directories",label:"Continue priority expo directory submissions"},
      {id:"m2-outreach",label:"Start chambers and associations outreach"},
      {id:"m2-gsc-review",label:"Review Search Console queries, indexing and click through rate"},
      {id:"m2-meta",label:"Improve weak titles and descriptions"},
      {id:"m2-content-target",label:"Reach the Month 2 target of 8 to 10 strong content pieces"},
      {id:"m2-report",label:"Complete the Month 2 performance report"},
    ],
  },
  {
    id: "month-3",
    month: 3,
    period: "November 2026",
    title: "International Expansion",
    outcome: "International organic entry points and first measurable exhibitor acquisition campaigns.",
    tasks: [
      {id:"m3-arabic-iraq",label:"Launch the Iraq Arabic campaign page"},
      {id:"m3-arabic-gcc",label:"Launch the GCC Arabic campaign page"},
      {id:"m3-turkey",label:"Launch Turkish manufacturer landing page or pages"},
      {id:"m3-india",label:"Launch India focused English landing page or pages"},
      {id:"m3-china",label:"Launch reviewed Simplified Chinese exhibitor page or pages"},
      {id:"m3-language-qa",label:"Complete translation and localization review"},
      {id:"m3-tracking",label:"Verify tracking and calls to action on all country pages"},
      {id:"m3-ads-tracking",label:"Finalize Google Ads conversion tracking"},
      {id:"m3-landing-qa",label:"Complete country landing page quality assurance"},
      {id:"m3-search-campaigns",label:"Begin exhibitor Search campaigns if approved"},
      {id:"m3-content-target",label:"Reach the Month 3 target of 8 content pieces"},
      {id:"m3-review",label:"Compare country page performance and lead quality"},
      {id:"m3-report",label:"Complete the Month 3 performance report"},
    ],
  },
  {
    id: "month-4",
    month: 4,
    period: "December 2026",
    title: "Authority, PR & Video Promotion",
    outcome: "Stronger authority, brand mentions, referral traffic and international awareness.",
    tasks: [
      {id:"m4-market-outlook",label:"Publish Iraq market outlook or research style content"},
      {id:"m4-press-assets",label:"Prepare press assets"},
      {id:"m4-backlinks",label:"Run backlink outreach to trade associations, chambers, partners, media and export organizations"},
      {id:"m4-video",label:"Launch short video promotion where approved"},
      {id:"m4-video-tracking",label:"Connect video campaigns to tracked landing pages"},
      {id:"m4-country-review",label:"Review organic and paid country performance"},
      {id:"m4-improvements",label:"Improve weak pages and campaigns"},
      {id:"m4-stories",label:"Publish event and exhibitor stories"},
      {id:"m4-content-target",label:"Reach the Month 4 target of 8 content pieces"},
      {id:"m4-authority-review",label:"Review authority and backlink growth"},
      {id:"m4-report",label:"Complete the Month 4 performance report"},
    ],
  },
  {
    id: "month-5",
    month: 5,
    period: "January 2027",
    title: "Commercial Conversion Push",
    outcome: "Stronger conversion rates and better quality exhibitor and sponsor leads.",
    tasks: [
      {id:"m5-high-intent",label:"Publish high intent Why Exhibit, buyer profile, sector opportunity and country to Iraq content"},
      {id:"m5-directory",label:"Launch or expand the exhibitor directory if verified exhibitor data is available"},
      {id:"m5-remarketing",label:"Activate remarketing when audience volume is sufficient"},
      {id:"m5-video-display",label:"Test YouTube or Display support campaigns where approved"},
      {id:"m5-cro",label:"Improve forms, calls to action and landing pages using GA4 and Leads data"},
      {id:"m5-lead-quality",label:"Compare lead quality by source and country"},
      {id:"m5-content-target",label:"Reach the Month 5 target of 10 content pieces"},
      {id:"m5-leads-review",label:"Use Admin Leads data to improve conversion quality"},
      {id:"m5-report",label:"Complete the Month 5 performance report"},
    ],
  },
  {
    id: "month-6",
    month: 6,
    period: "February 2027",
    title: "Event Intent & Visitor Growth",
    outcome: "Maximum pre event search visibility and accelerating registrations.",
    tasks: [
      {id:"m6-visitor-guide",label:"Publish the visitor guide"},
      {id:"m6-venue-travel",label:"Publish venue and travel information"},
      {id:"m6-faq",label:"Publish FAQs and what to expect content"},
      {id:"m6-event-intent",label:"Target Baghdad exhibitions 2027, Iraq furniture expo, Iraq interiors expo and related intent terms"},
      {id:"m6-visitor-campaigns",label:"Increase Iraq visitor acquisition"},
      {id:"m6-arabic",label:"Use Arabic visitor creative and pages"},
      {id:"m6-retargeting",label:"Continue exhibitor retargeting"},
      {id:"m6-content-target",label:"Reach the Month 6 target of 10 to 12 content pieces"},
      {id:"m6-full-review",label:"Complete the full six month SEO review"},
      {id:"m6-rankings",label:"Complete ranking, content and backlink reporting"},
      {id:"m6-campaign-learnings",label:"Document campaign learnings"},
      {id:"m6-next-phase",label:"Create the March to May 2027 event run up plan"},
    ],
  },
];

export const SEO_WORKPLAN_INITIAL_COMPLETED: Record<string, boolean> = {
  "m1-baseline-audit": true,
  "m1-ga4": true,
  "m1-gtm": true,
  "m1-gsc": true,
  "m1-schema": true,
};
