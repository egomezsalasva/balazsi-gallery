import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type NewsForArtistContentfulType = {
  slug: string;
  title: string;
  heroImage: {
    url: string;
    title: string;
  };
  startDate: string;
  endDate: string;
};

const NEWS_FOR_ARTIST_QUERY = `
query($slug: String!){
   newsCollection(where: {artists: {slug: $slug}}, order: startDate_DESC){
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

export const fetchNewsForArtist = async (slug: string) => {
  const data = await fetchContentfulData(NEWS_FOR_ARTIST_QUERY, { slug });
  return data.data.newsCollection.items as NewsForArtistContentfulType[];
};
