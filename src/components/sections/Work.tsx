"use client";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import WorkModal from "./WorkModal";
import useWorkModal from "./useWorkModal";
import WorkEnquireMobileModal from "./WorkEnquireMobileModal";
import Arrow from "../Arrow";
import styles from "./WorksSection.module.css";

export type WorkType = {
  slug: string;
  title: string;
  details: string;
  artist: {
    name: string;
  };
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
    enquireMobileOpen,
    handleWorkDetailOpen,
    handleWorkDetailClose,
    handleEnquireOpen,
    handleEnquireClose,
    handleEnquireMobileOpen,
    handleEnquireMobileClose,
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
                Enquire <Arrow className={styles.workEnquireArrow} />
              </button>
              <button
                className={styles.workEnquireBtnMobile}
                onClick={handleEnquireMobileOpen}
              >
                Enquire <Arrow className={styles.workEnquireArrow} />
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
      <WorkEnquireMobileModal
        work={work}
        enquireMobileOpen={enquireMobileOpen}
        handleEnquireMobileClose={handleEnquireMobileClose}
      />
    </div>
  );
};

export default Work;
