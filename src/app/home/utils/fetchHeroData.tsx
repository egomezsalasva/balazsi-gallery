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

export type HomeFairsContentfulType = {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  heroImage: {
    url: string;
    title: string;
  };
};

const HERO_DATA_QUERY = `
query($today: DateTime!){
  exhibitionCollection(
    limit: 6,
    order: startDate_ASC,
    where: { endDate_gte: $today }
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
  fairCollection(
    limit: 6,
    order: startDate_ASC,
    where: { endDate_gte: $today }
  ){
    items{
      slug
      title
      startDate
      endDate
      heroImage{
        url
        title
      }
    }
  }
}
`;

export const fetchHeroData = async () => {
  const today = new Date().toISOString();
  const data = await fetchContentfulData(HERO_DATA_QUERY, { today });
  return {
    exhibitions: data.data.exhibitionCollection
      .items as HomeExhibitionsContentfulType[],
    fairs: data.data.fairCollection.items as HomeFairsContentfulType[],
  };
};
