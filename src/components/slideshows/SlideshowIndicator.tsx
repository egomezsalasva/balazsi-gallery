import Arrow from "../Arrow";
import styles from "./SlideshowIndicator.module.css";

type SlideshowIndicatorProps = {
  numItems: number;
  classNameIndicator: string;
  classNameArrows: string;
  onPreviousClick: () => void;
  onNextClick: () => void;
  currentIndex: number;
  indicatorPreviousRef?: React.RefObject<HTMLDivElement | null>;
  indicatorNextRef?: React.RefObject<HTMLDivElement | null>;
};

const SlideshowIndicator = ({
  classNameIndicator,
  classNameArrows,
  numItems,
  onPreviousClick,
  onNextClick,
  indicatorPreviousRef,
  indicatorNextRef,
}: SlideshowIndicatorProps) => {
  return (
    <>
      <div className={`${styles.indicator} ${classNameIndicator}`}>
        <div
          ref={indicatorPreviousRef}
          className={styles.indicatorActive}
          style={{
            width: `calc(100% / ${numItems})`,
          }}
        />
        <div
          ref={indicatorNextRef}
          className={styles.indicatorActive}
          style={{
            width: `calc(100% / ${numItems})`,
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
