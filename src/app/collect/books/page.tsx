import CollectItem from "../components/CollectItem";
import { CollectType, fetchCollectPieces } from "../utils/fetchCollectPieces";

export default async function CollectBooksPage() {
  const collectPieces = await fetchCollectPieces("Books" as CollectType);
  return (
    <div>
      {collectPieces.map((item) => (
        <CollectItem key={item.slug} collectItem={item} />
      ))}
    </div>
  );
}
