import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type ExhibitionContentfulType = {
  url: string;
  title: string;
  heroImage: {
    url: string;
    fileName: string;
  };
  startDate: string;
  endDate: string;
  fullText: string;
  artistsCollection: {
    items: {
      name: string;
    }[];
  };
};

const EXHIBITION_QUERY = `
query($slug: String!){
  exhibitionCollection(limit: 1, where: {url: $slug}){
    items{
      url
      title
      heroImage{
        url
        fileName
      }
      startDate
      endDate
      fullText
      artistsCollection(limit: 30){
        items{
          name
        }
      }
    }
  }
}
`;

export const fetchExhibition = async (slug: string) => {
  const data = await fetchContentfulData(EXHIBITION_QUERY, { slug });
  return data.data.exhibitionCollection.items[0] as ExhibitionContentfulType;
};
