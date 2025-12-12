import Image from "next/image";
import styles from "./Fair.module.css";
import Link from "next/link";

type FairProps = {
  img: {
    src: string;
    alt: string;
  };
  title: string;
  date: string;
  description: string;
};

const Fair = ({ img, title, date, description }: FairProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.titleDash} />
          <div>
            <h3 className={styles.title}>{title}</h3>
          </div>
        </div>
        <p>{date}</p>
        <div>
          <p>{description}</p>
        </div>
        <Link href={`/exhibitions`} className={styles.readMoreBtn}>
          Read More
        </Link>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={img.src}
          alt={img.alt}
          width={1000}
          height={1000}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default Fair;
