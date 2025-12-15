import Image from "next/image";
import DescriptionFade from "./DesctiptionFade";
import ReadMoreBtn from "@/components/ReadMoreBtn";
import DateLabel from "@/components/DateLabel";
import styles from "./Exhibition.module.css";
import { artistNameDisplay } from "../utils/artistNameDisplay";
import { ExhibitionContentfulType } from "../utils/fetchExhibitions";
import ReactMarkdown from "react-markdown";

type ExhibitionProps = {
  exhibition: ExhibitionContentfulType;
};

const Exhibition = ({ exhibition }: ExhibitionProps) => {
  const {
    url,
    heroImage,
    title,
    startDate,
    endDate,
    hideEndDate,
    summaryText,
    artistsCollection,
  } = exhibition;
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.titleDash} />
          <div>
            <h2>{title}</h2>
            <h3>{artistNameDisplay(artistsCollection.items)}</h3>
          </div>
        </div>
        <DateLabel
          startDate={startDate}
          endDate={hideEndDate ? undefined : endDate}
          withMargin
        />
        <DescriptionFade>
          <ReactMarkdown>{summaryText}</ReactMarkdown>
        </DescriptionFade>
        <ReadMoreBtn href={`/exhibition/${url}`} title="View Exhibition +" />
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={heroImage ? heroImage?.url : "/fallback.png"}
          alt={heroImage ? heroImage?.title : "Exhibition Image"}
          width={1000}
          height={1000}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default Exhibition;
