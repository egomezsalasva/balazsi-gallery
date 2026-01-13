import Arrow from "../Arrow";
import PauseIcon from "../svgs/PauseIcon";
import PlayIcon from "../svgs/PlayIcon";
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
  pausePlayIcon?: {
    display: boolean;
    isPlaying: boolean;
    onPlayClick: () => void;
    onPauseClick: () => void;
  };
};

const SlideshowIndicator = ({
  classNameIndicator,
  classNameArrows,
  numItems,
  onPreviousClick,
  onNextClick,
  indicatorPreviousRef,
  indicatorNextRef,
  pausePlayIcon = {
    display: false,
    isPlaying: false,
    onPlayClick: () => {},
    onPauseClick: () => {},
  },
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
        {pausePlayIcon.display &&
          (pausePlayIcon.isPlaying ? (
            <PauseIcon
              className={styles.pauseIcon}
              onClick={pausePlayIcon.onPauseClick}
            />
          ) : (
            <PlayIcon
              className={styles.playIcon}
              onClick={pausePlayIcon.onPlayClick}
            />
          ))}
        <Arrow className={styles.arrowNext} onClick={onNextClick} />
      </div>
    </>
  );
};

export default SlideshowIndicator;
