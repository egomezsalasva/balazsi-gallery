import styles from "./layout.module.css";
import { NavLink } from "@/components/Header";

const ExhibitionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.exhibitions}>{children}</div>
      <div className={styles.exhibitionsHeader}>
        <NavLink href="/fairs/on-view">On View / Upcoming</NavLink>
        <NavLink href="/fairs/archive">Archive</NavLink>
      </div>
    </div>
  );
};

export default ExhibitionsLayout;
