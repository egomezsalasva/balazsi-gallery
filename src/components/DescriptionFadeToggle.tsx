"use client";
import { useState } from "react";
import styles from "./DescriptionFadeToggle.module.css";
import useDescriptionFade from "@/utils/useDescriptionFade";
import ReactMarkdown from "react-markdown";

const DescriptionFadeToggle = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { descriptionRef, hasOverflow } = useDescriptionFade(
    children,
    isExpanded,
  );

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={styles.root}
      data-expanded={isExpanded ? "true" : undefined}
    >
      <div
        ref={descriptionRef}
        className={`${styles.descriptionContainer} ${hasOverflow && !isExpanded ? styles.hasOverflow : ""} ${isExpanded ? styles.expanded : ""}`}
      >
        <ReactMarkdown>{children as string}</ReactMarkdown>
      </div>
      {hasOverflow && (
        <button className={styles.readMoreBtn} onClick={handleToggle}>
          {isExpanded ? "Close -" : "Read More +"}
        </button>
      )}
    </div>
  );
};

export default DescriptionFadeToggle;
