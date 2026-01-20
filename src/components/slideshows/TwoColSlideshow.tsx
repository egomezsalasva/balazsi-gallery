"use client";
import Image from "next/image";
import DateLabel from "../DateLabel";
import ReadMoreBtn from "../ReadMoreBtn";
import styles from "./TwoColSlideshow.module.css";
import SlideshowLayout from "./SlideshowLayout";
import useSlideshowAnimation from "./utils/useSlideshowAnimation";

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
    <div>
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
        <ReadMoreBtn
          href={`/exhibition/${exhibition.slug}`}
          title="View Exhibition +"
        />
      </div>
    </div>
  );
};

const TwoColSlideshow = ({ slideshowItems }: TwoColSlideshowProps) => {
  const SLIDESHOW_ITEM_WIDTH = 2;

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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Exhibitions</h2>
      <SlideshowLayout
        numItems={numSlides}
        currentIndex={currentIndex}
        onPreviousClick={() => gotoSlide(-1)}
        onNextClick={() => gotoSlide(1)}
        indicatorPreviousRef={indicatorPreviousRef}
        indicatorNextRef={indicatorNextRef}
        indicator={slideshowItems.length > SLIDESHOW_ITEM_WIDTH}
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
              <div
                key={exhibition.title + index}
                className={
                  index === 0 ? styles.exhibition_left : styles.exhibition_right
                }
              >
                <SlideshowItem exhibition={exhibition} />
              </div>
            ))}
          </div>
        ))}
      </SlideshowLayout>
    </div>
  );
};

export default TwoColSlideshow;
