import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type NewsContentfulType = {
  slug: string;
  title: string;
  heroImage: {
    url: string;
    title: string;
  };
  startDate: string;
  endDate: string;
  summaryText: string;
};

const NEWS_QUERY = `
query{
  newsCollection(order: startDate_DESC){
    items{
      slug
      title
      heroImage{
        url
        title
      }
      startDate
      endDate
      summaryText
    }
  }
}
`;

export const fetchNews = async () => {
  const data = await fetchContentfulData(NEWS_QUERY);
  return data.data.newsCollection.items as NewsContentfulType[];
};
