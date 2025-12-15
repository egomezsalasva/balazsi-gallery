import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type EventContentfulType = {
  title: string;
  heroImage: {
    url: string;
    title: string;
  };
  startDate: string;
  endDate: string;
  summaryText: string;
};

const EVENTS_QUERY = `
query{
  eventCollection(order: startDate_DESC){
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

export const fetchEvents = async () => {
  const data = await fetchContentfulData(EVENTS_QUERY);
  return data.data.eventCollection.items as EventContentfulType[];
};
