"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import HomeSectionLayout from "./components/HomeSectionLayout";
import DateLabel from "@/components/DateLabel";
import { HomeExhibitionsContentfulType } from "./utils/fetchHomeExhibitions";
import { artistNameDisplay } from "../exhibitions/utils/artistNameDisplay";
import HomeSlideshowLayout from "./components/HomeSlideshowLayout";
import {
  animateIndicator,
  initializeIndicatorAnimation,
} from "./utils/animateIndicator";
import {
  animateSlides,
  initializeSlidesAnimation,
} from "./utils/animateSlides";
import styles from "./HomeExhibitions.module.css";

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

const HomeExhibitions = ({
  exhibitions,
}: {
  exhibitions: HomeExhibitionsContentfulType[];
}) => {
  const numExhibitions = exhibitions?.length || 0;
  const numSlides = Math.ceil(numExhibitions / 2);

  const [currentIndex, setCurrentIndex] = useState(0);
  const isTweeningRef = useRef(false);
  const EASE = "sine.inOut";
  const DURATION = 1;
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const indicatorPreviousRef = useRef<HTMLDivElement>(null);
  const indicatorNextRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    initializeSlidesAnimation({ slidesRef, EASE });
    initializeIndicatorAnimation({ indicatorPreviousRef, indicatorNextRef });
  }, []);

  const gotoSlide = (direction: 1 | -1) => {
    if (isTweeningRef.current || numSlides <= 1) return;

    isTweeningRef.current = true;

    let nextIndex: number;
    if (slidesRef.current[currentIndex + direction]) {
      nextIndex = currentIndex + direction;
    } else {
      nextIndex = direction > 0 ? 0 : numSlides - 1;
    }
    animateIndicator({
      currentIndex,
      nextIndex,
      numSlides,
      indicatorPreviousRef,
      indicatorNextRef,
      DURATION,
      EASE,
    });
    animateSlides({
      currentIndex,
      nextIndex,
      slidesRef,
      DURATION,
      EASE,
      direction,
      isTweeningRef,
    });
    setCurrentIndex(nextIndex);
  };

  const exhibitionPairs = [];
  for (let i = 0; i < exhibitions.length; i += 2) {
    exhibitionPairs.push(exhibitions.slice(i, i + 2));
  }

  return (
    <HomeSectionLayout
      title="Exhibitions"
      linkHref="/exhibitions/current"
      styleContainer={{ paddingTop: "5rem" }}
    >
      <HomeSlideshowLayout
        numItems={numSlides}
        currentIndex={currentIndex}
        onPreviousClick={() => gotoSlide(-1)}
        onNextClick={() => gotoSlide(1)}
        indicatorPreviousRef={indicatorPreviousRef}
        indicatorNextRef={indicatorNextRef}
      >
        {exhibitionPairs.map((pair, slideIndex) => (
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
                  index === 0
                    ? styles.exhibitionsSlideshowLeftContainer
                    : styles.exhibitionsSlideshowRightContainer
                }
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
              </div>
            ))}
          </div>
        ))}
      </HomeSlideshowLayout>
    </HomeSectionLayout>
  );
};

export default HomeExhibitions;
