import Image from "next/image";
import DateLabel from "@/components/DateLabel";
import ReadMoreBtn from "@/components/ReadMoreBtn";
import { NewsPressContentfulType } from "../utils/fetchPress";
import ReactMarkdown from "react-markdown";
import styles from "./NewsItem.module.css";

type NewsPressItemProps = {
  newsPressItem: NewsPressContentfulType;
};

const NewsPressItem = ({ newsPressItem }: NewsPressItemProps) => {
  const { title, source, author, heroImage, startDate, summaryText, url } =
    newsPressItem;
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsContainerSticky}>
          <div className={styles.detailsArtistContainer}>
            <h3>{title}</h3>
          </div>
          <DateLabel startDate={startDate} withMargin />
          {(source || author) && (
            <div className={styles.labelsContainer}>
              {source && <p>Source: {source}</p>}
              {author && <p>Author: {author}</p>}
            </div>
          )}
          <div className={styles.description}>
            <ReactMarkdown>{summaryText}</ReactMarkdown>
          </div>
          <ReadMoreBtn href={url} target="_blank" />
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

export default NewsPressItem;
