import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type ArtistContentfulType = {
  name: string;
  portraitImage: {
    url: string;
    title: string;
  };
  heroImage: {
    url: string;
    title: string;
  };
  placeOfBirth: string;
  yearOfBirth: string;
};

export type ExhibitionForArtistsContentfulType = {
  title: string;
  startDate: string;
  endDate: string;
  artistsCollection: {
    items: ArtistContentfulType[];
  };
};

const EXHIBITIONS_FOR_ARTISTS_QUERY = `
query{
  exhibitionCollection(order: startDate_DESC){
    items{
      title
      startDate
      endDate
      artistsCollection(limit: 30){
        items{
          portraitImage{
            url
            title
          }
          heroImage{
            url
            title
          }
          name
          placeOfBirth
          yearOfBirth
        }
      }
    }
  }
}
`;

const fetchExhibitionsForArtists = async () => {
  const data = await fetchContentfulData(EXHIBITIONS_FOR_ARTISTS_QUERY);
  return data.data.exhibitionCollection
    .items as ExhibitionForArtistsContentfulType[];
};

export default fetchExhibitionsForArtists;
