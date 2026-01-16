import styles from "./layout.module.css";
import NavLink from "@/components/header/NavLink";

const ExhibitionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.fairs}>{children}</div>
      <div className={styles.fairsHeader}>
        <NavLink href="/fairs/on-view">On View / Upcoming</NavLink>
        <NavLink href="/fairs/archive">Archive</NavLink>
      </div>
    </div>
  );
};

export default ExhibitionsLayout;
