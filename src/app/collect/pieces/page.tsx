import CollectItem from "../components/CollectItem";
import { fetchCollectPieces } from "../utils/fetchCollectPieces";

export default async function CollectPiecesPage() {
  const collectPieces = await fetchCollectPieces();
  return (
    <div>
      {collectPieces.map((item) => (
        <CollectItem key={item.slug} collectItem={item} />
      ))}
    </div>
  );
}
