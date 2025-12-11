"use client";
import { useEffect, useRef } from "react";
import HomeSectionLayout from "./components/HomeSectionLayout";
import HomeSlideshowLayout from "./components/HomeSlideshowLayout";
import styles from "./HomeNews.module.css";
import Image from "next/image";

type SlideshowItemType = {
  img: {
    src: string;
    alt: string;
  };
  title: string;
};

const SlideshowItem = ({ img, title }: SlideshowItemType) => {
  return (
    <>
      <Image
        src={img.src}
        alt={img.alt}
        width={1200}
        height={1000}
        className={styles.slideshowImage}
      />
      <div className={styles.slideshowTitleContainer}>{title}</div>
    </>
  );
};

const HomeNews = () => {
  const numNews = 2;
  return (
    <HomeSectionLayout title="News" linkHref="/news">
      <HomeSlideshowLayout numItems={numNews}>
        <div className={styles.newsSlideshowLeftContainer}>
          <SlideshowItem
            img={{ src: "/nit-de-lart-2025.jpg", alt: "News 1" }}
            title="Nit de l'art 2025"
          />
        </div>
        <div className={styles.newsSlideshowCenterContainer}>
          <SlideshowItem
            img={{ src: "/gallery.jpg", alt: "News 1" }}
            title="Lydia Blakeley in Residence at CCA Andratx"
          />
        </div>
        <div className={styles.newsSlideshowRightContainer}>
          <SlideshowItem
            img={{ src: "/gallery.jpg", alt: "News 1" }}
            title="Can Art Ibiza"
          />
        </div>
      </HomeSlideshowLayout>
    </HomeSectionLayout>
  );
};

export default HomeNews;
