import Image from "next/image";
import styles from "./CollectItem.module.css";
import { CollectPiecesContentfulType } from "../utils/fetchCollectPieces";
import ReactMarkdown from "react-markdown";
import { formatEuroFromCents } from "../utils/formatEuroFromCents";
import PurchaseButton from "./PurchaseButton";

type CollectItemProps = {
  collectItem: CollectPiecesContentfulType;
};

const CollectItem = ({ collectItem }: CollectItemProps) => {
  const { slug, title, artist, imagesCollection, summaryText, price, status } =
    collectItem;
  const heroImage = imagesCollection?.items?.[0];
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsContainerSticky}>
          <div className={styles.detailsArtistContainer}>
            <h3>{title}</h3>
          </div>
          <div>{artist?.name}</div>
          <div className={styles.description}>
            <ReactMarkdown>{summaryText}</ReactMarkdown>
          </div>
          <div className={styles.priceContainer}>
            <p>Price: {formatEuroFromCents(price)}</p>
          </div>
          {status === "available" ? (
            <PurchaseButton slug={slug} />
          ) : (
            <p>Sold</p>
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
