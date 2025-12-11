import styles from "./layout.module.css";
import { NavLink } from "@/components/Header";

const ExhibitionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.exhibitions}>{children}</div>
      <div className={styles.exhibitionsHeaderContainer}>
        <div className={styles.exhibitionsHeader}>
          <NavLink href="/exhibitions/current">Current</NavLink>
          <NavLink href="/exhibitions/upcoming">Upcoming</NavLink>
          <NavLink href="/exhibitions/archive">Archive</NavLink>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionsLayout;
