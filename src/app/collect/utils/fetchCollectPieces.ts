import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type CollectPiecesContentfulType = {
  slug: string;
  title: string;
  summaryText: string;
  price: number;
  status: "available" | "sold";
  artist?: {
    name: string;
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
  collectCollection(order: sys_publishedAt_DESC) {
    items {
      slug
      title
      summaryText
      price
      status
      artist {
        name
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
