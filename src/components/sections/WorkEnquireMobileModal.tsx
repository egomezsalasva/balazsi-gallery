import { WorkType } from "./Work";
import WorkModalEnquireForm from "./WorkModalEnquireForm";
import styles from "./WorkEnquireMobileModal.module.css";
import Cross from "../Cross";

type WorkEnquireMobileModalProps = {
  work: WorkType;
  enquireMobileOpen: boolean;
  handleEnquireMobileClose: () => void;
};

const WorkEnquireMobileModal = ({
  work,
  enquireMobileOpen,
  handleEnquireMobileClose,
}: WorkEnquireMobileModalProps) => {
  return (
    <div
      className={`${styles.enquireMobileContainer} ${enquireMobileOpen ? styles.enquireMobileOpen : ""}`}
    >
      <Cross
        className={styles.enquireMobileCloseBtn}
        onClick={handleEnquireMobileClose}
      />
      <div className={styles.enquireMobileContentContainer}>
        <div className={styles.enquireMobileContent}>
          <h3>Enquire</h3>
          <WorkModalEnquireForm work={work} />
          <div className={styles.detailsBtnContainer}>
            <button
              className={styles.detailsBtn}
              onClick={handleEnquireMobileClose}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkEnquireMobileModal;
