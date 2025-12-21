import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type NewsPostContentfulType = {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  fullText: string;
  artistsCollection: {
    items: {
      slug: string;
      name: string;
    }[];
  };
  heroImage: {
    url: string;
    title: string;
  };
};

const NEWS_POST_QUERY = `
query($slug: String!){
  newsCollection(limit: 1, where: {slug: $slug}){
    items{
      slug
      title
      startDate
      endDate
      fullText
      artistsCollection(limit: 30){
        items{
          slug
          name
        }
      }
      heroImage{
        url
        title
      }
    }
  }
}
`;

export const fetchNewsPost = async (slug: string) => {
  const data = await fetchContentfulData(NEWS_POST_QUERY, { slug });
  return data.data.newsCollection.items[0] as NewsPostContentfulType;
};
