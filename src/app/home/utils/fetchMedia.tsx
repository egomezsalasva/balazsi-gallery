import { fetchContentfulData } from "@/utils/fetchContentfulData";

export type MediaContentfulType = {
  vimeoId: number;
};

const MEDIA_QUERY = `
query{
   mediaLibraryCollection(limit: 3, order: vimeoId_ASC){
    items{
      vimeoId
    }
  }
}
`;

export const fetchMedia = async () => {
  const data = await fetchContentfulData(MEDIA_QUERY);
  return data.data.mediaLibraryCollection.items as MediaContentfulType[];
};
