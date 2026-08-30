export type CmsPageContent = {
  eyebrow?: string;
  title?: string;
  copy?: string;
  heroImage?: string;
  heroAlt?: string;
  heroPosition?: string;
  primary?: string;
  primaryHref?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type CmsSectorContent = {
  title?: string;
  short?: string;
  image?: string;
  heroImage?: string;
  categories?: string[];
};

export type PublicSiteSettings = {
  eventName?: string;
  dates?: string;
  venue?: string;
  city?: string;
  hours?: string;
  infoEmail?: string;
  salesEmail?: string;
  phone1?: string;
  phone2?: string;
  facebook?: string;
  instagram?: string;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

async function publicRest<T>(path: string): Promise<T | null> {
  if (!url || !key) return null;
  try {
    const response = await fetch(`${url}/rest/v1/${path}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 30 },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getCmsPage(pageKey: string): Promise<CmsPageContent | null> {
  const rows = await publicRest<Array<{ content: CmsPageContent }>>(
    `cms_pages?key=eq.${encodeURIComponent(pageKey)}&select=content&limit=1`,
  );
  return rows?.[0]?.content ?? null;
}

export async function getCmsSector(slug: string): Promise<CmsSectorContent | null> {
  const rows = await publicRest<Array<{ content: CmsSectorContent }>>(
    `cms_sectors?slug=eq.${encodeURIComponent(slug)}&select=content&limit=1`,
  );
  return rows?.[0]?.content ?? null;
}

export async function getCmsSectors<T extends {slug:string;title:string;short:string;image:string;heroImage?:string;categories:string[]}>(fallback: T[]): Promise<T[]> {
  const rows = await publicRest<Array<{ slug: string; content: CmsSectorContent }>>(
    `cms_sectors?select=slug,content`,
  );
  if (!rows?.length) return fallback;
  const overrides = new Map(rows.map((row) => [row.slug, row.content]));
  return fallback.map((sector) => ({ ...sector, ...(overrides.get(sector.slug) ?? {}) })) as T[];
}

export async function getPublicSiteSettings(): Promise<PublicSiteSettings | null> {
  const rows = await publicRest<Array<{ value: PublicSiteSettings }>>(
    `cms_settings?key=eq.site&select=value&limit=1`,
  );
  return rows?.[0]?.value ?? null;
}
