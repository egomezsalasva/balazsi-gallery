import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type WorkForArtistContentfulType = {
  slug: string;
  title: string;
  details: string;
  artist: {
    name: string;
  };
  workImagesCollection: {
    items: {
      url: string;
      title: string;
    }[];
  };
  enquire: boolean;
};

const WORKS_FOR_ARTIST_QUERY = `
query($slug: String!){
   workCollection(where: {artist: {slug: $slug} enquire: true}){
    items{
      slug
      title
      details
      artist{
        name
      }
      workImagesCollection(limit: 1){
        items{
          url
          title
        }
      }
      enquire
    }
  }
  }
`;

export const fetchWorksForArtist = async (slug: string) => {
  const data = await fetchContentfulData(WORKS_FOR_ARTIST_QUERY, { slug });
  return data.data.workCollection.items as WorkForArtistContentfulType[];
};
