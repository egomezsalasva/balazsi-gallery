import Image from "next/image";
import { notFound } from "next/navigation";
import DateLabel from "@/components/DateLabel";
import DescriptionFadeToggle from "./components/DescriptionFadeToggle";
import { fetchExhibition } from "./utils/fetchExhibition";
import { artistNameDisplay } from "@/app/exhibitions/utils/artistNameDisplay";
import styles from "./page.module.css";

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const exhibition = await fetchExhibition(slug);
  if (!exhibition) {
    notFound();
  }
  const { title, startDate, endDate, fullText, artistsCollection } = exhibition;
  const artistName = artistNameDisplay(artistsCollection.items);
  return (
    <div className={styles.container}>
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
          <DescriptionFadeToggle>{fullText}</DescriptionFadeToggle>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/gallery.jpg"
            alt="Exhibition Image"
            width={1000}
            height={1000}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
}
