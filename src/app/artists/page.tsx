import { Metadata } from "next";
import styles from "./page.module.css";
import SoloArtist from "./components/SoloArtist";
import GroupExhibitionArtists from "./components/GroupArtists";
import fetchExhibitionsForArtists, {
  ArtistContentfulType,
  ExhibitionForArtistsContentfulType,
} from "./utils/fetchExhibitionsForArtists";

export const metadata: Metadata = {
  title: "Artists | Balazsi Gallery",
  description: "Artists | Balazsi Gallery",
};

export default async function Artists() {
  const exhibitions = await fetchExhibitionsForArtists();
  const soloArtistsExhibitions = exhibitions.filter(
    (exhibition: any) => exhibition.artistsCollection.items.length === 1,
  );
  const groupArtists = exhibitions.filter(
    (exhibition: any) => exhibition.artistsCollection.items.length > 1,
  );
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.soloArtistTitle}>Solo Exhibitions</h2>
      </div>
      <div className={styles.soloArtistSectionContainer}>
        {soloArtistsExhibitions.map(
          (exhibition: ExhibitionForArtistsContentfulType) =>
            exhibition.artistsCollection.items.map(
              (artist: ArtistContentfulType) => (
                <SoloArtist artist={artist} key={artist.name} />
              ),
            ),
        )}
      </div>
      <div className={styles.titleContainer}>
        <h2 className={styles.groupArtistTitle}>Group Shows</h2>
      </div>
      <div className={styles.groupArtistSectionContainer}>
        {groupArtists.map((exhibition: ExhibitionForArtistsContentfulType) => (
          <GroupExhibitionArtists
            key={exhibition.title}
            exhibition={exhibition}
            artists={exhibition.artistsCollection.items}
          />
        ))}
      </div>
    </div>
  );
}
