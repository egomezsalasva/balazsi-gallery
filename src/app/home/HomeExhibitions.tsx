import Image from "next/image";
import HomeSectionLayout from "./components/HomeSectionLayout";
import HomeSlideshowLayout from "./components/HomeSlideshowLayout";
import DateLabel from "@/components/DateLabel";
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

const HomeExhibitions = () => {
  const numExhibitions = 3;
  return (
    <HomeSectionLayout
      title="Exhibitions"
      linkHref="/exhibitions/current"
      styleContainer={{ paddingTop: "5rem" }}
    >
      <HomeSlideshowLayout numItems={numExhibitions}>
        <div className={styles.exhibitionsSlideshowLeftContainer}>
          <SlideshowItem
            img={{ src: "/gallery.jpg", alt: "Cynic's Bedtime" }}
            status="Current"
            title="Cynic's Bedtime"
            artist="Jack Burton"
            dates={{ startDate: "20:09:2025", endDate: "21:11:2025" }}
          />
        </div>
        <div className={styles.exhibitionsSlideshowRightContainer}>
          <SlideshowItem
            img={{
              src: "/shoreline-group-show.jpg",
              alt: "Shoreline Group Show",
            }}
            status="Past"
            title="Shoreline"
            artist="Group Show"
            dates={{ startDate: "22:05:2025", endDate: "21:11:2025" }}
          />
        </div>
      </HomeSlideshowLayout>
    </HomeSectionLayout>
  );
};

export default HomeExhibitions;
