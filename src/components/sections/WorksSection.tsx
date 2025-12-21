import styles from "./WorksSection.module.css";
import Work, { WorkType } from "./Work";

type WorksSectionProps = {
  works: WorkType[];
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
