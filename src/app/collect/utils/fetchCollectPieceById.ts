import { fetchContentfulData } from "@/utils/fetchContentfulData";

const COLLECT_PIECE_BY_ID_QUERY = `
query ($id: String!) {
  collect(id: $id) {
    artist {
      name
      slug
    }
  }
}
`;

export async function fetchCollectPieceById(id: string) {
  const data = await fetchContentfulData(COLLECT_PIECE_BY_ID_QUERY, { id });
  return data.data.collect as {
    artist?: { name: string; slug: string } | null;
  } | null;
}
