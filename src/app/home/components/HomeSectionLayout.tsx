import Link from "next/link";
import styles from "./HomeSectionLayout.module.css";

type HomeSectionLayoutProps = {
  title: string;
  linkHref: string;
  children: React.ReactNode;
};

const HomeSectionLayout = ({
  title,
  linkHref,
  children,
}: HomeSectionLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.separatorLine} />
      <div className={styles.header}>
        <h2>{title}</h2>
        <Link href={linkHref} className={styles.viewAllBtnContainer}>
          View all
        </Link>
      </div>
      {children}
    </div>
  );
};

export default HomeSectionLayout;
