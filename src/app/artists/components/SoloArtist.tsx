import Image from "next/image";
import styles from "./SoloArtist.module.css";
import ReadMoreBtn from "@/components/ReadMoreBtn";
import { ArtistContentfulType } from "../utils/fetchExhibitionsForArtists";

type SoloArtitsProps = {
  artist: ArtistContentfulType;
  variant?: "represented" | "solo";
};

const SoloArtist = ({ artist, variant = "solo" }: SoloArtitsProps) => {
  const { slug, name, portraitImage, heroImage, placeOfBirth, yearOfBirth } =
    artist;
  const imageSrc = heroImage
    ? heroImage.url
    : portraitImage
      ? portraitImage.url
      : "/fallback.png";
  const imageAlt = heroImage
    ? heroImage.title
    : portraitImage
      ? portraitImage.title
      : "Artist Image";
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsContainerSticky}>
          <div className={styles.detailsArtistContainer}>
            <div
              className={
                variant === "represented"
                  ? styles.detailsArtistDashRepresented
                  : styles.detailsArtistDashSolo
              }
            />
            <h3
              className={
                variant === "represented"
                  ? styles.titleRepresented
                  : styles.titleSolo
              }
            >
              {name}
              {/* {status && status !== "Archive" && <span>{status}</span>} */}
            </h3>
          </div>
          <p className={styles.birthInfo}>
            {placeOfBirth}, {yearOfBirth}
          </p>
          <ReadMoreBtn href={`/artist/${slug}`} title="View Artist +" />
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1000}
          height={1000}
          className={
            variant === "represented" ? styles.imageRepresented : styles.image
          }
        />
      </div>
    </div>
  );
};

export default SoloArtist;
