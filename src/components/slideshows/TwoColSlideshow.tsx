"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SlideshowIndicator from "./SlideshowIndicator";
import DateLabel from "../DateLabel";
import ReadMoreBtn from "../ReadMoreBtn";
import styles from "./TwoColSlideshow.module.css";

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

type TwoColSlideshowProps = {
  slideshowItems: slideshowItemType[];
};

type SlideshowItemProps = {
  exhibition: slideshowItemType;
  className: string;
};

const ExhibitionSlideshowItem = ({
  exhibition,
  className,
}: SlideshowItemProps) => {
  return (
    <div className={className}>
      <Image
        src={exhibition.heroImage.url}
        alt={exhibition.heroImage.title}
        width={1000}
        height={1000}
        className={styles.exhibitionImage}
      />
      <h3>{exhibition.title}</h3>
      <DateLabel
        startDate={exhibition.startDate}
        endDate={exhibition.endDate}
      />
      <ReadMoreBtn
        href={`/exhibition/${exhibition.slug}`}
        title="View Exhibition +"
      />
    </div>
  );
};

const TwoColSlideshow = ({ slideshowItems }: TwoColSlideshowProps) => {
  const SLIDESHOW_ITEM_WIDTH = 2;
  const [currentIndicatorIndex, setCurrentIndicatorIndex] = useState(0);
  const [currentLeftExhibitionIndex, setCurrentLeftExhibitionIndex] =
    useState(0);
  const [currentRightExhibitionIndex, setCurrentRightExhibitionIndex] =
    useState(1);
  const numItems = Math.ceil(slideshowItems.length / SLIDESHOW_ITEM_WIDTH);

  const handlePreviousClick = () => {
    if (currentLeftExhibitionIndex > 0) {
      setCurrentLeftExhibitionIndex(
        currentLeftExhibitionIndex - SLIDESHOW_ITEM_WIDTH,
      );
      setCurrentRightExhibitionIndex(
        currentRightExhibitionIndex - SLIDESHOW_ITEM_WIDTH,
      );
    } else {
      const lastPairStartIndex = (numItems - 1) * SLIDESHOW_ITEM_WIDTH;
      setCurrentLeftExhibitionIndex(lastPairStartIndex);
      setCurrentRightExhibitionIndex(lastPairStartIndex + 1);
    }
  };
  const handleNextClick = () => {
    if (
      currentLeftExhibitionIndex <
      slideshowItems.length - SLIDESHOW_ITEM_WIDTH
    ) {
      setCurrentLeftExhibitionIndex(
        currentLeftExhibitionIndex + SLIDESHOW_ITEM_WIDTH,
      );
      setCurrentRightExhibitionIndex(
        currentRightExhibitionIndex + SLIDESHOW_ITEM_WIDTH,
      );
    } else {
      setCurrentLeftExhibitionIndex(0);
      setCurrentRightExhibitionIndex(1);
    }
  };

  useEffect(() => {
    setCurrentIndicatorIndex(currentLeftExhibitionIndex / SLIDESHOW_ITEM_WIDTH);
  }, [currentLeftExhibitionIndex]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Exhibitions</h2>
      <div className={styles.exhibitions}>
        <ExhibitionSlideshowItem
          exhibition={slideshowItems[currentLeftExhibitionIndex]}
          className={styles.exhibition_left}
        />
        {currentRightExhibitionIndex < numItems && (
          <ExhibitionSlideshowItem
            exhibition={slideshowItems[currentRightExhibitionIndex]}
            className={styles.exhibition_right}
          />
        )}
        {slideshowItems.length > SLIDESHOW_ITEM_WIDTH && (
          <SlideshowIndicator
            numItems={numItems}
            classNameIndicator={styles.indicatorContainer}
            classNameArrows={styles.arrowsContainer}
            onPreviousClick={handlePreviousClick}
            onNextClick={handleNextClick}
            currentIndex={currentIndicatorIndex}
          />
        )}
      </div>
    </div>
  );
};

export default TwoColSlideshow;
