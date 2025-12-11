import HomeHero from "./home/HomeHero";
import HomeExhibitions from "./home/HomeExhibitions";
import styles from "./page.module.css";
import HomeNews from "./home/HomeNews";
import HomeMedia from "./home/HomeMedia";

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeHero />
      <HomeExhibitions />
      <HomeNews />
      <HomeMedia />
    </div>
  );
}
