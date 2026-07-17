import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type CollectPiecesContentfulType = {
  slug: string;
  title: string;
  summaryText: string;
  price: number;
  inventory: number;
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
query {
  collectCollection(order: title_ASC) {
    items {
      slug
      title
      summaryText
      price
      inventory
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

export const fetchCollectPieces = async () => {
  const data = await fetchContentfulData(COLLECT_QUERY);
  return data.data.collectCollection.items as CollectPiecesContentfulType[];
};
