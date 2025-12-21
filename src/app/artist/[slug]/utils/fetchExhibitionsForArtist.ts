import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type ExhibitionForArtistContentfulType = {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  heroImage: {
    url: string;
    title: string;
  };
};

const EXHIBITIONS_FOR_ARTIST_QUERY = `
query($slug: String!){
    exhibitionCollection(where:{artists: {slug: $slug}}, order:startDate_DESC){
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

export const fetchExhibitionsForArtist = async (slug: string) => {
  const data = await fetchContentfulData(EXHIBITIONS_FOR_ARTIST_QUERY, {
    slug,
  });
  return data.data.exhibitionCollection
    .items as ExhibitionForArtistContentfulType[];
};
