"use client";
import { useEffect, useState } from "react";
import SlideshowIndicator from "./SlideshowIndicator";
import Image from "next/image";
import DateLabel from "../DateLabel";
import ReadMoreBtn from "../ReadMoreBtn";
import styles from "./ThreeColSlideshow.module.css";

type slideshowItemType = {
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  heroImage: {
    url: string;
    title: string;
  };
};

type ThreeColSlideshowProps = {
  title: string;
  slideshowItems: slideshowItemType[];
  urlPrefix: string;
  btnLabel: string;
};

type SlideshowItemProps = {
  slideItem: slideshowItemType;
  className: string;
  urlPrefix: string;
  btnLabel: string;
};

const SlideshowItem = ({
  slideItem,
  className,
  urlPrefix,
  btnLabel,
}: SlideshowItemProps) => {
  return (
    <div className={className}>
      <Image
        src={slideItem.heroImage.url}
        alt={slideItem.heroImage.title}
        width={1000}
        height={1000}
        className={styles.fairImage}
      />
      <h3 className={styles.fair_title}>{slideItem.title}</h3>
      <DateLabel
        startDate={slideItem.startDate}
        endDate={slideItem.endDate ? slideItem.endDate : undefined}
      />
      <ReadMoreBtn href={`${urlPrefix}/${slideItem.slug}`} title={btnLabel} />
    </div>
  );
};

const ThreeColSlideshow = ({
  title,
  slideshowItems,
  urlPrefix,
  btnLabel,
}: ThreeColSlideshowProps) => {
  const SLIDESHOW_ITEM_WIDTH = 3;
  const numItems = Math.ceil(slideshowItems.length / SLIDESHOW_ITEM_WIDTH);
  const [currentFairLeftIndex, setCurrentFairLeftIndex] = useState(0);
  const [currentFairCenterIndex, setCurrentFairCenterIndex] = useState(1);
  const [currentFairRightIndex, setCurrentFairRightIndex] = useState(2);
  const [currentIndicatorIndex, setCurrentIndicatorIndex] = useState(0);

  const handlePreviousClick = () => {
    if (currentFairLeftIndex > 0) {
      setCurrentFairLeftIndex(currentFairLeftIndex - SLIDESHOW_ITEM_WIDTH);
      setCurrentFairCenterIndex(currentFairCenterIndex - SLIDESHOW_ITEM_WIDTH);
      setCurrentFairRightIndex(currentFairRightIndex - SLIDESHOW_ITEM_WIDTH);
    } else {
      const lastPairStartIndex = (numItems - 1) * SLIDESHOW_ITEM_WIDTH;
      setCurrentFairLeftIndex(lastPairStartIndex);
      setCurrentFairCenterIndex(lastPairStartIndex + 1);
      setCurrentFairRightIndex(lastPairStartIndex + 2);
    }
  };
  const handleNextClick = () => {
    if (currentFairLeftIndex < slideshowItems.length - SLIDESHOW_ITEM_WIDTH) {
      setCurrentFairLeftIndex(currentFairLeftIndex + SLIDESHOW_ITEM_WIDTH);
      setCurrentFairCenterIndex(currentFairCenterIndex + SLIDESHOW_ITEM_WIDTH);
      setCurrentFairRightIndex(currentFairRightIndex + SLIDESHOW_ITEM_WIDTH);
    } else {
      setCurrentFairLeftIndex(0);
      setCurrentFairCenterIndex(1);
      setCurrentFairRightIndex(2);
    }
  };

  useEffect(() => {
    setCurrentIndicatorIndex(currentFairLeftIndex / SLIDESHOW_ITEM_WIDTH);
  }, [currentFairLeftIndex]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.fairs}>
        <SlideshowItem
          slideItem={slideshowItems[currentFairLeftIndex]}
          className={styles.fair_left}
          urlPrefix={urlPrefix}
          btnLabel={btnLabel}
        />
        {currentFairCenterIndex < slideshowItems.length && (
          <SlideshowItem
            slideItem={slideshowItems[currentFairCenterIndex]}
            className={styles.fair_center}
            urlPrefix={urlPrefix}
            btnLabel={btnLabel}
          />
        )}
        {currentFairRightIndex < slideshowItems.length && (
          <SlideshowItem
            slideItem={slideshowItems[currentFairRightIndex]}
            className={styles.fair_right}
            urlPrefix={urlPrefix}
            btnLabel={btnLabel}
          />
        )}
        {slideshowItems.length > SLIDESHOW_ITEM_WIDTH && (
          <SlideshowIndicator
            numItems={numItems}
            classNameIndicator={styles.indicatorContainer}
            classNameArrows={styles.arrowsContainer}
            currentIndex={currentIndicatorIndex}
            onPreviousClick={handlePreviousClick}
            onNextClick={handleNextClick}
          />
        )}
      </div>
    </div>
  );
};

export default ThreeColSlideshow;
