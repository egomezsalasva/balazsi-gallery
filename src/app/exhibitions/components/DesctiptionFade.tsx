"use client";
import useDescriptionFade from "@/utils/useDescriptionFade";
import styles from "./DescriptionFade.module.css";

const DescriptionFade = ({ children }: { children: React.ReactNode }) => {
  const { descriptionRef, hasOverflow } = useDescriptionFade(children);
  return (
    <div
      ref={descriptionRef}
      className={`${styles.description} ${hasOverflow ? styles.hasOverflow : ""}`}
    >
      {children}
    </div>
  );
};

export default DescriptionFade;
