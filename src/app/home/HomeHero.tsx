"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SlideshowIndicator from "@/components/slideshows/SlideshowIndicator";
import {
  HomeFairsContentfulType,
  HomeExhibitionsContentfulType,
} from "./utils/fetchHeroData";
import styles from "./HomeHero.module.css";
import { artistNameDisplay } from "../exhibitions/utils/artistNameDisplay";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import useSlideshowAnimation from "@/components/slideshows/utils/useSlideshowAnimation";
import Link from "next/link";

type HomeHeroData = {
  exhibitions: HomeExhibitionsContentfulType[];
  fairs: HomeFairsContentfulType[];
};

const HomeHero = ({ heroData }: { heroData: HomeHeroData }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const today = new Date();
  const mergedData = [...heroData.exhibitions, ...heroData.fairs].sort(
    (a, b) => {
      const aStartDate = new Date(a.startDate);
      const bStartDate = new Date(b.startDate);
      const aIsCurrent = aStartDate <= today;
      const bIsCurrent = bStartDate <= today;
      if (aIsCurrent && !bIsCurrent) return -1;
      if (!aIsCurrent && bIsCurrent) return 1;
      if (aIsCurrent && bIsCurrent) {
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      }
      return aStartDate.getTime() - bStartDate.getTime();
    },
  );

  const {
    numSlides,
    currentIndex,
    gotoSlide,
    dataListGroups,
    slidesRef,
    indicatorPreviousRef,
    indicatorNextRef,
  } = useSlideshowAnimation<
    HomeFairsContentfulType | HomeExhibitionsContentfulType
  >({
    slideshowColNumber: 1,
    dataList: mergedData,
  });

  const detailsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dashRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleSlideChange = (direction: 1 | -1) => {
    const currentDetails = detailsRef.current[currentIndex];

    let nextIndex: number;

    if (slidesRef.current[currentIndex + direction]) {
      nextIndex = currentIndex + direction;
    } else {
      nextIndex = direction > 0 ? 0 : numSlides - 1;
    }

    const nextDetails = detailsRef.current[nextIndex];
    const nextDash = dashRef.current[nextIndex];

    const SLIDES_DURATION = 1.25;
    const FADE_DURATION = SLIDES_DURATION / 2;
    const DASH_DURATION = SLIDES_DURATION / 2;

    // Kill any existing animations to prevent conflicts and stuck states
    gsap.killTweensOf(detailsRef.current);
    gsap.killTweensOf(dashRef.current);

    // Immediately set all other details to opacity 0 to prevent stuck text
    detailsRef.current.forEach((detail, index) => {
      if (index !== currentIndex && index !== nextIndex && detail) {
        gsap.set(detail, { opacity: 0 });
      }
    });

    // Fade out current details
    gsap.to(currentDetails, {
      opacity: 0,
      duration: FADE_DURATION,
      ease: "sine.inOut",
    });

    // Fade in next details
    gsap.fromTo(
      nextDetails,
      { opacity: 0 },
      {
        opacity: 1,
        duration: FADE_DURATION,
        delay: SLIDES_DURATION,
        ease: "sine.inOut",
      },
    );

    if (nextDash) {
      gsap.fromTo(
        nextDash,
        { width: 0 },
        {
          width: "1.25rem",
          duration: DASH_DURATION,
          delay: SLIDES_DURATION + DASH_DURATION, // Start after details fade in
          ease: "power2.out",
        },
      );
    }

    gotoSlide(direction);
  };

  const getStatusLabel = (
    startDate: string,
    endDate: string,
    type: "exhibition" | "fair",
  ): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const isCurrent = start <= today && end >= today;
    const typeLabel = type === "exhibition" ? "Exhibition" : "Fair";
    return isCurrent ? `Current ${typeLabel}` : `Upcoming ${typeLabel}`;
  };

  useEffect(() => {
    if (isPlaying) {
      const AUTO_ADVANCE_INTERVAL = 7500;
      intervalRef.current = setInterval(() => {
        handleSlideChange(1);
      }, AUTO_ADVANCE_INTERVAL);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, isPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {dataListGroups.map((group, slideIndex) => {
          const item = group[0];

          return (
            <div
              key={`slide-${slideIndex}`}
              ref={(el) => {
                slidesRef.current[slideIndex] = el;
              }}
              className={styles.slideContainer}
            >
              <Image
                src={item.heroImage.url}
                alt={item.heroImage.title}
                width={1000}
                height={1000}
                className={styles.image}
              />
            </div>
          );
        })}

        {dataListGroups.map((group, slideIndex) => {
          const item = group[0];
          const isExhibition = "artistsCollection" in item;
          const statusLabel = getStatusLabel(
            item.startDate,
            item.endDate,
            isExhibition ? "exhibition" : "fair",
          );

          return (
            <div
              key={`details-${slideIndex}`}
              ref={(el) => {
                detailsRef.current[slideIndex] = el;
              }}
              className={styles.detailsContainer}
              style={{
                opacity: slideIndex === 0 ? 1 : 0,
                pointerEvents: slideIndex === currentIndex ? "auto" : "none",
              }}
            >
              <Link
                href={`/${isExhibition ? "exhibition" : "fair"}/${item.slug}`}
                className={styles.detailsBox}
              >
                <div className={styles.detailsLabel}>{statusLabel}</div>
                <div className={styles.detailsTitleContainer}>
                  {isExhibition && (
                    <div className={styles.detailsDashContainer}>
                      <div
                        ref={(el) => {
                          dashRef.current[slideIndex] = el;
                        }}
                        className={styles.detailsDash}
                        style={{ width: slideIndex === 0 ? "1.25rem" : 0 }}
                      />
                    </div>
                  )}
                  <div className={styles.detailsTextWrapper}>
                    <div className={styles.detailsTextOverflow}>
                      <h3 className={styles.detailsTitle}>{item.title}</h3>
                    </div>
                    <div className={styles.detailsTextOverflow}>
                      <h3 className={styles.detailsArtist}>
                        {"artistsCollection" in item
                          ? artistNameDisplay(
                              (item as HomeExhibitionsContentfulType)
                                .artistsCollection.items,
                            )
                          : ""}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className={styles.detailsDate}>
                  {formatDate(item.startDate)} — {formatDate(item.endDate)}
                </div>
              </Link>
            </div>
          );
        })}

        {numSlides > 1 && (
          <SlideshowIndicator
            numItems={numSlides}
            currentIndex={currentIndex}
            onPreviousClick={() => handleSlideChange(-1)}
            onNextClick={() => handleSlideChange(1)}
            classNameIndicator={styles.indicatorContainer}
            classNameArrows={styles.arrowsContainer}
            indicatorPreviousRef={indicatorPreviousRef}
            indicatorNextRef={indicatorNextRef}
            pausePlayIcon={{
              display: true,
              isPlaying: isPlaying,
              onPlayClick: () => setIsPlaying(true),
              onPauseClick: () => setIsPlaying(false),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HomeHero;
