# Google Tracking Installation Patch

This patch installs Google Tag Manager on the Iraq Home Expo website and expands the Content Security Policy so the configured tracking services are allowed to load.

## Installed in website code
- Google Tag Manager: `GTM-K4TSR6C3`

## Configured inside GTM (do not install these directly in the website)
- GA4: `G-Z9WHEG868Z`
- Microsoft Clarity project: `yel789pzw4`

## Files changed
- `src/app/layout.tsx`
- `next.config.ts`

## After applying

Run:

```powershell
npm.cmd run build
git status
```

If the build passes:

```powershell
git add .
git commit -m "Install GTM tracking and analytics CSP"
git push origin main
```

After Vercel deploys:
1. Open GTM Preview / Tag Assistant again.
2. Connect to `https://www.iraqhomeexpo.com`.
3. Confirm `GTM-K4TSR6C3` is detected.
4. Confirm the GA4 Google tag fires once.
5. Confirm the Microsoft Clarity tag fires once.
6. Publish the GTM container if it is still only in Workspace/Preview.
7. Check GA4 Realtime after visiting the site.
8. Check Clarity after data begins arriving.

Do not add the standalone GA4 gtag snippet or standalone Clarity snippet to the website, otherwise pageviews/events can be duplicated.
