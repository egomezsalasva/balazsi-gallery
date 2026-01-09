import SlideshowIndicator from "@/components/slideshows/SlideshowIndicator";
import styles from "./SlideshowLayout.module.css";

type SlideshowLayoutProps = {
  children: React.ReactNode;
  numItems: number;
  currentIndex: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
  indicator?: boolean;
  indicatorPreviousRef?: React.RefObject<HTMLDivElement | null>;
  indicatorNextRef?: React.RefObject<HTMLDivElement | null>;
  styleContainer?: React.CSSProperties;
};

const SlideshowLayout = ({
  children,
  numItems,
  currentIndex,
  onPreviousClick,
  onNextClick,
  indicator = true,
  indicatorPreviousRef,
  indicatorNextRef,
  styleContainer,
}: SlideshowLayoutProps) => {
  return (
    <div className={styles.slideshowContainer} style={styleContainer}>
      <div className={styles.slideshowContentContainer}>{children}</div>
      {indicator && (
        <SlideshowIndicator
          numItems={numItems}
          classNameIndicator={styles.indicatorContainer}
          classNameArrows={styles.arrowsContainer}
          currentIndex={currentIndex}
          onPreviousClick={onPreviousClick}
          onNextClick={onNextClick}
          indicatorPreviousRef={indicatorPreviousRef}
          indicatorNextRef={indicatorNextRef}
        />
      )}
    </div>
  );
};

export default SlideshowLayout;
