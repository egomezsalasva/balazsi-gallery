import { Metadata } from "next";
import styles from "./page.module.css";
import NewsItem from "./components/NewsItem";
import { fetchNews, NewsContentfulType } from "./utils/fetchNews";

export const metadata: Metadata = {
  title: "News | Balazsi Gallery",
  description: "News | Balazsi Gallery",
};

export default async function News() {
  const news = await fetchNews();
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.soloArtistTitle}>News</h2>
      </div>
      <div className={styles.eventSectionContainer}>
        {news.map((newsItem: NewsContentfulType) => (
          <NewsItem key={newsItem.title} newsItem={newsItem} />
        ))}
      </div>
    </div>
  );
}
