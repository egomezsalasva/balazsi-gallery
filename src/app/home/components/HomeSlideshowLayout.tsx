import SlideshowIndicator from "@/components/slideshows/SlideshowIndicator";
import { useSwipeGesture } from "@/components/slideshows/utils/useSwipeGesture";
import styles from "./HomeSlideshowLayout.module.css";

type HomeSlideshowLayoutProps = {
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

const HomeSlideshowLayout = ({
  children,
  numItems,
  currentIndex,
  onPreviousClick,
  onNextClick,
  indicator = true,
  indicatorPreviousRef,
  indicatorNextRef,
  styleContainer,
}: HomeSlideshowLayoutProps) => {
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipeGesture(
    onNextClick,
    onPreviousClick,
  );
  return (
    <div className={styles.slideshowContainer} style={styleContainer}>
      <div
        className={styles.slideshowContentContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
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

export default HomeSlideshowLayout;
