import Image from "next/image";
import { WorkType } from "./Work";
import ReactMarkdown from "react-markdown";
import styles from "./WorksSection.module.css";
import Cross from "../Cross";
import WorkModalEnquireForm from "./WorkModalEnquireForm";

type WorkModalProps = {
  work: WorkType;
  workDetailOpen: boolean;
  enquireOpen: boolean;
  handleWorkDetailClose: () => void;
  handleEnquireOpen: () => void;
  handleEnquireClose: () => void;
};

type WorkEnquireModalProps = {
  work: WorkType;
  enquireOpen: boolean;
  handleEnquireClose: () => void;
};

const WorkEnquireModal = ({
  work,
  enquireOpen,
  handleEnquireClose,
}: WorkEnquireModalProps) => {
  return (
    <div
      className={`${styles.enquireContainer} ${enquireOpen ? styles.enquireOpen : ""}`}
    >
      <Cross className={styles.enquireCloseBtn} onClick={handleEnquireClose} />
      <div className={styles.enquireContent}>
        <h3>Enquire</h3>
        <WorkModalEnquireForm work={work} />
      </div>
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
  const { title, artist, workImagesCollection, details, enquire } = work;
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
                backgroundImage: `url(${workImagesCollection.items[0].url})`,
              }}
            />
            <Image
              src={workImagesCollection.items[0].url}
              alt={workImagesCollection.items[0].title}
              width={1000}
              height={1000}
              className={styles.workDetailImage}
            />
          </div>
          <div className={styles.workDetailContent}>
            <div>
              <div className={styles.workDetailTitle}>
                <div className={styles.workDetailTitleSeparator} />
                <div className={styles.workDetailTitleText}>
                  <h3>{title}</h3>
                  <h4>{artist?.name}</h4>
                </div>
              </div>
              <div className={styles.workDetailDescription}>
                <ReactMarkdown>{details}</ReactMarkdown>
              </div>
            </div>
            {enquire && (
              <button
                className={styles.workDetailEnquireBtn}
                onClick={handleEnquireOpen}
              >
                Enquire
              </button>
            )}
          </div>
        </div>
      </div>
      <WorkEnquireModal
        work={work}
        enquireOpen={enquireOpen}
        handleEnquireClose={handleEnquireClose}
      />
    </div>
  );
};

export default WorkModal;
