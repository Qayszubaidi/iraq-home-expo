# Iraq Home Expo 2027

Standalone English-only Next.js website for Iraq Home Expo 2027.

## Event
- 12–15 May 2027
- Baghdad International Fair
- Baghdad, Iraq
- 11:00 AM – 6:00 PM

## Stack
- Next.js App Router
- TypeScript
- React
- Next Image
- Server-side Nodemailer form handling
- Responsive CSS animation system

## Routes
- `/`
- `/about`
- `/why-iraq`
- `/sectors`
- `/sectors/[slug]` — 8 sector detail pages
- `/visit`
- `/exhibit`
- `/register`
- `/contact`
- `/privacy`
- `/terms`

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm start
```

## SMTP
Copy `.env.example` to `.env.local` and replace the placeholders with the real SMTP credentials.

Never commit `.env.local` or SMTP secrets.

The form endpoint is `POST /api/contact`.

- Visitor registration → `CONTACT_TO`
- Exhibitor registration → `SALES_TO`
- General contact → `CONTACT_TO`

## Video placeholders
The Success Steps YouTube channel is currently used as the organizer-video placeholder.
Replace the channel placeholder with specific YouTube embed URLs later when individual videos are selected.

## Design system
- Deep teal `#005251`
- Gold `#C38F2C`
- Charcoal `#231F20`
- Manrope for display/headings
- DM Sans for UI/body copy
- Sticky header with white logo plate
- Sectors mega-menu with dropdown indicator
- Mobile floating registration control
- Reduced-motion accessibility support
