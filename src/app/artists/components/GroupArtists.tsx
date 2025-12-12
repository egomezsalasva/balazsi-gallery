import Link from "next/link";
import styles from "./GroupArtists.module.css";

type GroupArtistsProps = {
  title: string;
  artists: {
    name: string;
  }[];
};

const GroupExhibitionArtists = ({ title, artists }: GroupArtistsProps) => {
  return (
    <div className={styles.groupExhibitionArtistsContainer}>
      <h3>{title}</h3>
      {artists.map((artist) => (
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
