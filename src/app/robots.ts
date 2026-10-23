import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.balazsi.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/collect/checkout", "/collect/success"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
