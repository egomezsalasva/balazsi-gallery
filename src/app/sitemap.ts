import type { MetadataRoute } from "next";
import staticSitemapRoutes from "@/config/staticSitemapRoutes.json";
import { fetchContentfulData } from "@/utils/fetchContentfulData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.balazsi.com";
const LIMIT = 100;

export const revalidate = 3600;

const SLUGS_QUERY = `
query {
  exhibitionCollection(limit: ${LIMIT}) {
    total
    items { slug sys { publishedAt } }
  }
  fairCollection(limit: ${LIMIT}) {
    total
    items { slug sys { publishedAt } }
  }
  artistCollection(limit: ${LIMIT}) {
    total
    items { slug sys { publishedAt } }
  }
  newsCollection(limit: ${LIMIT}) {
    total
    items { slug sys { publishedAt } }
  }
  eventCollection(limit: ${LIMIT}) {
    total
    items { slug sys { publishedAt } }
  }
}
`;

type SlugItem = {
  slug: string;
  sys?: { publishedAt?: string };
};

type SlugCollection = {
  total?: number;
  items?: SlugItem[];
};

function warnIfTruncated(name: string, collection: SlugCollection | undefined) {
  const total = collection?.total ?? 0;
  if (total > LIMIT) {
    console.warn(
      `[sitemap] ${name} has ${total} entries but limit is ${LIMIT}. ` +
        `${total - LIMIT} URL(s) are missing from the sitemap. Paginate or raise the limit.`,
    );
    // Optional: fail the Vercel build instead of only warning
    // throw new Error(`[sitemap] ${name} exceeds limit (${total} > ${LIMIT})`);
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await fetchContentfulData(SLUGS_QUERY);

  warnIfTruncated("exhibitionCollection", data.exhibitionCollection);
  warnIfTruncated("fairCollection", data.fairCollection);
  warnIfTruncated("artistCollection", data.artistCollection);
  warnIfTruncated("newsCollection", data.newsCollection);
  warnIfTruncated("eventCollection", data.eventCollection);

  const staticRoutes: MetadataRoute.Sitemap = staticSitemapRoutes.map(
    (path) => ({
      url: `${siteUrl}${path}`,
    }),
  );

  const fromCollection = (items: SlugItem[] | undefined, prefix: string) =>
    (items ?? [])
      .filter((item) => item?.slug)
      .map((item) => ({
        url: `${siteUrl}${prefix}/${item.slug}`,
        lastModified: item.sys?.publishedAt
          ? new Date(item.sys.publishedAt)
          : undefined,
      }));

  return [
    ...staticRoutes,
    ...fromCollection(data.exhibitionCollection?.items, "/exhibition"),
    ...fromCollection(data.fairCollection?.items, "/fair"),
    ...fromCollection(data.artistCollection?.items, "/artist"),
    ...fromCollection(data.newsCollection?.items, "/news"),
    ...fromCollection(data.eventCollection?.items, "/events"),
  ];
}
