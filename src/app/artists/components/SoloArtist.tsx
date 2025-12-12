import Image from "next/image";
import styles from "./SoloArtist.module.css";
import Link from "next/link";

type SoloArtistProps = {
  img: {
    src: string;
    alt: string;
  };
  // status: "Upcoming" | "Current" | "Archive";
  artist: string;
  placeOfBirth: string;
  dateOfBirth: string;
};

const SoloArtist = ({
  img,
  artist,
  placeOfBirth,
  dateOfBirth,
}: SoloArtistProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsContainerSticky}>
          <div className={styles.detailsArtistContainer}>
            <div className={styles.detailsArtistDash} />
            <h3>
              {artist}
              {/* {status && status !== "Archive" && <span>{status}</span>} */}
            </h3>
          </div>
          <p>
            {placeOfBirth}, {dateOfBirth}
          </p>
          <Link href={`/`} className={styles.readMoreBtn}>
            Read More
          </Link>
        </div>
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

export default SoloArtist;
