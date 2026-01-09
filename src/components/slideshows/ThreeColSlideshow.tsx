"use client";
import { useEffect, useState } from "react";
import SlideshowIndicator from "./SlideshowIndicator";
import Image from "next/image";
import DateLabel from "../DateLabel";
import ReadMoreBtn from "../ReadMoreBtn";
import styles from "./ThreeColSlideshow.module.css";
import useSlideshowAnimation from "./utils/useSlideshowAnimation";
import SlideshowLayout from "./SlideshowLayout";

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
  urlPrefix: string;
  btnLabel: string;
};

const SlideshowItem = ({
  slideItem,
  urlPrefix,
  btnLabel,
}: SlideshowItemProps) => {
  return (
    <div>
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
  const {
    numSlides,
    currentIndex,
    gotoSlide,
    dataListGroups,
    slidesRef,
    indicatorPreviousRef,
    indicatorNextRef,
  } = useSlideshowAnimation<slideshowItemType>({
    slideshowColNumber: SLIDESHOW_ITEM_WIDTH,
    dataList: slideshowItems,
  });

  const colStyles = (index: number) => {
    return index === 0
      ? styles.fair_left
      : index === 1
        ? styles.fair_center
        : styles.fair_right;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <SlideshowLayout
        numItems={numSlides}
        currentIndex={currentIndex}
        onPreviousClick={() => gotoSlide(-1)}
        onNextClick={() => gotoSlide(1)}
        indicatorPreviousRef={indicatorPreviousRef}
        indicatorNextRef={indicatorNextRef}
        indicator={slideshowItems.length > SLIDESHOW_ITEM_WIDTH}
      >
        {dataListGroups.map((group, slideIndex) => (
          <div
            key={`slide-${slideIndex}`}
            ref={(el) => {
              slidesRef.current[slideIndex] = el;
            }}
            className={styles.fairsSlideshowDisplayContainer}
          >
            {group.map((item, index) => (
              <div key={item.title + index} className={colStyles(index)}>
                <SlideshowItem
                  slideItem={item}
                  urlPrefix={urlPrefix}
                  btnLabel={btnLabel}
                />
              </div>
            ))}
          </div>
        ))}
      </SlideshowLayout>
    </div>
  );
};

export default ThreeColSlideshow;
