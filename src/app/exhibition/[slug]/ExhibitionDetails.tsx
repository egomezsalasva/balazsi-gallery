import Image from "next/image";
import Link from "next/link";
import DescriptionFadeToggle from "@/components/DescriptionFadeToggle";
import { ExhibitionContentfulType } from "./utils/fetchExhibition";
import { artistNameDisplay } from "@/app/exhibitions/utils/artistNameDisplay";
import DateLabel from "@/components/DateLabel";
import styles from "./ExhibitionDetails.module.css";

type ExhibitionDetailsProps = {
  exhibition: ExhibitionContentfulType;
};

const ExhibitionDetails = ({ exhibition }: ExhibitionDetailsProps) => {
  const { title, startDate, endDate, fullText, artistsCollection, heroImage } =
    exhibition;
  const artistName = artistNameDisplay(artistsCollection.items);
  const isGroupShow = artistsCollection.items.length > 1;
  return (
    <div className={styles.contentContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.titleDash} />
          <div>
            <h1>{title}</h1>
            <h2>{artistName}</h2>
          </div>
        </div>
        <DateLabel startDate={startDate} endDate={endDate} withMargin />
        {isGroupShow && (
          <p className={styles.groupShowText}>
            With:{" "}
            {artistsCollection.items.map(
              (artist: { name: string; slug: string }, index: number) => (
                <span key={artist.name}>
                  <Link href={`/artist/${artist.slug}`}>{artist.name}</Link>
                  {index < artistsCollection.items.length - 1 ? ", " : "."}
                </span>
              ),
            )}
          </p>
        )}
        <DescriptionFadeToggle>{fullText}</DescriptionFadeToggle>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={heroImage ? heroImage.url : "/fallback.png"}
          alt={heroImage ? heroImage.title : "Exhibition Image"}
          width={1000}
          height={1000}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default ExhibitionDetails;
