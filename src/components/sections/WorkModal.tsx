import Image from "next/image";
import { WorkType } from "./Work";
import ReactMarkdown from "react-markdown";
import styles from "./WorksSection.module.css";
import Cross from "../Cross";

type WorkModalProps = {
  work: WorkType;
  workDetailOpen: boolean;
  enquireOpen: boolean;
  handleWorkDetailClose: () => void;
  handleEnquireOpen: () => void;
  handleEnquireClose: () => void;
};

type WorkEnquireModalProps = {
  enquireOpen: boolean;
  handleEnquireClose: () => void;
};

const WorkEnquireModal = ({
  enquireOpen,
  handleEnquireClose,
}: WorkEnquireModalProps) => {
  return (
    <div
      className={`${styles.enquireContainer} ${enquireOpen ? styles.enquireOpen : ""}`}
    >
      <Cross className={styles.enquireCloseBtn} onClick={handleEnquireClose} />
    </div>
  );
};

const WorkModal = ({
  work,
  workDetailOpen,
  enquireOpen,
  handleWorkDetailClose,
  handleEnquireOpen,
  handleEnquireClose,
}: WorkModalProps) => {
  return (
    <div
      className={`${styles.workDetailContainer} ${workDetailOpen ? styles.workDetailOpen : ""}`}
    >
      <div className={styles.workDetailCover} onClick={handleWorkDetailClose} />
      <div className={styles.workDetailBox}>
        <div className={styles.workDetailGrid}>
          <Cross
            className={styles.workDetailCloseBtn}
            onClick={handleWorkDetailClose}
          />
          <div className={styles.workDetailImageContainer}>
            <div
              className={styles.workDetailImageBlur}
              style={{
                backgroundImage: `url(${work.workImagesCollection.items[0].url})`,
              }}
            />
            <Image
              src={work.workImagesCollection.items[0].url}
              alt={work.workImagesCollection.items[0].title}
              width={1000}
              height={1000}
              className={styles.workDetailImage}
            />
          </div>
          <div className={styles.workDetailContent}>
            <div>
              <h3>{work.title}</h3>
              <div className={styles.workDetailDescription}>
                <ReactMarkdown>{work.details}</ReactMarkdown>
              </div>
            </div>
            <button
              className={styles.workDetailEnquireBtn}
              onClick={handleEnquireOpen}
            >
              Enquire
            </button>
          </div>
        </div>
      </div>
      <WorkEnquireModal
        enquireOpen={enquireOpen}
        handleEnquireClose={handleEnquireClose}
      />
    </div>
  );
};

export default WorkModal;
