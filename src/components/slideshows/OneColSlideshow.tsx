"use client";
import Image from "next/image";
import SlideshowIndicator from "./SlideshowIndicator";
import { NewsPostContentfulType } from "@/app/news/[slug]/utils/fetchNewsPost";
import useSlideshowAnimation from "./utils/useSlideshowAnimation";
import { useSwipeGesture } from "./utils/useSwipeGesture";
import styles from "./OneColSlideshow.module.css";

type OneColSlideshowProps = {
  additionalImages: NewsPostContentfulType["additionalImagesCollection"]["items"];
};

const OneColSlideshow = ({ additionalImages }: OneColSlideshowProps) => {
  const SLIDESHOW_ITEM_WIDTH = 1;

  const {
    numSlides,
    currentIndex,
    gotoSlide,
    dataListGroups,
    slidesRef,
    indicatorPreviousRef,
    indicatorNextRef,
  } = useSlideshowAnimation<
    NewsPostContentfulType["additionalImagesCollection"]["items"][0]
  >({
    slideshowColNumber: SLIDESHOW_ITEM_WIDTH,
    dataList: additionalImages,
  });

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipeGesture(
    () => gotoSlide(1),
    () => gotoSlide(-1),
  );

  return (
    <div
      className={styles.additionalImagesContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.slideshowWrapper}>
        {dataListGroups.map((group, slideIndex) => (
          <div
            key={`slide-${slideIndex}`}
            ref={(el) => {
              slidesRef.current[slideIndex] = el;
            }}
            className={styles.slideshowDisplayContainer}
          >
            {group.map((image) => (
              <Image
                key={image.url}
                src={image.url}
                alt={image.title}
                width={1000}
                height={1000}
                className={styles.additionalImage}
              />
            ))}
          </div>
        ))}
      </div>
      <SlideshowIndicator
        numItems={numSlides}
        classNameIndicator={styles.indicator}
        classNameArrows={styles.arrows}
        onPreviousClick={() => gotoSlide(-1)}
        onNextClick={() => gotoSlide(1)}
        currentIndex={currentIndex}
        indicatorPreviousRef={indicatorPreviousRef}
        indicatorNextRef={indicatorNextRef}
      />
    </div>
  );
};

export default OneColSlideshow;
