"use client";
import { useState } from "react";
import styles from "./DescriptionFadeToggle.module.css";
import useDescriptionFade from "@/utils/useDescriptionFade";
import ReactMarkdown from "react-markdown";

const DescriptionFadeToggle = ({ children }: { children: React.ReactNode }) => {
  const { descriptionRef, hasOverflow } = useDescriptionFade(children);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div
        ref={descriptionRef}
        className={`${styles.descriptionContainer} ${hasOverflow && !isExpanded ? styles.hasOverflow : ""} ${isExpanded ? styles.expanded : ""}`}
      >
        <ReactMarkdown>{children as string}</ReactMarkdown>
      </div>
      {!isExpanded ? (
        <button className={styles.readMoreBtn} onClick={handleToggle}>
          Read More +
        </button>
      ) : (
        <button className={styles.readMoreBtn} onClick={handleToggle}>
          Close -
        </button>
      )}
    </>
  );
};

export default DescriptionFadeToggle;
