import Image from "next/image";
import DateLabel from "@/components/DateLabel";
import ReadMoreBtn from "@/components/ReadMoreBtn";
import styles from "./NewsItem.module.css";
import { NewsContentfulType } from "../utils/fetchNews";

type NewsItemProps = {
  newsItem: NewsContentfulType;
};

const NewsItem = ({ newsItem }: NewsItemProps) => {
  const { title, heroImage, startDate, endDate, summaryText } = newsItem;
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsContainerSticky}>
          <div className={styles.detailsArtistContainer}>
            <h3>{title}</h3>
          </div>
          <DateLabel
            startDate={startDate}
            endDate={endDate ? endDate : undefined}
            withMargin
          />
          <p className={styles.description}>{summaryText}</p>
          <ReadMoreBtn href={`/`} />
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={heroImage ? heroImage.url : "/fallback.png"}
          alt={heroImage ? heroImage.title : "News Image"}
          width={1000}
          height={1000}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default NewsItem;
