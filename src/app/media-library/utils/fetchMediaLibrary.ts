import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type MediaLibraryContentfulType = {
  vimeoId: number;
};

const MEDIA_LIBRARY_QUERY = `
query{
    mediaLibraryCollection{
      items{
        vimeoId
      }
   }
}
`;

export const fetchMediaLibrary = async () => {
  const data = await fetchContentfulData(MEDIA_LIBRARY_QUERY);
  return data.data.mediaLibraryCollection.items as MediaLibraryContentfulType[];
};
