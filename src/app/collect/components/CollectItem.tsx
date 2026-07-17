import Image from "next/image";
import { CollectPiecesContentfulType } from "../utils/fetchCollectPieces";
import ReactMarkdown from "react-markdown";
import { formatEuroFromCents } from "../utils/formatEuroFromCents";
import PurchaseButton from "./PurchaseButton";
import Link from "next/link";
import styles from "./CollectItem.module.css";

type CollectItemProps = {
  collectItem: CollectPiecesContentfulType;
};

const CollectItem = ({ collectItem }: CollectItemProps) => {
  const {
    slug,
    title,
    artist,
    imagesCollection,
    summaryText,
    price,
    inventory,
  } = collectItem;
  const heroImage = imagesCollection?.items?.[0];
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsContainerSticky}>
          <div className={styles.collectTitleContainer}>
            <h3>{title}</h3>
          </div>
          <Link href={`/artist/${artist?.slug}`} className={styles.artistLink}>
            {artist?.name}
          </Link>
          <div className={styles.description}>
            <ReactMarkdown>{summaryText}</ReactMarkdown>
          </div>
          <div className={styles.priceContainer}>
            <p>Price: {formatEuroFromCents(price)}</p>
            {inventory > 1 && (
              <p className={styles.remainingInventory}>{inventory} left</p>
            )}
          </div>

          {inventory > 0 ? (
            <PurchaseButton slug={slug} />
          ) : (
            <p style={{ opacity: 0.33 }}>SOLD</p>
          )}
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={heroImage ? heroImage.url : "/fallback.png"}
          alt={heroImage ? heroImage.title : "Collect Piece Image"}
          width={1000}
          height={1000}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default CollectItem;
