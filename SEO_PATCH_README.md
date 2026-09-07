# Full On-Page SEO + Image SEO + Contact Tag

Included:
- stronger titles and meta descriptions for priority pages
- canonical URLs on the non-www domain
- homepage Organization, WebSite and ExhibitionEvent schema
- improved image alt text on important page/sector images
- stronger sitemap priorities
- explicit `contact_page_view` dataLayer event on `/contact`

## Contact page tag
The Contact page should NOT get a second GTM or GA4 installation.
GTM is global. This patch adds:
`contact_page_view`
so GTM/GA4 can explicitly identify and test `/contact` without duplicate tracking.

## Image SEO
This patch improves descriptive alt text and structured-data image association.
Existing production filenames are intentionally not renamed because they may be referenced by the CMS or cached.
For new images, use descriptive filenames such as:
`iraq-home-expo-furniture-exhibition-baghdad.webp`

## CSS
Do not replace `src/app/globals.css`.
Append the contents of `src/app/seo-append.css` to the END of your existing `globals.css`, then delete `seo-append.css`.

## Note
The sector breadcrumb/link package from the previous step remains compatible with this patch.

Run:
npm.cmd run build
git status


## AI crawler / discovery files

This version also adds:
- `src/app/robots.ts`
- `public/llms.txt`

`robots.txt` explicitly allows major public search/AI crawlers while blocking `/admin` and private admin API routes.
`llms.txt` provides a concise machine-readable overview of the event, important pages, sectors, contact details, canonical domain and sitemap.

These files do not guarantee inclusion in AI answers or search engines, but they make the site's public crawling intent and structure clearer.
