import Arrow from "./Arrow";
import styles from "./SlideshowIndicator.module.css";

type SlideshowIndicatorProps = {
  numItems: number;
  classNameIndicator: string;
  classNameArrows: string;
};

const SlideshowIndicator = ({
  numItems,
  classNameIndicator,
  classNameArrows,
}: SlideshowIndicatorProps) => {
  return (
    <>
      <div className={`${styles.indicator} ${classNameIndicator}`}>
        <div
          className={styles.indicatorActive}
          style={{ width: `calc(100% / ${numItems})` }}
        />
      </div>
      <div className={`${styles.arrowsContainer} ${classNameArrows}`}>
        <Arrow className={styles.arrowPrevious} />
        <Arrow className={styles.arrowNext} />
      </div>
    </>
  );
};

export default SlideshowIndicator;
