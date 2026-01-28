import HomeSectionLayout from "./components/HomeSectionLayout";
import styles from "./HomeMedia.module.css";
import { fetchMedia, MediaContentfulType } from "./utils/fetchMedia";

type SlideshowItemType = {
  mediaData: MediaContentfulType;
};

const SlideshowItem = ({ mediaData }: SlideshowItemType) => {
  const { title, vimeoId } = mediaData;
  return (
    <div className={styles.mediaContainer}>
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}`}
        allow="fullscreen"
        className={styles.vimeoContainer}
      />
      <h3>{title}</h3>
    </div>
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
            <SlideshowItem mediaData={media[0]} />
          </div>
          {media[1] && (
            <div className={styles.newsSlideshowCenterContainer}>
              <SlideshowItem mediaData={media[1]} />
            </div>
          )}
          {media[2] && (
            <div className={styles.newsSlideshowRightContainer}>
              <SlideshowItem mediaData={media[2]} />
            </div>
          )}
        </div>
      </div>
    </HomeSectionLayout>
  );
};

export default HomeMedia;
