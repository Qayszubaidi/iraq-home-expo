# AI Assistant setup

The private `/admin` dashboard includes a new **AI Assistant** tab.

## Required Vercel environment variables

Add these to the Iraq Home Expo Vercel project:

```env
OPENAI_API_KEY=your_private_openai_api_key
OPENAI_MODEL=gpt-5.6-terra
```

`OPENAI_API_KEY` must be server-side only. Do not prefix it with `NEXT_PUBLIC_`.

After adding/changing environment variables, redeploy the project.

## Modes

- **Ask** — read-only questions about current CMS data.
- **Make Changes** — proposes CMS operations and lets the admin save them to Drafts.
- **Audit Website** — reviews content consistency, media reuse, SEO and configuration.
- **Developer** — creates an implementation plan for code-level features. It does not write to Git or deploy code in this version.

## Security

The `/api/admin/ai` endpoint:
1. requires the logged-in Supabase access token,
2. verifies the user exists in `admin_users`,
3. reads CMS context server-side,
4. calls OpenAI with `OPENAI_API_KEY` server-side,
5. uses `store:false`,
6. never auto-publishes CMS changes.

Developer-mode direct Git changes should be added later using a dedicated GitHub App or tightly-scoped repository token with explicit approval before commit/deploy.
