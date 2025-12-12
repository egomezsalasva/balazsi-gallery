import { Metadata } from "next";
import styles from "./page.module.css";
import SoloArtist from "./components/SoloArtist";
import { fetchContentfulData } from "@/utils/fetchContentfulData";
import GroupExhibitionArtists from "./components/GroupArtists";
// import { checkStatus } from "@/utils/checkStatus";

export const metadata: Metadata = {
  title: "Artists | Balazsi Gallery",
  description: "Artists | Balazsi Gallery",
};

const EXHIBITIONS_QUERY = `
query{
  exhibitionCollection(order: startDate_DESC){
    items{
      title
      startDate
      endDate
      artistsCollection(limit: 50){
        items{
          portraitImage{
            url
            title
          }
          name
          placeOfBirth
          yearOfBirth
        }
      }
    }
  }
}
`;

const fetchExhibitions = async () => {
  const data = await fetchContentfulData(EXHIBITIONS_QUERY);
  return data.data.exhibitionCollection.items;
};

export default async function Artists() {
  const exhibitions = await fetchExhibitions();
  const soloArtistsExhibitions = exhibitions.filter(
    (exhibition: any) => exhibition.artistsCollection.items.length === 1,
  );
  const groupArtists = exhibitions.filter(
    (exhibition: any) => exhibition.artistsCollection.items.length > 1,
  );
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>Solo Exhibitions</h2>
      </div>
      <div className={styles.soloArtistSectionContainer}>
        {soloArtistsExhibitions.map((exhibition: any) =>
          exhibition.artistsCollection.items.map((artist: any) => (
            <SoloArtist
              key={artist.name}
              // status={checkStatus(exhibition.startDate, exhibition.endDate)}
              img={{ src: artist.portraitImage.url, alt: artist.name }}
              artist={artist.name}
              placeOfBirth={artist.placeOfBirth}
              dateOfBirth={artist.yearOfBirth}
            />
          )),
        )}
      </div>
      <div className={styles.titleContainer}>
        <h2>Group Artists</h2>
      </div>
      <div className={styles.groupArtistSectionContainer}>
        {groupArtists.map((exhibition: any) => (
          <GroupExhibitionArtists
            key={exhibition.title}
            title={exhibition.title}
            artists={exhibition.artistsCollection.items.map((artist: any) => ({
              name: artist.name,
            }))}
          />
        ))}
      </div>
    </div>
  );
}
