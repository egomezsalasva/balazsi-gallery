"use client";
import { useEffect, useRef, useState } from "react";
import HomeSectionLayout from "./components/HomeSectionLayout";
import HomeSlideshowLayout from "./components/HomeSlideshowLayout";
import styles from "./HomeNews.module.css";
import Image from "next/image";
import { HomeNewsContentfulType } from "./utils/fetchHomeNews";
import useSlideshowAnimation from "./utils/useSlideshowAnimation";

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
  const {
    numSlides,
    currentIndex,
    gotoSlide,
    dataListGroups,
    slidesRef,
    indicatorPreviousRef,
    indicatorNextRef,
  } = useSlideshowAnimation<HomeNewsContentfulType>({
    slideshowColNumber: 3,
    dataList: news,
  });

  const colStyles = (index: number) => {
    return index === 0
      ? styles.newsSlideshowLeftContainer
      : index === 1
        ? styles.newsSlideshowCenterContainer
        : styles.newsSlideshowRightContainer;
  };

  return (
    <HomeSectionLayout title="News" linkHref="/news">
      <HomeSlideshowLayout
        numItems={numSlides}
        currentIndex={currentIndex}
        onPreviousClick={() => gotoSlide(-1)}
        onNextClick={() => gotoSlide(1)}
        indicatorPreviousRef={indicatorPreviousRef}
        indicatorNextRef={indicatorNextRef}
      >
        {dataListGroups.map((group, slideIndex) => (
          <div
            key={`slide-${slideIndex}`}
            ref={(el) => {
              slidesRef.current[slideIndex] = el;
            }}
            className={styles.newsSlideshowDisplayContainer}
          >
            {group.map((item, index) => (
              <div key={item.title + index} className={colStyles(index)}>
                <SlideshowItem
                  img={{ src: item.heroImage.url, alt: item.title }}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        ))}
      </HomeSlideshowLayout>
    </HomeSectionLayout>
  );
};

export default HomeNews;
