"use client";
import { useState } from "react";
import SlideshowIndicator from "@/components/slideshows/SlideshowIndicator";
import {
  HomeFairsContentfulType,
  HomeExhibitionsContentfulType,
} from "./utils/fetchHeroData";
import styles from "./HomeHero.module.css";
import { artistNameDisplay } from "../exhibitions/utils/artistNameDisplay";
import { formatDate } from "@/utils/formatDate";

type HomeHeroData = {
  exhibitions: HomeExhibitionsContentfulType[];
  fairs: HomeFairsContentfulType[];
};

const HomeHero = ({ heroData }: { heroData: HomeHeroData }) => {
  const numExhibitions = 2;
  const today = new Date();
  const mergedData = [...heroData.exhibitions, ...heroData.fairs].sort(
    (a, b) => {
      const aStartDate = new Date(a.startDate);
      const bStartDate = new Date(b.startDate);
      const aIsCurrent = aStartDate <= today;
      const bIsCurrent = bStartDate <= today;
      // If one is current and the other is upcoming, current comes first
      if (aIsCurrent && !bIsCurrent) return -1;
      if (!aIsCurrent && bIsCurrent) return 1;
      // Both are current: show the one ending soonest first
      if (aIsCurrent && bIsCurrent) {
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      }
      // Both are upcoming: show the one starting soonest first
      return aStartDate.getTime() - bStartDate.getTime();
    },
  );
  const numItems = mergedData.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const onPreviousClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(numItems - 1);
    }
  };
  const onNextClick = () => {
    if (currentIndex < numItems - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const isExhibition = "artistsCollection" in mergedData[currentIndex];
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
  const statusLabel = getStatusLabel(
    mergedData[currentIndex].startDate,
    mergedData[currentIndex].endDate,
    isExhibition ? "exhibition" : "fair",
  );

  return (
    <div className={styles.container}>
      <div
        className={styles.imageContainer}
        style={{
          backgroundImage: `url(${mergedData[currentIndex].heroImage.url})`,
        }}
      >
        <div className={styles.detailsContainer}>
          <div className={styles.detailsBox}>
            <div className={styles.detailsLabel}>{statusLabel}</div>
            <div className={styles.detailsTitleContainer}>
              {isExhibition && <div className={styles.detailsDash} />}
              <div>
                <h3 className={styles.detailsTitle}>
                  {mergedData[currentIndex].title}
                </h3>
                <h3 className={styles.detailsArtist}>
                  {"artistsCollection" in mergedData[currentIndex]
                    ? artistNameDisplay(
                        (
                          mergedData[
                            currentIndex
                          ] as HomeExhibitionsContentfulType
                        ).artistsCollection.items,
                      )
                    : ""}
                </h3>
              </div>
            </div>
            <div className={styles.detailsDate}>
              {formatDate(mergedData[currentIndex].startDate)} —{" "}
              {formatDate(mergedData[currentIndex].endDate)}
            </div>
          </div>
        </div>
        {numExhibitions > 1 && (
          <SlideshowIndicator
            numItems={numItems}
            currentIndex={currentIndex}
            onPreviousClick={onPreviousClick}
            onNextClick={onNextClick}
            classNameIndicator={styles.indicatorContainer}
            classNameArrows={styles.arrowsContainer}
          />
        )}
      </div>
    </div>
  );
};

export default HomeHero;
