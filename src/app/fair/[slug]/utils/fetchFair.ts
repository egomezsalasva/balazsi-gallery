import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type InstallationImageContentfulType = {
  url: string;
  title: string;
};

export type WorkContentfulType = {
  slug: string;
  title: string;
  details: string;
  enquire: boolean;
  workImagesCollection: {
    items: {
      url: string;
      title: string;
    }[];
  };
};

export type FairContentfulType = {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  fullText: string;
  heroImage: {
    url: string;
    title: string;
  };
  artistsCollection: {
    items: {
      slug: string;
      name: string;
    }[];
  };
  installationImagesCollection: {
    items: InstallationImageContentfulType[];
  };
  worksCollection: {
    items: WorkContentfulType[];
  };
};

const FAIR_QUERY = `
query($slug: String!){
  fairCollection(limit: 1, where: {slug: $slug}){
    items{
      slug
      title
      startDate
      endDate
      fullText
      heroImage{
        url
        title
      }
      artistsCollection(limit: 30){
        items{
          slug
          name
        }
      }
      installationImagesCollection{
        items{
          url
          title
        }
      }
      worksCollection{
        items{
          slug
          title
          details
          workImagesCollection(limit: 1){
            items{
              url
              title
            }
          }
          enquire
        }
      }
    }
  }
}
`;

export const fetchFair = async (slug: string) => {
  const data = await fetchContentfulData(FAIR_QUERY, { slug });
  return data.data.fairCollection.items[0] as FairContentfulType;
};
