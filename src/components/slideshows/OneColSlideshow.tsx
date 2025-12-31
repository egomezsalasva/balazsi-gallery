"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SlideshowIndicator from "./SlideshowIndicator";
import { NewsPostContentfulType } from "@/app/news/[slug]/utils/fetchNewsPost";
import styles from "./OneColSlideshow.module.css";

type OneColSlideshowProps = {
  additionalImages: NewsPostContentfulType["additionalImagesCollection"]["items"];
};

const OneColSlideshow = ({ additionalImages }: OneColSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePreviousClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(additionalImages.length - 1);
    }
  };
  const handleNextClick = () => {
    if (currentIndex < additionalImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  useEffect(() => {
    setCurrentIndex(currentIndex);
  }, [currentIndex]);

  return (
    <div className={styles.additionalImagesContainer}>
      <Image
        src={additionalImages[currentIndex].url}
        alt={additionalImages[currentIndex].title}
        width={1000}
        height={1000}
        className={styles.additionalImage}
      />
      <SlideshowIndicator
        numItems={additionalImages.length}
        classNameIndicator={styles.indicator}
        classNameArrows={styles.arrows}
        onPreviousClick={handlePreviousClick}
        onNextClick={handleNextClick}
        currentIndex={currentIndex}
      />
    </div>
  );
};

export default OneColSlideshow;
