import Image from "next/image";
import Link from "next/link";
import DateLabel from "@/components/DateLabel";
import ReactMarkdown from "react-markdown";
import { EventContentfulType } from "./utils/fetchEvent";
import styles from "./EventDetails.module.css";

type EventDetailsProps = {
  event: EventContentfulType;
};

const EventDetails = ({ event }: EventDetailsProps) => {
  const { title, heroImage, startDate, endDate, fullText, artistsCollection } =
    event;
  return (
    <div className={styles.contentContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <h1>{title}</h1>
        </div>
        <DateLabel
          startDate={startDate}
          endDate={endDate ? endDate : undefined}
          withMargin
        />
        {artistsCollection.items.length > 0 && (
          <p className={styles.groupShowText}>
            With:{" "}
            {artistsCollection.items.map(
              (artist: { name: string; slug: string }, index: number) => (
                <span key={artist.name}>
                  <Link href={`/artist/${artist.slug}`}>{artist.name}</Link>
                  {index < artistsCollection.items.length - 1 ? ", " : "."}
                </span>
              ),
            )}
          </p>
        )}
        <div className={styles.description}>
          <ReactMarkdown>{fullText}</ReactMarkdown>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={heroImage ? heroImage.url : "/fallback.png"}
          alt={heroImage ? heroImage.title : "Fair Image"}
          width={1000}
          height={1000}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default EventDetails;
