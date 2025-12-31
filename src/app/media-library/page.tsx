import { Metadata } from "next";
import { fetchMediaLibrary } from "./utils/fetchMediaLibrary";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Media Library | Balazsi Gallery",
  description: "Media Library | Balazsi Gallery",
};

export default async function MediaLibrary() {
  const mediaLibrary = await fetchMediaLibrary();
  return (
    <div className={styles.container}>
      {mediaLibrary.map((item) => (
        <iframe
          key={item.vimeoId}
          src={`https://player.vimeo.com/video/${item.vimeoId}`}
          allow="fullscreen"
          className={styles.media}
        />
      ))}
    </div>
  );
}
