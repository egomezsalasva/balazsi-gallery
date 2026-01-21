"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Preloader.module.css";
import PreloaderLogo from "./PreloaderLogo";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check sessionStorage after mount
    if (sessionStorage.getItem("preloader-shown")) {
      setShouldRender(false);
      return;
    }

    gsap.set("#balazsi", { y: "-90vh" });
    gsap.set("#gallery", { y: "90vh" });
    gsap.set("#dash-right", { x: "-234.5px" });
    gsap.set("#dash-left", { x: "234.5px" });

    // Should show - make visible
    setIsVisible(true);

    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("preloader-shown", "true");
          setShouldRender(false);
        },
      });

      const TIME = 1.75;

      tl.to("#balazsi", {
        y: "0%",
        duration: TIME,
        ease: "sine.inOut",
      })
        .to(
          "#gallery",
          {
            y: "0",
            duration: TIME,
            ease: "sine.inOut",
          },
          `-=${TIME}`,
        )
        .to(
          "#dash-right",
          {
            x: "0",
            duration: TIME,
            ease: "sine.inOut",
          },
          `-=${TIME}`,
        )
        .to(
          "#dash-left",
          {
            x: "0%",
            duration: TIME,
            ease: "sine.inOut",
          },
          `-=${TIME}`,
        )
        .to({}, { duration: 0.5 })
        // Swipe everything up
        .to(preloaderRef.current, {
          y: "-100%",
          duration: 1,
          ease: "sine.inOut",
        });
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      ref={preloaderRef}
      className={styles.preloader}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <PreloaderLogo />
    </div>
  );
}
