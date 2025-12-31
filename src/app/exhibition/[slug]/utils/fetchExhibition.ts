import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type WorkContentfulType = {
  slug: string;
  title: string;
  details: string;
  artist: {
    name: string;
  };
  workImagesCollection: {
    items: {
      url: string;
      title: string;
    }[];
  };
  enquire: boolean;
};

export type InstallationImageContentfulType = {
  url: string;
  title: string;
};

export type ExhibitionContentfulType = {
  slug: string;
  title: string;
  heroImage: {
    url: string;
    title: string;
  };
  startDate: string;
  endDate: string;
  fullText: string;
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

const EXHIBITION_QUERY = `
query($slug: String!){
  exhibitionCollection(limit: 1, where: {slug: $slug}){
    items{
      slug
      title
      heroImage{
        url
        title
      }
      startDate
      endDate
      fullText
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
          artist{
            name
          }
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

export const fetchExhibition = async (slug: string) => {
  const data = await fetchContentfulData(EXHIBITION_QUERY, { slug });
  return data.data.exhibitionCollection.items[0] as ExhibitionContentfulType;
};
