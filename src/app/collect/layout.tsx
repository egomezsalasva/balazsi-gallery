import styles from "./layout.module.css";
import NavLink from "@/components/header/NavLink";

const CollectLayout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.container}>
    <div className={styles.collect}>{children}</div>
    <div className={styles.collectHeader}>
      <NavLink href="/collect/pieces">Pieces</NavLink>
    </div>
  </div>
);

export default CollectLayout;
