"use client";
import Image from "next/image";
import HomeSectionLayout from "./components/HomeSectionLayout";
import HomeSlideshowLayout from "./components/HomeSlideshowLayout";
import DateLabel from "@/components/DateLabel";
import styles from "./HomeExhibitions.module.css";
import { HomeExhibitionsContentfulType } from "./utils/fetchHomeExhibitions";
import { artistNameDisplay } from "../exhibitions/utils/artistNameDisplay";
import { useEffect, useState } from "react";

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
  const [currentIndicatorIndex, setCurrentIndicatorIndex] = useState(0);
  const [currentLeftExhibitionIndex, setCurrentLeftExhibitionIndex] =
    useState(0);
  const [currentRightExhibitionIndex, setCurrentRightExhibitionIndex] =
    useState(1);
  const onPreviousClick = () => {
    if (currentLeftExhibitionIndex > 0) {
      setCurrentLeftExhibitionIndex(currentLeftExhibitionIndex - 2);
      setCurrentRightExhibitionIndex(currentRightExhibitionIndex - 2);
    } else {
      setCurrentLeftExhibitionIndex(numExhibitions - 2);
      setCurrentRightExhibitionIndex(numExhibitions - 2);
    }
  };
  const onNextClick = () => {
    if (currentRightExhibitionIndex < numExhibitions - 2) {
      setCurrentLeftExhibitionIndex(currentLeftExhibitionIndex + 2);
      setCurrentRightExhibitionIndex(currentRightExhibitionIndex + 2);
    } else {
      setCurrentLeftExhibitionIndex(0);
      setCurrentRightExhibitionIndex(1);
    }
  };
  useEffect(() => {
    setCurrentIndicatorIndex(currentLeftExhibitionIndex / 2);
  }, [currentLeftExhibitionIndex]);

  return (
    <HomeSectionLayout
      title="Exhibitions"
      linkHref="/exhibitions/current"
      styleContainer={{ paddingTop: "5rem" }}
    >
      <HomeSlideshowLayout
        numItems={Math.ceil(numExhibitions / 2)}
        currentIndex={currentIndicatorIndex}
        onPreviousClick={onPreviousClick}
        onNextClick={onNextClick}
      >
        <div className={styles.exhibitionsSlideshowLeftContainer}>
          <SlideshowItem
            img={{
              src: exhibitions[currentLeftExhibitionIndex].heroImage.url,
              alt: exhibitions[currentLeftExhibitionIndex].title,
            }}
            status={getExhibitionStatus(
              exhibitions[currentLeftExhibitionIndex].startDate,
              exhibitions[currentLeftExhibitionIndex].endDate,
            )}
            title={exhibitions[currentLeftExhibitionIndex].title}
            artist={artistNameDisplay(
              exhibitions[currentLeftExhibitionIndex].artistsCollection.items,
            )}
            dates={{
              startDate: exhibitions[currentLeftExhibitionIndex].startDate,
              endDate: exhibitions[currentLeftExhibitionIndex].endDate,
            }}
          />
        </div>
        <div className={styles.exhibitionsSlideshowRightContainer}>
          <SlideshowItem
            img={{
              src: exhibitions[currentRightExhibitionIndex].heroImage.url,
              alt: exhibitions[currentRightExhibitionIndex].title,
            }}
            status={getExhibitionStatus(
              exhibitions[currentRightExhibitionIndex].startDate,
              exhibitions[currentRightExhibitionIndex].endDate,
            )}
            title={exhibitions[currentRightExhibitionIndex].title}
            artist={artistNameDisplay(
              exhibitions[currentRightExhibitionIndex].artistsCollection.items,
            )}
            dates={{
              startDate: exhibitions[currentRightExhibitionIndex].startDate,
              endDate: exhibitions[currentRightExhibitionIndex].endDate,
            }}
          />
        </div>
      </HomeSlideshowLayout>
    </HomeSectionLayout>
  );
};

export default HomeExhibitions;
