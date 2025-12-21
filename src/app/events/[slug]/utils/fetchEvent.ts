import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type EventContentfulType = {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  fullText: string;
  artistsCollection: {
    items: {
      slug: string;
      name: string;
    }[];
  };
  heroImage: {
    url: string;
    title: string;
  };
};

const EVENT_QUERY = `
query($slug: String!){
  eventCollection(limit: 1, where: {slug: $slug}){
    items{
      slug
      title
      startDate
      endDate
      fullText
      artistsCollection(limit: 30){
        items{
          slug
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

export const fetchEvent = async (slug: string) => {
  const data = await fetchContentfulData(EVENT_QUERY, { slug });
  return data.data.eventCollection.items[0] as EventContentfulType;
};
