import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type FairForArtistContentfulType = {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  heroImage: {
    url: string;
    title: string;
  };
};

const FAIRS_FOR_ARTIST_QUERY = `
query($slug: String!){
   fairCollection(where: {artists: {slug: $slug}}, order: startDate_DESC){
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

export const fetchFairsForArtist = async (slug: string) => {
  const data = await fetchContentfulData(FAIRS_FOR_ARTIST_QUERY, { slug });
  return data.data.fairCollection.items as FairForArtistContentfulType[];
};
