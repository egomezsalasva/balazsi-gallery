"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import SlideshowIndicator from "./SlideshowIndicator";
import styles from "./OneColSlideshowWithSides.module.css";

type OneColSlideshowWithSidesProps = {
  images: { url: string; title: string }[];
};

const OneColSlideshowWithSides = ({
  images,
}: OneColSlideshowWithSidesProps) => {
  const numItems = images.length;
  const [previousIndex, setPreviousIndex] = useState(numItems - 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  useEffect(() => {
    if (currentIndex === 0) {
      setPreviousIndex(images.length - 1);
    } else {
      setPreviousIndex(currentIndex - 1);
    }
    if (currentIndex === images.length - 1) {
      setNextIndex(0);
    } else {
      setNextIndex(currentIndex + 1);
    }
  }, [currentIndex]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Installation Views</h2>
      <div className={styles.slideshowContainer}>
        <div className={styles.slideshowPreviousImageContainer}>
          <div className={styles.slideshowPreviousImageFade} />
          <Image
            src={images[previousIndex].url}
            alt={images[previousIndex].title}
            width={1000}
            height={1000}
            className={styles.image}
          />
        </div>
        <div className={styles.slideshowImageContainer}>
          <Image
            src={images[currentIndex].url}
            alt={images[currentIndex].title}
            width={1000}
            height={1000}
            className={styles.image}
          />
        </div>
        <div className={styles.slideshowNextImageContainer}>
          <div className={styles.slideshowNextImageFade} />
          <Image
            src={images[nextIndex].url}
            alt={images[nextIndex].title}
            width={1000}
            height={1000}
            className={styles.image}
          />
        </div>
        <SlideshowIndicator
          numItems={numItems}
          classNameIndicator={styles.indicatorContainer}
          classNameArrows={styles.arrowsContainer}
          currentIndex={currentIndex}
          onPreviousClick={() => setCurrentIndex(previousIndex)}
          onNextClick={() => setCurrentIndex(nextIndex)}
        />
      </div>
    </div>
  );
};

export default OneColSlideshowWithSides;
