import { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About | Balazsi Gallery",
  description: "About | Balazsi Gallery",
};

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1>About</h1>
        <p>
          Balazsi Gallery is a contemporary art gallery in Palma de Mallorca
          that brings together emerging and international artists with the local
          community. Founded in 2023 (formerly Tube Gallery) by Axel Balazsi,
          the gallery reflects his diverse artistic perspective. Born in Sweden
          with Hungarian roots, Axel completed his MFA in Fine Arts at
          Goldsmiths, University of London in 2019, before turning his attention
          to curating and gallery-making. This international experience informs
          the gallery’s focus on visual, performative, and conceptual works
          exploring identity, the body, and the environment.
        </p>
        <p>
          Balazsi Gallery views art as a living language that encourages
          reflection and dialogue. Its program features solo and group
          exhibitions, performances, immersive installations, and collaborative
          projects. The gallery also organizes workshops and special events that
          foster engagement between artists, collectors, and the public,
          participating actively in national and international art fairs.
        </p>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="/about.webp"
          alt="Balazsi Gallery About"
          width={1000}
          height={1000}
          className={styles.image}
        />
      </div>
    </div>
  );
}
