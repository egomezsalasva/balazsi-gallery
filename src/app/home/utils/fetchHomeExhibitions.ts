import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type HomeExhibitionsContentfulType = {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  artistsCollection: {
    items: {
      name: string;
    }[];
  };
  heroImage: {
    url: string;
    title: string;
  };
};

const HOME_EXHIBITIONS_QUERY = `
query($today: DateTime!){
  exhibitionCollection(
    limit: 6, 
    order: endDate_DESC,
    where: { startDate_lte: $today }
  ){
    items{
      slug
      title
      startDate
      endDate
      artistsCollection(limit: 30){
        items{
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

export const fetchHomeExhibitions = async () => {
  const today = new Date().toISOString();
  const data = await fetchContentfulData(HOME_EXHIBITIONS_QUERY, { today });
  return data.data.exhibitionCollection
    .items as HomeExhibitionsContentfulType[];
};
