import Arrow from "@/components/Arrow";
import styles from "./HomeHero.module.css";
import SlideshowIndicator from "@/components/SlideshowIndicator";

const HomeHero = () => {
  const numExhibitions = 2;
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.detailsContainer}>
          <div className={styles.detailsBox}>
            <div className={styles.detailsLabel}>Current Exhibition</div>
            <div className={styles.detailsTitleContainer}>
              <div className={styles.detailsDash} />
              <div>
                <h3 className={styles.detailsTitle}>Cynic's Bedtime</h3>
                <h3 className={styles.detailsArtist}>Jack Burton</h3>
              </div>
            </div>
            <div className={styles.detailsDate}>20.09 — 21.11</div>
          </div>
        </div>
        {numExhibitions > 1 && (
          <SlideshowIndicator
            numItems={numExhibitions}
            classNameIndicator={styles.indicatorContainer}
            classNameArrows={styles.arrowsContainer}
          />
        )}
      </div>
    </div>
  );
};

export default HomeHero;
