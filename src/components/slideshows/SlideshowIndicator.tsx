import Arrow from "../Arrow";
import styles from "./SlideshowIndicator.module.css";

type SlideshowIndicatorProps = {
  numItems: number;
  classNameIndicator: string;
  classNameArrows: string;
  onPreviousClick: () => void;
  onNextClick: () => void;
  currentIndex: number;
};

const SlideshowIndicator = ({
  classNameIndicator,
  classNameArrows,
  numItems,
  currentIndex,
  onPreviousClick,
  onNextClick,
}: SlideshowIndicatorProps) => {
  return (
    <>
      <div className={`${styles.indicator} ${classNameIndicator}`}>
        <div
          className={styles.indicatorActive}
          style={{
            width: `calc(100% / ${numItems})`,
            left: `calc(${currentIndex} * (100% / ${numItems}))`,
          }}
        />
      </div>
      <div className={`${styles.arrowsContainer} ${classNameArrows}`}>
        <Arrow className={styles.arrowPrevious} onClick={onPreviousClick} />
        <Arrow className={styles.arrowNext} onClick={onNextClick} />
      </div>
    </>
  );
};

export default SlideshowIndicator;
