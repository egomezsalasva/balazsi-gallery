import Link from "next/link";
import styles from "./ReadMoreBtn.module.css";

type ReadMoreBtnProps = {
  href: string;
  title?: string;
};

const ReadMoreBtn = ({ href, title = "Read More +" }: ReadMoreBtnProps) => {
  return (
    <Link href={href} className={styles.readMoreBtn}>
      {title}
    </Link>
  );
};

export default ReadMoreBtn;
