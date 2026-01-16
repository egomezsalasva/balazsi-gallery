"use client";
import HomeSectionLayout from "./components/HomeSectionLayout";
import { HomeExhibitionsContentfulType } from "./utils/fetchHomeExhibitions";
import ExhibitionsSlideshow from "./components/ExhibitionsSlideshow";
import styles from "./HomeExhibitions.module.css";

const HomeExhibitions = ({
  exhibitions,
}: {
  exhibitions: HomeExhibitionsContentfulType[];
}) => {
  return (
    <HomeSectionLayout
      title="Exhibitions"
      linkHref="/exhibitions/current"
      styleContainer={{ paddingTop: "5rem" }}
    >
      <ExhibitionsSlideshow
        exhibitions={exhibitions}
        colNumber={2}
        className={styles.twoColumnSlideshow}
      />
      <ExhibitionsSlideshow
        exhibitions={exhibitions}
        colNumber={1}
        className={styles.oneColumnSlideshow}
      />
    </HomeSectionLayout>
  );
};

export default HomeExhibitions;
