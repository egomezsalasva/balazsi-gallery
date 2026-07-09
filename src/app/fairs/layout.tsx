import styles from "./layout.module.css";
import NavLink from "@/components/header/NavLink";
import { fetchCurrentAndUpcomingFairs } from "./utils/fetchCurrentAndUpcomingFairs";

const FairsLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentAndUpcomingFairs = await fetchCurrentAndUpcomingFairs();
  return (
    <div className={styles.container}>
      <div className={styles.fairs}>{children}</div>
      <div className={styles.fairsHeader}>
        {currentAndUpcomingFairs.length > 0 && (
          <NavLink href="/fairs/on-view">On View / Upcoming</NavLink>
        )}
        <NavLink href="/fairs/archive">Archive</NavLink>
      </div>
    </div>
  );
};

export default FairsLayout;
