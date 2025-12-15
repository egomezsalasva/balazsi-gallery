import Link from "next/link";
import styles from "./GroupArtists.module.css";
import {
  ArtistContentfulType,
  ExhibitionForArtistsContentfulType,
} from "../utils/fetchExhibitionsForArtists";

type GroupArtistsProps = {
  exhibition: ExhibitionForArtistsContentfulType;
  artists: ArtistContentfulType[];
};

const GroupExhibitionArtists = ({ exhibition, artists }: GroupArtistsProps) => {
  return (
    <div className={styles.groupExhibitionArtistsContainer}>
      <div className={styles.titleContainer}>
        <h3>{exhibition.title}</h3>
      </div>
      {artists.map((artist: ArtistContentfulType) => (
        <div key={artist.name} className={styles.artistContainer}>
          <div className={styles.dash} />
          <Link href={`/`} className={styles.artistLink}>
            {artist.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
export default GroupExhibitionArtists;
