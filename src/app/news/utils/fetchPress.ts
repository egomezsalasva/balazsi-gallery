// src/app/news/utils/fetchPress.ts
import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type NewsPressContentfulType = {
  title: string;
  source: string;
  author: string;
  heroImage: {
    url: string;
    title: string;
  };
  startDate: string;
  summaryText: string;
  url: string;
};

const NEWS_PRESS_QUERY = `
query {
  newsPressCollection(order: startDate_DESC) {
    items {
      title
      source
      author
      heroImage { url title }
      startDate
      summaryText
      url
    }
  }
}
`;

export const fetchNewsPress = async () => {
  const data = await fetchContentfulData(NEWS_PRESS_QUERY);
  return data.data.newsPressCollection.items as NewsPressContentfulType[];
};
