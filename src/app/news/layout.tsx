import styles from "./layout.module.css";
import NavLink from "@/components/header/NavLink";

const NewsLayout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.container}>
    <div className={styles.news}>{children}</div>
    <div className={styles.newsHeader}>
      <NavLink href="/news/news">News</NavLink>
      <NavLink href="/news/press">Press</NavLink>
    </div>
  </div>
);

export default NewsLayout;
