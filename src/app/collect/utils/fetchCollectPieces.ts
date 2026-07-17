import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type CollectType = "Pieces" | "Merch";

export type CollectPiecesContentfulType = {
  slug: string;
  title: string;
  summaryText: string;
  price: number;
  inventory: number;
  type: CollectType;
  artist?: {
    name: string;
    slug: string;
  } | null;
  imagesCollection: {
    items: {
      url: string;
      title: string;
    }[];
  };
};

const COLLECT_QUERY = `
query ($type: String!) {
  collectCollection(order: title_ASC, where: { type: $type }) {
    items {
      slug
      title
      summaryText
      price
      inventory
      type
      artist {
        name
        slug
      }
      imagesCollection {
        items {
          url
          title
        }
      }
    }
  }
}
`;

export const fetchCollectPieces = async (type: CollectType) => {
  const data = await fetchContentfulData(COLLECT_QUERY, { type });
  return data.data.collectCollection.items as CollectPiecesContentfulType[];
};
