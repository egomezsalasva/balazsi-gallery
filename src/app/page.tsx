import HomeHero from "./home/HomeHero";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeHero />
    </div>
  );
}
