import Link from "next/link";
import styles from "./ReadMoreBtn.module.css";

type ReadMoreBtnProps = React.ComponentPropsWithoutRef<typeof Link> & {
  title?: string;
};

const ReadMoreBtn = ({ title = "Read More +", ...props }: ReadMoreBtnProps) => {
  return (
    <Link {...props} className={styles.readMoreBtn}>
      {title}
    </Link>
  );
};

export default ReadMoreBtn;
