import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type MediaLibraryContentfulType = {
  title: string;
  vimeoId: number;
};

const MEDIA_LIBRARY_QUERY = `
query{
    mediaLibraryCollection(order:sys_firstPublishedAt_DESC) {
      items{
        title
        vimeoId
      }
   }
}
`;

export const fetchMediaLibrary = async () => {
  const data = await fetchContentfulData(MEDIA_LIBRARY_QUERY);
  return data.data.mediaLibraryCollection.items as MediaLibraryContentfulType[];
};
