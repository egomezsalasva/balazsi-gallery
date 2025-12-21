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

  // Create a map of unique artists with their most recent exhibition date
  const artistsMap = new Map<
    string,
    { artist: ArtistContentfulType; mostRecentDate: string }
  >();

  soloArtistsExhibitions.forEach(
    (exhibition: ExhibitionForArtistsContentfulType) => {
      const artist = exhibition.artistsCollection.items[0];
      const existingEntry = artistsMap.get(artist.slug);

      // If artist doesn't exist or this exhibition is more recent, update the entry
      if (
        !existingEntry ||
        exhibition.startDate > existingEntry.mostRecentDate
      ) {
        artistsMap.set(artist.slug, {
          artist,
          mostRecentDate: exhibition.startDate,
        });
      }
    },
  );

  // Convert map to array and sort by most recent exhibition date (descending)
  const uniqueSoloArtists = Array.from(artistsMap.values())
    .sort((a, b) => b.mostRecentDate.localeCompare(a.mostRecentDate))
    .map((entry) => entry.artist);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.soloArtistTitle}>Solo Exhibitions</h2>
      </div>
      <div className={styles.soloArtistSectionContainer}>
        {uniqueSoloArtists.map((artist: ArtistContentfulType) => (
          <SoloArtist artist={artist} key={artist.slug} />
        ))}
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
