# Iraq Home Expo — Security notes

## Static source audit performed

The project source was reviewed for common high-risk patterns. No use was found of `eval`, `new Function`, `dangerouslySetInnerHTML`, `document.write`, Node `child_process`, shell execution, committed private keys, committed `.env` files, hard-coded SMTP passwords, GitHub tokens, or API secrets.

The only browser-exposed environment variable used by the forms is `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, which is intentionally public. SMTP credentials and `TURNSTILE_SECRET_KEY` are read only in the server-side `/api/contact` route.

## Form protections currently implemented

- JSON content-type validation and 64 KB request-size limit
- field allow-listing by form type
- required-field and email validation
- input length limits and control-character stripping
- HTML escaping before rendering submitted values into email
- reply-to email validation to reduce header-injection risk
- consent requirement
- hidden honeypot field
- same-origin check in production
- best-effort in-memory IP rate limiting
- optional Cloudflare Turnstile server-side verification
- SMTP connection/greeting/socket timeouts
- mail recipients configured server-side via environment variables

The in-memory rate limiter is only a best-effort layer on serverless hosting because separate function instances do not share memory. Turnstile should be enabled in production.

## Security headers

The project disables the `X-Powered-By` header and adds content-type sniffing protection, frame protection, a strict referrer policy, restricted permissions, Cross-Origin-Opener-Policy, and CSP directives limiting framing, object embedding, base URLs, and form actions.

## Production checklist

1. Put all real secrets in Vercel Project Settings > Environment Variables. Never commit `.env.local`.
2. Configure both `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and server-only `TURNSTILE_SECRET_KEY` before production launch.
3. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM` with the real mail provider.
4. Keep `CONTACT_TO=info@iraqhomeexpo.com,qayszubaidi@gmail.com` and `SALES_TO=sales@iraqhomeexpo.com,qayszubaidi@gmail.com` unless recipients change.
5. Set `NEXT_PUBLIC_SITE_URL=https://iraqhomeexpo.com` for production origin checks.
6. Run `npm ci`, `npm run build`, and `npm audit` before every production release.
7. Test all three forms from the deployed Preview environment before promoting to Production.
8. Keep Node.js, Next.js and dependencies patched and review Dependabot/security alerts if GitHub is used.

A static review reduces risk but cannot prove that any application is free of every vulnerability or backdoor. Production security also depends on Vercel account security, SMTP provider security, DNS, domain controls, third-party services, and future code changes.
