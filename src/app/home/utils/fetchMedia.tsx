import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type MediaContentfulType = {
  title: string;
  vimeoId: number;
};

const MEDIA_QUERY = `
query{
   mediaLibraryCollection(limit: 3, order:sys_firstPublishedAt_DESC){
    items{
      title
      vimeoId
    }
  }
}
`;

export const fetchMedia = async () => {
  const data = await fetchContentfulData(MEDIA_QUERY);
  return data.data.mediaLibraryCollection.items as MediaContentfulType[];
};
