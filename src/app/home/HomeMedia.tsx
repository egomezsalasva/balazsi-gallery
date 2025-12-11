import Image from "next/image";
import HomeSectionLayout from "./components/HomeSectionLayout";
import HomeSlideshowLayout from "./components/HomeSlideshowLayout";
import styles from "./HomeMedia.module.css";

type SlideshowItemType = {
  src: string;
};

const SlideshowItem = ({ src }: SlideshowItemType) => {
  return (
    <>
      <video
        src={src}
        muted
        playsInline
        controls={true}
        className={styles.slideshowImage}
      />
    </>
  );
};

const HomeMedia = () => {
  const numNews = 3;
  return (
    <HomeSectionLayout title="Media Library" linkHref="/media-library">
      <HomeSlideshowLayout
        numItems={numNews}
        indicator={numNews <= 3 ? false : true}
        styleContainer={{ paddingBottom: "1.5rem" }}
      >
        <div className={styles.newsSlideshowLeftContainer}>
          <SlideshowItem src="/web-opening.mp4" />
        </div>
        <div className={styles.newsSlideshowCenterContainer}>
          <SlideshowItem src="/web-opening.mp4" />
        </div>
        <div className={styles.newsSlideshowRightContainer}>
          <SlideshowItem src="/web-opening.mp4" />
        </div>
      </HomeSlideshowLayout>
    </HomeSectionLayout>
  );
};

export default HomeMedia;
