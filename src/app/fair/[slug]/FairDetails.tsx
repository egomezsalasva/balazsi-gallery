import Image from "next/image";
import DateLabel from "@/components/DateLabel";
import { FairContentfulType } from "./utils/fetchFair";
import styles from "./FairDetails.module.css";
import DescriptionFadeToggle from "@/components/DescriptionFadeToggle";
import Link from "next/link";

type FairDetailsProps = {
  fair: FairContentfulType;
};

const FairDetails = ({ fair }: FairDetailsProps) => {
  const { title, heroImage, startDate, endDate, fullText, artistsCollection } =
    fair;
  return (
    <div className={styles.contentContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <h1>{title}</h1>
        </div>
        <DateLabel
          startDate={startDate}
          endDate={endDate ? endDate : undefined}
          withMargin
        />
        {artistsCollection.items.length > 0 && (
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
          alt={heroImage ? heroImage.title : "Fair Image"}
          width={1000}
          height={1000}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default FairDetails;
