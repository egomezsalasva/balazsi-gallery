import Image from "next/image";
import useSlideshowAnimation from "@/components/slideshows/utils/useSlideshowAnimation";
import { HomeNewsContentfulType } from "../utils/fetchHomeNews";
import HomeSlideshowLayout from "./HomeSlideshowLayout";
import { useSwipeGesture } from "@/components/slideshows/utils/useSwipeGesture";
import styles from "../HomeNews.module.css";

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

type NewsSlideshowProps = {
  news: HomeNewsContentfulType[];
  colNumber: 1 | 2 | 3;
  className: string;
};

const NewsSlideshow = ({ news, colNumber, className }: NewsSlideshowProps) => {
  const {
    numSlides,
    currentIndex,
    gotoSlide,
    dataListGroups,
    slidesRef,
    indicatorPreviousRef,
    indicatorNextRef,
  } = useSlideshowAnimation<HomeNewsContentfulType>({
    slideshowColNumber: colNumber,
    dataList: news,
  });

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipeGesture(
    () => gotoSlide(1),
    () => gotoSlide(-1),
  );

  const getColStyles = (index: number) => {
    if (colNumber === 1) return styles.newsSlideshowLeftContainer;
    if (colNumber === 2) {
      return index === 0
        ? styles.newsSlideshowLeftContainer
        : styles.newsSlideshowCenterContainer;
    }
    return index === 0
      ? styles.newsSlideshowLeftContainer
      : index === 1
        ? styles.newsSlideshowCenterContainer
        : styles.newsSlideshowRightContainer;
  };

  return (
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
              <div key={item.title + index} className={getColStyles(index)}>
                <SlideshowItem
                  img={{ src: item.heroImage.url, alt: item.title }}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        ))}
      </HomeSlideshowLayout>
    </div>
  );
};

export default NewsSlideshow;
