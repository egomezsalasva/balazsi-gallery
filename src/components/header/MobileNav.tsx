"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import NavLinkList from "./NavLinkList";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const topLineRef = useRef<HTMLDivElement>(null);
  const middleLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Create timeline only once
    if (!timelineRef.current) {
      timelineRef.current = gsap
        .timeline({ paused: true })
        .to(topLineRef.current, {
          y: 6,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(
          middleLineRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          bottomLineRef.current,
          {
            y: -6,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(topLineRef.current, {
          rotation: 45,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(
          bottomLineRef.current,
          {
            rotation: -45,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "<",
        );
    }

    // Just control direction
    if (isOpen) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isOpen]);

  return (
    <div className={styles.navMobile}>
      <div className={styles.navMobileHamburgerIcon} onClick={handleToggle}>
        <div ref={topLineRef} />
        <div ref={middleLineRef} />
        <div ref={bottomLineRef} />
      </div>
      <div
        className={`${styles.navMobileModal} ${isOpen ? styles.navMobileModalOpen : ""}`}
      >
        <nav className={styles.navMobileModalNav}>
          <NavLinkList />
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
