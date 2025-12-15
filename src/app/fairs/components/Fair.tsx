import Image from "next/image";
import ReadMoreBtn from "@/components/ReadMoreBtn";
import styles from "./Fair.module.css";
import DateLabel from "@/components/DateLabel";
import { FairContentfulType } from "../utils/fetchFairs";
import ReactMarkdown from "react-markdown";

type FairProps = {
  fair: FairContentfulType;
};

const Fair = ({ fair }: FairProps) => {
  const { title, heroImage, startDate, endDate, summaryText } = fair;
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <DateLabel startDate={startDate} endDate={endDate} withMargin />
        <div className={styles.description}>
          <ReactMarkdown>{summaryText}</ReactMarkdown>
        </div>
        <ReadMoreBtn href={`/fairs`} />
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

export default Fair;
