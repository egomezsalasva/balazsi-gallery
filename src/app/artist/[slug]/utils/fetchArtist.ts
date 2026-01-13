import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type ArtistContentfulType = {
  name: string;
  yearOfBirth: string;
  placeOfBirth: string;
  fullText: string;
  cvPdf: {
    url: string;
  };
  portraitImage: {
    url: string;
    title: string;
  };
};

const ARTIST_QUERY = `
query($slug: String!){
 artistCollection(limit:1, where:{slug: $slug}){
    items{
      name
      yearOfBirth
      placeOfBirth
      fullText
      cvPdf{
        url
      }
      portraitImage{
        url
        title
      }
    }
  }
}
`;

export const fetchArtist = async (slug: string) => {
  const data = await fetchContentfulData(ARTIST_QUERY, { slug });
  return data.data.artistCollection.items[0] as ArtistContentfulType;
};
