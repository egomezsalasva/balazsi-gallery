import Image from "next/image";
import styles from "./Exhibition.module.css";
import Link from "next/link";

type ExhibitionProps = {
  img: {
    src: string;
    alt: string;
  };
  title: string;
  artist: string;
  date: string;
  description: string;
};

const Exhibition = ({
  img,
  title,
  artist,
  date,
  description,
}: ExhibitionProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <h2>{artist}</h2>
        <div className={styles.titleContainer}>
          <div className={styles.titleDash} />
          <div>
            <h3 className={styles.title}>{title}</h3>
            <h3>{artist}</h3>
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

export default Exhibition;
