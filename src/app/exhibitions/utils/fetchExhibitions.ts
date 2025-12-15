import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type ExhibitionContentfulType = {
  url: string;
  title: string;
  heroImage: {
    url: string;
    title: string;
  };
  startDate: string;
  endDate: string;
  hideEndDate: boolean;
  summaryText: string;
  artistsCollection: {
    items: {
      name: string;
    }[];
  };
};

const EXHIBITIONS_QUERY = `
query{
  exhibitionCollection(order: startDate_DESC){
    items{
      url
      title
      heroImage{
        url
        title
      }
      startDate
      endDate
      hideEndDate
      summaryText
      artistsCollection(limit: 30){
        items{
          name
        }
      }
    }
  }
}
`;

export const fetchExhibitions = async () => {
  const data = await fetchContentfulData(EXHIBITIONS_QUERY);
  return data.data.exhibitionCollection.items as ExhibitionContentfulType[];
};
