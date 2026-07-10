import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type CollectPieceContentfulType = {
  sys: {
    id: string;
  };
  slug: string;
  title: string;
  price: number;
  status: string;
  shippingFallback: number;
  shippingSpain: number;
  shippingUsa: number;
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
      status
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
