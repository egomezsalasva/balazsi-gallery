import CollectItem from "../components/CollectItem";
import { CollectType, fetchCollectPieces } from "../utils/fetchCollectPieces";

export default async function CollectPiecesPage() {
  const collectPieces = await fetchCollectPieces("Merch" as CollectType);
  return (
    <div>
      {collectPieces.map((item) => (
        <CollectItem key={item.slug} collectItem={item} />
      ))}
    </div>
  );
}
