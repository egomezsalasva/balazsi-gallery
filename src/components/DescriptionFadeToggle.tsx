"use client";
import { useState } from "react";
import styles from "./DescriptionFadeToggle.module.css";
import useDescriptionFade from "@/utils/useDescriptionFade";
import ReactMarkdown from "react-markdown";

const PX_PER_SECOND = 900;

const DescriptionFadeToggle = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { descriptionRef, hasOverflow } = useDescriptionFade(
    children,
    isExpanded,
  );

  const handleExpand = () => {
    const el = descriptionRef.current;
    if (!el || isExpanded || isAnimating) return;

    const startHeight = el.clientHeight;
    const endHeight = el.scrollHeight;
    const distance = Math.max(endHeight - startHeight, 0);
    const durationMs = Math.min(
      2500,
      Math.max(350, (distance / PX_PER_SECOND) * 1000),
    );

    setIsAnimating(true);
    setIsExpanded(true);

    el.style.flex = "none";
    el.style.overflow = "hidden";
    el.style.height = `${startHeight}px`;
    el.style.setProperty("--expand-duration", `${durationMs}ms`);

    requestAnimationFrame(() => {
      el.style.transition = `height ${durationMs}ms ease`;
      el.style.height = `${endHeight}px`;
    });

    const onEnd = (event: TransitionEvent) => {
      if (event.propertyName !== "height") return;
      el.style.height = "auto";
      el.style.overflow = "visible";
      el.style.transition = "";
      el.removeEventListener("transitionend", onEnd);
      setIsAnimating(false);
    };

    el.addEventListener("transitionend", onEnd);
  };

  const showFade = hasOverflow && (!isExpanded || isAnimating);

  return (
    <div
      className={styles.root}
      data-expanded={isExpanded ? "true" : undefined}
    >
      <div
        ref={descriptionRef}
        className={[
          styles.descriptionContainer,
          showFade ? styles.hasOverflow : "",
          isExpanded ? styles.expanded : "",
          isAnimating ? styles.isAnimating : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <ReactMarkdown>{children as string}</ReactMarkdown>
      </div>
      {hasOverflow && !isExpanded && (
        <button className={styles.readMoreBtn} onClick={handleExpand}>
          Read More +
        </button>
      )}
    </div>
  );
};

export default DescriptionFadeToggle;
