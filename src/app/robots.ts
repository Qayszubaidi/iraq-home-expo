import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/admin", "/api/admin/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/admin", "/api/admin/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/admin", "/api/admin/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/admin", "/api/admin/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/admin", "/api/admin/"],
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/admin", "/api/admin/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/admin", "/api/admin/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/admin", "/api/admin/"],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/admin", "/api/admin/"],
      },
    ],
    sitemap: "https://iraqhomeexpo.com/sitemap.xml",
    host: "https://iraqhomeexpo.com",
  };
}
