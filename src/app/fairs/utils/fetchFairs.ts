import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type FairContentfulType = {
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

const FAIRS_QUERY = `
query{
  fairCollection(order: startDate_DESC){
    items{
      title
      heroImage{
        url
        title
      }
      startDate
      endDate
      summaryText
    }
  }
}
`;

export const fetchFairs = async () => {
  const data = await fetchContentfulData(FAIRS_QUERY);
  return data.data.fairCollection.items as FairContentfulType[];
};
