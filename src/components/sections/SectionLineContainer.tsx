import styles from "./SectionLineContainer.module.css";
const SectionLineContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default SectionLineContainer;
