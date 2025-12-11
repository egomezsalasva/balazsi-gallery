import Image from "next/image";
import HomeSectionLayout from "./components/HomeSectionLayout";
import HomeSlideshowLayout from "./components/HomeSlideshowLayout";
import styles from "./HomeExhibitions.module.css";

type SlideshowItemType = {
  img: {
    src: string;
    alt: string;
  };
  status: "Current" | "Past";
  title: string;
  artist: string;
  date: string;
};

const SlideshowItem = ({
  img,
  status,
  title,
  artist,
  date,
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
        <div>{date}</div>
      </div>
    </>
  );
};

const HomeExhibitions = () => {
  const numExhibitions = 3;
  return (
    <HomeSectionLayout title="Exhibitions" linkHref="/exhibitions/current">
      <HomeSlideshowLayout numItems={numExhibitions}>
        <div className={styles.exhibitionsSlideshowLeftContainer}>
          <SlideshowItem
            img={{ src: "/gallery.jpg", alt: "Cynic's Bedtime" }}
            status="Current"
            title="Cynic's Bedtime"
            artist="Jack Burton"
            date="20.09 - 21.11"
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
            date="25.05 - 21.11"
          />
        </div>
      </HomeSlideshowLayout>
    </HomeSectionLayout>
  );
};

export default HomeExhibitions;
