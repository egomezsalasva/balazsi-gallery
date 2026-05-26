import { Metadata } from "next";
import {
  fetchMediaLibrary,
  MediaLibraryContentfulType,
} from "./utils/fetchMediaLibrary";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Media Library | Balazsi Gallery",
  description: "Media Library | Balazsi Gallery",
};

const MediaLibrarySection = ({
  mediaDataList,
  title,
}: {
  mediaDataList: MediaLibraryContentfulType[];
  title: string;
}) => {
  if (!mediaDataList || mediaDataList.length === 0) return null;
  return (
    <div className={styles.mediaSectionContainer}>
      <h2 className={styles.mediaSectionTitle}>{title}</h2>
      <div className={styles.mediaContainerWrapper}>
        {mediaDataList.map((item) => (
          <div key={item.title} className={styles.mediaContainer}>
            <iframe
              key={item.vimeoId}
              src={`https://player.vimeo.com/video/${item.vimeoId}`}
              allow="fullscreen"
              className={styles.media}
            />
            <h3>{item.title}</h3>
            <p>{item.summaryText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default async function MediaLibrary() {
  const mediaLibrary = await fetchMediaLibrary();
  return (
    <div className={styles.container}>
      <MediaLibrarySection
        title="In the Gallery"
        mediaDataList={mediaLibrary.filter(
          (item) => item.category === "Gallery",
        )}
      />
      <MediaLibrarySection
        title="In Detail"
        mediaDataList={mediaLibrary.filter(
          (item) => item.category === "Detail",
        )}
      />
      <MediaLibrarySection
        title="In the Studio"
        mediaDataList={mediaLibrary.filter(
          (item) => item.category === "Studio",
        )}
      />
      <MediaLibrarySection
        title="In Conversation"
        mediaDataList={mediaLibrary.filter(
          (item) => item.category === "Conversation",
        )}
      />
    </div>
  );
}
