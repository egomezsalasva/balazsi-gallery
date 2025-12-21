import styles from "./WorksSection.module.css";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import ReadMoreBtn from "../ReadMoreBtn";

export type WorkType = {
  slug: string;
  title: string;
  details: string;
  workImagesCollection: {
    items: {
      url: string;
      title: string;
    }[];
  };
  enquire: boolean;
};

type WorkProps = {
  work: WorkType;
};

type WorksSectionProps = {
  works: WorkType[];
};

const Work = ({ work }: WorkProps) => {
  const { title, details, workImagesCollection, enquire } = work;
  return (
    <div className={styles.workContainer}>
      <div className={styles.workImageContainer}>
        <Image
          src={workImagesCollection.items[0].url}
          alt={workImagesCollection.items[0].title}
          width={1000}
          height={1000}
          className={styles.image}
        />
        <div className={styles.workDetailsContainer}>
          <h3 className={styles.workTitle}>{title}</h3>
          <div className={styles.workDescription}>
            <ReactMarkdown>{details}</ReactMarkdown>
          </div>
          {enquire && (
            <div className={styles.workEnquireBtnContainer}>
              <ReadMoreBtn href={`/`} title="Enquire" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WorksSection = ({ works }: WorksSectionProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Works</h2>
      <div className={styles.worksContainer}>
        {works.map((work: WorkType) => (
          <Work key={work.slug} work={work} />
        ))}
      </div>
    </div>
  );
};

export default WorksSection;
