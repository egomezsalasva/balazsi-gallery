import HomeHero from "./home/HomeHero";
import HomeExhibitions from "./home/HomeExhibitions";
import styles from "./page.module.css";
import HomeNews from "./home/HomeNews";
import HomeMedia from "./home/HomeMedia";
import { fetchHomeExhibitions } from "./home/utils/fetchHomeExhibitions";
import { fetchHeroData } from "./home/utils/fetchHeroData";
import { fetchHomeNews } from "./home/utils/fetchHomeNews";

export default async function Home() {
  const exhibitions = await fetchHomeExhibitions();
  const heroData = await fetchHeroData();
  const news = await fetchHomeNews();
  return (
    <div className={styles.container}>
      <HomeHero heroData={heroData} />
      <HomeExhibitions exhibitions={exhibitions} />
      <HomeNews news={news} />
      <HomeMedia />
    </div>
  );
}
