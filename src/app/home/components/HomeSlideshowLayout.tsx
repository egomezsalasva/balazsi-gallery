import SlideshowIndicator from "@/components/slideshows/SlideshowIndicator";
import styles from "./HomeSlideshowLayout.module.css";

type HomeSlideshowLayoutProps = {
  children: React.ReactNode;
  numItems: number;
  currentIndex: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
  indicator?: boolean;
  styleContainer?: React.CSSProperties;
};

const HomeSlideshowLayout = ({
  children,
  numItems,
  currentIndex,
  onPreviousClick,
  onNextClick,
  indicator = true,
  styleContainer,
}: HomeSlideshowLayoutProps) => {
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
        />
      )}
    </div>
  );
};

export default HomeSlideshowLayout;
