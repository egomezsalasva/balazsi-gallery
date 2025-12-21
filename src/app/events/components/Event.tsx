import Image from "next/image";
import ReactMarkdown from "react-markdown";
import ReadMoreBtn from "@/components/ReadMoreBtn";
import DateLabel from "@/components/DateLabel";
import { EventContentfulType } from "../utils/fetchEvents";
import styles from "./Event.module.css";

type EventProps = {
  event: EventContentfulType;
};

const Event = ({ event }: EventProps) => {
  const { slug, title, heroImage, startDate, endDate, summaryText } = event;
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
          <div className={styles.description}>
            <ReactMarkdown>{summaryText}</ReactMarkdown>
          </div>
          <ReadMoreBtn href={`/events/${slug}`} />
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={heroImage ? heroImage.url : "/fallback.png"}
          alt={heroImage ? heroImage.title : "Event Image"}
          width={1000}
          height={1000}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default Event;
