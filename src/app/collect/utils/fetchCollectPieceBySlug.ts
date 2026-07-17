import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type CollectPieceContentfulType = {
  sys: {
    id: string;
  };
  slug: string;
  title: string;
  price: number;
  inventory: number;
  shippingFallback: number;
  shippingSpain: number | null;
  shippingUsa: number | null;
  shippingSingapore: number | null;
  shippingSweden: number | null;
  shippingUk: number | null;
};

const COLLECT_PIECE_QUERY = `
query ($slug: String!) {
  collectCollection(limit: 1, where: { slug: $slug }) {
    items {
      sys {
        id
      }
      slug
      title
      price
      inventory
      shippingFallback
      shippingSpain
      shippingUsa
      shippingSingapore
      shippingSweden
      shippingUk
    }
  }
}
`;

export async function fetchCollectPieceBySlug(slug: string) {
  const data = await fetchContentfulData(COLLECT_PIECE_QUERY, { slug });
  return data.data.collectCollection.items[0] as CollectPieceContentfulType;
}
