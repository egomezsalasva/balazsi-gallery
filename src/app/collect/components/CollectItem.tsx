"use client";
import { useState } from "react";
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
    type,
    inventory,
  } = collectItem;
  const images = imagesCollection?.items ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const heroImage = images[activeIndex];

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsContainerSticky}>
          <div className={styles.collectTitleContainer}>
            <h3>{title}</h3>
          </div>
          {artist && (
            <Link
              href={`/artist/${artist?.slug}`}
              className={styles.artistLink}
            >
              {artist?.name}
            </Link>
          )}
          <div className={styles.description}>
            <ReactMarkdown>{summaryText}</ReactMarkdown>
          </div>
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
