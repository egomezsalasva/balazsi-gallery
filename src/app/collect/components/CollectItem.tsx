"use client";
import { useState } from "react";
import Image from "next/image";
import { CollectPiecesContentfulType } from "../utils/fetchCollectPieces";
import { formatEuroFromCents } from "../utils/formatEuroFromCents";
import PurchaseButton from "./PurchaseButton";
import DescriptionFadeToggle from "@/components/DescriptionFadeToggle";
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
    type,
    inventory,
  } = collectItem;
  const images = imagesCollection?.items ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const heroImage = images[activeIndex];

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.collectTitleContainer}>
          <h3>{title}</h3>
        </div>
        {artist && (
          <Link href={`/artist/${artist?.slug}`} className={styles.artistLink}>
            {artist?.name}
          </Link>
        )}
        <DescriptionFadeToggle>{summaryText}</DescriptionFadeToggle>
        <div className={styles.priceContainer}>
          <p>
            Price:{" "}
            <span className={styles.priceAmount}>
              {formatEuroFromCents(price)}
            </span>
          </p>
          {inventory > 0 && type === "Books" && (
            <p className={styles.remainingInventory}>{inventory} left</p>
          )}
        </div>

        {inventory > 0 ? (
          <div className={styles.purchaseWrap}>
            <PurchaseButton slug={slug} />
          </div>
        ) : (
          <p className={styles.sold}>SOLD</p>
        )}
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={heroImage ? heroImage.url : "/fallback.png"}
          alt={heroImage ? heroImage.title : "Collect Piece Image"}
          width={1000}
          height={1000}
          className={styles.image}
        />
        {images.length > 1 && (
          <div className={styles.additionalImages}>
            {images.map((image, index) => (
              <button
                key={image.url}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={styles.additionalImageButton}
              >
                <Image
                  src={image.url}
                  alt={image.title || title}
                  width={400}
                  height={235}
                  className={`${styles.additionalImage} ${
                    index === activeIndex ? styles.additionalImageActive : ""
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectItem;
