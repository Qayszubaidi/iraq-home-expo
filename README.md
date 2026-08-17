# Iraq Home Expo 2027 — Fresh Website

Fresh, English-only Next.js build for Iraq Home Expo 2027.

## Stack
- Next.js App Router + TypeScript
- Responsive CSS design system using the Iraq Home Expo teal / gold / charcoal brand
- Server-side Nodemailer SMTP form endpoint
- Vercel-ready environment configuration

## Routes
- `/` Home
- `/about`
- `/why-iraq`
- `/sectors`
- `/sectors/[slug]` — 8 dedicated sector pages
- `/visit`
- `/exhibit`
- `/register`
- `/contact`
- `/privacy`
- `/terms`

## Current UX features
- sticky transparent-to-teal navigation
- white logo plate for the supplied Expo logo
- desktop sector mega-menu
- responsive mobile navigation
- mobile floating registration drawer with Visitor and Exhibitor routes
- scroll/reveal animation system and reduced-motion support
- editorial sector rail and image mosaic/gallery
- market-statistic presentation
- lazy-ready organizer showreel/video components
- visitor, exhibitor and general contact forms
- server-side SMTP submission route
- sitemap and robots routes

## SMTP
Copy `.env.example` to `.env.local` locally. In Vercel, add the same variables as encrypted Environment Variables. Never commit SMTP passwords to Git.

The form API sends Visitor/Contact enquiries to `CONTACT_TO` and Exhibitor enquiries to `SALES_TO`.

## Development
```bash
npm install
npm run dev
```

## Deployment
The intended pipeline is GitHub -> Vercel preview -> review -> production-domain cutover only after explicit approval.
