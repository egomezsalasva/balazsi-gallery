import { notFound } from "next/navigation";
import ArtistDetails from "./ArtistDetails";
import ArtistExhibitions from "./ArtistExhibitions";
import ArtistWorks from "./ArtistWorks";
import { fetchArtist } from "./utils/fetchArtist";
import { fetchExhibitionsForArtist } from "./utils/fetchExhibitionsForArtist";
import { fetchWorksForArtist } from "./utils/fetchWorksForArtist";
import { fetchFairsForArtist } from "./utils/fetchFairsForArtist";
import styles from "./page.module.css";
import ArtistFairs from "./ArtistFairs";
import { fetchNewsForArtist } from "./utils/fetchNewsForArtist";
import ArtistNews from "./ArtistNews";

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const artist = await fetchArtist(slug);
  const exhibitions = await fetchExhibitionsForArtist(slug);
  const works = await fetchWorksForArtist(slug);
  const fairs = await fetchFairsForArtist(slug);
  const news = await fetchNewsForArtist(slug);
  if (!artist) {
    notFound();
  }
  return (
    <div className={styles.container}>
      <ArtistDetails artist={artist} />
      {works.length > 0 && <ArtistWorks works={works} />}
      {exhibitions.length > 0 && (
        <ArtistExhibitions exhibitions={exhibitions} />
      )}
      {fairs.length > 0 && <ArtistFairs fairs={fairs} />}
      {news.length > 0 && <ArtistNews news={news} />}
    </div>
  );
}
