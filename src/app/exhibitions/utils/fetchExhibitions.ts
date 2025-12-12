import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type ExhibitionContentfulType = {
  title: string;
  heroImage: {
    url: string;
    fileName: string;
  };
  startDate: string;
  endDate: string;
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
      title
      heroImage{
        url
        fileName
      }
      startDate
      endDate
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
