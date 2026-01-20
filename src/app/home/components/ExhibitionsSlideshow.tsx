"use client";
import Image from "next/image";
import DateLabel from "@/components/DateLabel";
import { HomeExhibitionsContentfulType } from "../utils/fetchHomeExhibitions";
import { artistNameDisplay } from "../../exhibitions/utils/artistNameDisplay";
import HomeSlideshowLayout from "./HomeSlideshowLayout";
import useSlideshowAnimation from "@/components/slideshows/utils/useSlideshowAnimation";
import { useSwipeGesture } from "../../../components/slideshows/utils/useSwipeGesture";
import styles from "../HomeExhibitions.module.css";
import Link from "next/link";

type SlideshowItemType = {
  img: {
    src: string;
    alt: string;
  };
  status: "Current" | "Past";
  title: string;
  artist: string;
  dates: {
    startDate: string;
    endDate: string;
  };
};

const SlideshowItem = ({
  img,
  status,
  title,
  artist,
  dates,
}: SlideshowItemType) => {
  return (
    <>
      <Image
        src={img.src}
        alt={img.alt}
        width={1200}
        height={1000}
        className={styles.slideshowImage}
        priority
        loading="eager"
      />
      <div>
        <div className={styles.slideshowStatus}>{status}</div>
        <div className={styles.slideshowTitleContainer}>
          <div className={styles.slideshowTitleDash} />
          <div>
            <div className={styles.slideshowTitle}>{title}</div>
            <div>{artist}</div>
          </div>
        </div>
        <DateLabel startDate={dates.startDate} endDate={dates.endDate} />
      </div>
    </>
  );
};

type ExhibitionsSlideshowProps = {
  exhibitions: HomeExhibitionsContentfulType[];
  colNumber: 1 | 2;
  className: string;
};

const ExhibitionsSlideshow = ({
  exhibitions,
  colNumber,
  className,
}: ExhibitionsSlideshowProps) => {
  const {
    numSlides,
    currentIndex,
    gotoSlide,
    dataListGroups,
    slidesRef,
    indicatorPreviousRef,
    indicatorNextRef,
  } = useSlideshowAnimation<HomeExhibitionsContentfulType>({
    slideshowColNumber: colNumber,
    dataList: exhibitions,
  });

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipeGesture(
    () => gotoSlide(1),
    () => gotoSlide(-1),
  );

  const getExhibitionStatus = (startDate: string, endDate: string) => {
    if (
      startDate <= new Date().toISOString() &&
      endDate >= new Date().toISOString()
    ) {
      return "Current";
    } else {
      return "Past";
    }
  };

  const getColStyles = (index: number) => {
    if (colNumber === 1) return styles.exhibitionsSlideshowLeftContainer;
    return index === 0
      ? styles.exhibitionsSlideshowLeftContainer
      : styles.exhibitionsSlideshowRightContainer;
  };

  return (
    <div className={className}>
      <HomeSlideshowLayout
        numItems={numSlides}
        currentIndex={currentIndex}
        onPreviousClick={() => gotoSlide(-1)}
        onNextClick={() => gotoSlide(1)}
        indicatorPreviousRef={indicatorPreviousRef}
        indicatorNextRef={indicatorNextRef}
      >
        {dataListGroups.map((pair, slideIndex) => (
          <div
            key={`slide-${slideIndex}`}
            ref={(el) => {
              slidesRef.current[slideIndex] = el;
            }}
            className={styles.exhibitionsSlideshowDisplayContainer}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {pair.map((exhibition, index) => (
              <Link
                href={`/exhibition/${exhibition.slug}`}
                key={exhibition.title + index}
                className={getColStyles(index)}
              >
                <SlideshowItem
                  img={{
                    src: exhibition.heroImage.url,
                    alt: exhibition.title,
                  }}
                  status={getExhibitionStatus(
                    exhibition.startDate,
                    exhibition.endDate,
                  )}
                  title={exhibition.title}
                  artist={artistNameDisplay(exhibition.artistsCollection.items)}
                  dates={{
                    startDate: exhibition.startDate,
                    endDate: exhibition.endDate,
                  }}
                />
              </Link>
            ))}
          </div>
        ))}
      </HomeSlideshowLayout>
    </div>
  );
};

export default ExhibitionsSlideshow;
