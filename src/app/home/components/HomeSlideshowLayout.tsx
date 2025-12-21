import SlideshowIndicator from "@/components/slideshows/SlideshowIndicator";
import styles from "./HomeSlideshowLayout.module.css";

type HomeSlideshowLayoutProps = {
  children: React.ReactNode;
  numItems: number;
  indicator?: boolean;
  styleContainer?: React.CSSProperties;
};

const HomeSlideshowLayout = ({
  children,
  numItems,
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
        />
      )}
    </div>
  );
};

export default HomeSlideshowLayout;
