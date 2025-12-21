import Image from "next/image";
import DescriptionFadeToggle from "@/components/DescriptionFadeToggle";
import { ArtistContentfulType } from "./utils/fetchArtist";
import styles from "./ArtistDetails.module.css";

type ArtistDetailsProps = {
  artist: ArtistContentfulType;
};

const ArtistDetails = ({ artist }: ArtistDetailsProps) => {
  const { name, placeOfBirth, yearOfBirth, fullText, portraitImage } = artist;
  return (
    <div className={styles.contentContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.titleDash} />
          <div>
            <h1>{name}</h1>
          </div>
        </div>
        <p className={styles.birthInfo}>
          {placeOfBirth}, {yearOfBirth}
        </p>
        <DescriptionFadeToggle>{fullText}</DescriptionFadeToggle>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={portraitImage ? portraitImage.url : "/fallback.png"}
          alt={portraitImage ? portraitImage.title : "Artist Image"}
          width={1000}
          height={1000}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default ArtistDetails;
