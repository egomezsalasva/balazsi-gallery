"use client";
import { useEffect, useRef, useState } from "react";
import HomeSectionLayout from "./components/HomeSectionLayout";
import HomeSlideshowLayout from "./components/HomeSlideshowLayout";
import styles from "./HomeNews.module.css";
import Image from "next/image";
import { HomeNewsContentfulType } from "./utils/fetchHomeNews";

type SlideshowItemType = {
  img: {
    src: string;
    alt: string;
  };
  title: string;
};

const SlideshowItem = ({ img, title }: SlideshowItemType) => {
  return (
    <>
      <Image
        src={img.src}
        alt={img.alt}
        width={1200}
        height={1000}
        className={styles.slideshowImage}
      />
      <div className={styles.slideshowTitleContainer}>{title}</div>
    </>
  );
};

type HomeNewsProps = {
  news: HomeNewsContentfulType[];
};

const HomeNews = ({ news }: HomeNewsProps) => {
  const numNews = news.length;
  const [currentIndicatorIndex, setCurrentIndicatorIndex] = useState(0);
  const [currentLeftNewsIndex, setCurrentLeftNewsIndex] = useState(0);
  const [currentCenterNewsIndex, setCurrentCenterNewsIndex] = useState(1);
  const [currentRightNewsIndex, setCurrentRightNewsIndex] = useState(2);
  const onPreviousClick = () => {
    if (currentLeftNewsIndex > 0) {
      setCurrentLeftNewsIndex(currentLeftNewsIndex - 3);
      setCurrentCenterNewsIndex(currentCenterNewsIndex - 3);
      setCurrentRightNewsIndex(currentRightNewsIndex - 3);
    } else {
      setCurrentLeftNewsIndex(numNews - 3);
      setCurrentCenterNewsIndex(numNews - 3);
      setCurrentRightNewsIndex(numNews - 3);
    }
  };
  const onNextClick = () => {
    if (currentRightNewsIndex < numNews - 3) {
      setCurrentLeftNewsIndex(currentLeftNewsIndex + 3);
      setCurrentCenterNewsIndex(currentCenterNewsIndex + 3);
      setCurrentRightNewsIndex(currentRightNewsIndex + 3);
    } else {
      setCurrentLeftNewsIndex(0);
      setCurrentCenterNewsIndex(1);
      setCurrentRightNewsIndex(2);
    }
  };
  useEffect(() => {
    setCurrentIndicatorIndex(Math.ceil(currentLeftNewsIndex / 3));
  }, [currentLeftNewsIndex, currentCenterNewsIndex, currentRightNewsIndex]);

  return (
    <HomeSectionLayout title="News" linkHref="/news">
      <HomeSlideshowLayout
        numItems={Math.ceil(numNews / 3)}
        currentIndex={currentIndicatorIndex}
        onPreviousClick={onPreviousClick}
        onNextClick={onNextClick}
      >
        <div className={styles.newsSlideshowLeftContainer}>
          <SlideshowItem
            img={{
              src: news[currentLeftNewsIndex].heroImage.url,
              alt: news[currentLeftNewsIndex].title,
            }}
            title={news[currentLeftNewsIndex].title}
          />
        </div>
        <div className={styles.newsSlideshowCenterContainer}>
          <SlideshowItem
            img={{
              src: news[currentCenterNewsIndex].heroImage.url,
              alt: news[currentCenterNewsIndex].title,
            }}
            title={news[currentCenterNewsIndex].title}
          />
        </div>
        <div className={styles.newsSlideshowRightContainer}>
          <SlideshowItem
            img={{
              src: news[currentRightNewsIndex].heroImage.url,
              alt: news[currentRightNewsIndex].title,
            }}
            title={news[currentRightNewsIndex].title}
          />
        </div>
      </HomeSlideshowLayout>
    </HomeSectionLayout>
  );
};

export default HomeNews;
