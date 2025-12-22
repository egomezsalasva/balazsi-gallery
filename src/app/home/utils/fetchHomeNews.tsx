import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type HomeNewsContentfulType = {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  heroImage: {
    url: string;
    title: string;
  };
};

const HOME_NEWS_QUERY = `
query{
  newsCollection(limit: 6, order: startDate_DESC){
    items{
      slug
      title
      startDate
      endDate
      heroImage{
        url
        title
      }
    }
  }
}
`;

export const fetchHomeNews = async () => {
  const data = await fetchContentfulData(HOME_NEWS_QUERY);
  return data.data.newsCollection.items as HomeNewsContentfulType[];
};
