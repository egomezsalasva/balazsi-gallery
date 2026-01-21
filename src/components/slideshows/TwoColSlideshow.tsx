"use client";
import Image from "next/image";
import DateLabel from "../DateLabel";
import ReadMoreBtn from "../ReadMoreBtn";
import styles from "./TwoColSlideshow.module.css";
import SlideshowLayout from "./SlideshowLayout";
import useSlideshowAnimation from "./utils/useSlideshowAnimation";
import Link from "next/link";

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
  withStatus?: boolean;
};

type SlideshowItemProps = {
  exhibition: slideshowItemType;
};

const SlideshowItem = ({ exhibition }: SlideshowItemProps) => {
  return (
    <Link
      href={`/exhibition/${exhibition.slug}`}
      className={styles.exhibitionLink}
    >
      <Image
        src={exhibition.heroImage.url}
        alt={exhibition.heroImage.title}
        width={1000}
        height={1000}
        className={styles.exhibitionImage}
      />
      <h3 className={`slideshowTitle ${styles.slideTitle}`}>
        {exhibition.title}
      </h3>
      <DateLabel
        startDate={exhibition.startDate}
        endDate={exhibition.endDate}
      />
      <div className={styles.readMoreBtnContainer}>
        <Link
          href={`/exhibition/${exhibition.slug}`}
          className={styles.readMoreBtn}
        >
          View Exhibition +
        </Link>
      </div>
    </Link>
  );
};

type SlideshowContentProps = {
  slideshowItems: slideshowItemType[];
  colNumber: number;
  className: string;
};

const SlideshowContent = ({
  slideshowItems,
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
    if (colNumber === 2) {
      return index === 0 ? styles.exhibition_left : styles.exhibition_right;
    } else if (colNumber === 1) {
      return styles.exhibition_full;
    }
    return styles.exhibition_left;
  };

  return (
    <div className={className}>
      <h2 className={styles.title}>Exhibitions</h2>
      <SlideshowLayout
        numItems={numSlides}
        currentIndex={currentIndex}
        onPreviousClick={() => gotoSlide(-1)}
        onNextClick={() => gotoSlide(1)}
        indicatorPreviousRef={indicatorPreviousRef}
        indicatorNextRef={indicatorNextRef}
        indicator={slideshowItems.length > colNumber}
      >
        {dataListGroups.map((pair, slideIndex) => (
          <div
            key={`slide-${slideIndex}`}
            ref={(el) => {
              slidesRef.current[slideIndex] = el;
            }}
            className={styles.exhibitionsSlideshowDisplayContainer}
          >
            {pair.map((exhibition, index) => (
              <div key={exhibition.title + index} className={colStyles(index)}>
                <SlideshowItem exhibition={exhibition} />
              </div>
            ))}
          </div>
        ))}
      </SlideshowLayout>
    </div>
  );
};

const TwoColSlideshow = ({ slideshowItems }: TwoColSlideshowProps) => {
  return (
    <div className={styles.container}>
      <SlideshowContent
        slideshowItems={slideshowItems}
        colNumber={2}
        className={styles.twoColumnSlideshow}
      />
      <SlideshowContent
        slideshowItems={slideshowItems}
        colNumber={1}
        className={styles.oneColumnSlideshow}
      />
    </div>
  );
};

export default TwoColSlideshow;
