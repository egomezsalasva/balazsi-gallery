"use client";
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
      <h3 className={`slideshowTitle ${styles.slideTitle}`}>
        {slideItem.title}
      </h3>
      <DateLabel
        startDate={slideItem.startDate}
        endDate={slideItem.endDate ? slideItem.endDate : undefined}
      />
      <div className={styles.readMoreBtnContainer}>
        <ReadMoreBtn href={`${urlPrefix}/${slideItem.slug}`} title={btnLabel} />
      </div>
    </div>
  );
};

type SlideshowContentProps = {
  title: string;
  slideshowItems: slideshowItemType[];
  urlPrefix: string;
  btnLabel: string;
  colNumber: number;
  className: string;
};

const SlideshowContent = ({
  title,
  slideshowItems,
  urlPrefix,
  btnLabel,
  colNumber,
  className,
}: SlideshowContentProps) => {
  const {
    numSlides,
    currentIndex,
    gotoSlide,
    dataListGroups,
    slidesRef,
    indicatorPreviousRef,
    indicatorNextRef,
  } = useSlideshowAnimation<slideshowItemType>({
    slideshowColNumber: colNumber,
    dataList: slideshowItems,
  });

  const colStyles = (index: number) => {
    if (colNumber === 3) {
      return index === 0
        ? styles.fair_left
        : index === 1
          ? styles.fair_center
          : styles.fair_right;
    } else if (colNumber === 2) {
      return index === 0 ? styles.fair_left : styles.fair_right;
    } else if (colNumber === 1) {
      return styles.fair_full;
    }
    return styles.fair_left;
  };

  return (
    <div className={className}>
      <h2 className={styles.title}>{title}</h2>
      <SlideshowLayout
        numItems={numSlides}
        currentIndex={currentIndex}
        onPreviousClick={() => gotoSlide(-1)}
        onNextClick={() => gotoSlide(1)}
        indicatorPreviousRef={indicatorPreviousRef}
        indicatorNextRef={indicatorNextRef}
        indicator={slideshowItems.length > colNumber}
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

const ThreeColSlideshow = ({
  title,
  slideshowItems,
  urlPrefix,
  btnLabel,
}: ThreeColSlideshowProps) => {
  return (
    <div className={styles.container}>
      <SlideshowContent
        title={title}
        slideshowItems={slideshowItems}
        urlPrefix={urlPrefix}
        btnLabel={btnLabel}
        colNumber={3}
        className={styles.threeColumnSlideshow}
      />
      <SlideshowContent
        title={title}
        slideshowItems={slideshowItems}
        urlPrefix={urlPrefix}
        btnLabel={btnLabel}
        colNumber={2}
        className={styles.twoColumnSlideshow}
      />
      <SlideshowContent
        title={title}
        slideshowItems={slideshowItems}
        urlPrefix={urlPrefix}
        btnLabel={btnLabel}
        colNumber={1}
        className={styles.oneColumnSlideshow}
      />
    </div>
  );
};

export default ThreeColSlideshow;
