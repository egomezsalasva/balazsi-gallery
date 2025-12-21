"use client";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import styles from "./WorksSection.module.css";
import WorkModal from "./WorkModal";
import useWorkModal from "./useWorkModal";

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

const Work = ({ work }: WorkProps) => {
  const { title, details, workImagesCollection, enquire } = work;
  const {
    workDetailOpen,
    enquireOpen,
    handleWorkDetailOpen,
    handleWorkDetailClose,
    handleEnquireOpen,
    handleEnquireClose,
  } = useWorkModal();

  return (
    <div className={styles.workContainer}>
      <div className={styles.workImageContainer} onClick={handleWorkDetailOpen}>
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
              <button
                className={styles.workEnquireBtn}
                onClick={handleEnquireOpen}
              >
                Enquire
              </button>
            </div>
          )}
        </div>
      </div>
      <WorkModal
        work={work}
        workDetailOpen={workDetailOpen}
        enquireOpen={enquireOpen}
        handleWorkDetailClose={handleWorkDetailClose}
        handleEnquireOpen={handleEnquireOpen}
        handleEnquireClose={handleEnquireClose}
      />
    </div>
  );
};

export default Work;
