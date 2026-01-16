"use client";
import HomeSectionLayout from "./components/HomeSectionLayout";
import { HomeNewsContentfulType } from "./utils/fetchHomeNews";
import NewsSlideshow from "./components/NewsSlideshow";
import styles from "./HomeNews.module.css";

type HomeNewsProps = {
  news: HomeNewsContentfulType[];
};

const HomeNews = ({ news }: HomeNewsProps) => {
  return (
    <HomeSectionLayout title="News" linkHref="/news">
      <NewsSlideshow
        news={news}
        colNumber={3}
        className={styles.threeColumnSlideshow}
      />
      <NewsSlideshow
        news={news}
        colNumber={2}
        className={styles.twoColumnSlideshow}
      />
      <NewsSlideshow
        news={news}
        colNumber={1}
        className={styles.oneColumnSlideshow}
      />
    </HomeSectionLayout>
  );
};

export default HomeNews;
