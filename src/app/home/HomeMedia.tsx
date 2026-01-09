import Image from "next/image";
import HomeSectionLayout from "./components/HomeSectionLayout";
import HomeSlideshowLayout from "./components/HomeSlideshowLayout";
import styles from "./HomeMedia.module.css";
import { fetchMedia, MediaContentfulType } from "./utils/fetchMedia";

const SlideshowItem = ({ vimeoId }: MediaContentfulType) => {
  return (
    <>
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}`}
        allow="fullscreen"
        className={styles.vimeoContainer}
      />
    </>
  );
};

const HomeMedia = async () => {
  const media = await fetchMedia();
  if (!media || media.length === 0) return null;
  return (
    <HomeSectionLayout title="Media Library" linkHref="/media-library">
      <div className={styles.newsContainer}>
        <div className={styles.newsContentContainer}>
          <div className={styles.newsSlideshowLeftContainer}>
            <SlideshowItem vimeoId={media[0].vimeoId} />
          </div>
          {media[1] && (
            <div className={styles.newsSlideshowCenterContainer}>
              <SlideshowItem vimeoId={media[1].vimeoId} />
            </div>
          )}
          {media[2] && (
            <div className={styles.newsSlideshowRightContainer}>
              <SlideshowItem vimeoId={media[2].vimeoId} />
            </div>
          )}
        </div>
      </div>
    </HomeSectionLayout>
  );
};

export default HomeMedia;
