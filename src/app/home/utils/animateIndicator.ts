import { gsap } from "gsap";

type AnimateIndicatorProps = {
  currentIndex: number;
  nextIndex: number;
  numSlides: number;
  indicatorPreviousRef: React.RefObject<HTMLDivElement | null>;
  indicatorNextRef: React.RefObject<HTMLDivElement | null>;
  DURATION: number;
  EASE: string;
};

type InitializeIndicatorProps = {
  indicatorPreviousRef: React.RefObject<HTMLDivElement | null>;
  indicatorNextRef: React.RefObject<HTMLDivElement | null>;
};

export const initializeIndicatorAnimation = ({
  indicatorPreviousRef,
  indicatorNextRef,
}: InitializeIndicatorProps) => {
  // Initialize indicator position
  if (indicatorPreviousRef.current) {
    gsap.set(indicatorPreviousRef.current, {
      xPercent: -100, // Hidden left
    });
  }

  if (indicatorNextRef.current) {
    gsap.set(indicatorNextRef.current, {
      xPercent: 0, // Start at first position
    });
  }
};

export const animateIndicator = ({
  currentIndex,
  nextIndex,
  numSlides,
  indicatorPreviousRef,
  indicatorNextRef,
  DURATION,
  EASE,
}: AnimateIndicatorProps) => {
  const isWrappingFromLastToFirst =
    currentIndex === numSlides - 1 && nextIndex === 0;
  const isWrappingFromFirstToLast =
    currentIndex === 0 && nextIndex === numSlides - 1;
  const isLeavingFirstAfterWrap = currentIndex === 0 && nextIndex === 1;
  const isLeavingLastAfterWrap =
    currentIndex === numSlides - 1 && nextIndex === numSlides - 2;

  if (indicatorPreviousRef.current && indicatorNextRef.current) {
    if (isWrappingFromLastToFirst) {
      // Forward wrap: next slides out right, previous slides in from left
      gsap.to(indicatorNextRef.current, {
        xPercent: numSlides * 100,
        duration: DURATION,
        ease: EASE,
      });

      gsap.set(indicatorPreviousRef.current, { xPercent: -100 });
      gsap.to(indicatorPreviousRef.current, {
        xPercent: 0,
        duration: DURATION,
        ease: EASE,
        onComplete: () => {
          // Swap: blue takes position, red hides
          if (indicatorNextRef.current && indicatorPreviousRef.current) {
            gsap.set(indicatorNextRef.current, { xPercent: 0 });
            gsap.set(indicatorPreviousRef.current, { xPercent: -100 });
          }
        },
      });
    } else if (isWrappingFromFirstToLast) {
      // Backward wrap: next slides out left, previous slides in from right
      gsap.to(indicatorNextRef.current, {
        xPercent: -100,
        duration: DURATION,
        ease: EASE,
      });

      gsap.set(indicatorPreviousRef.current, { xPercent: numSlides * 100 });
      gsap.to(indicatorPreviousRef.current, {
        xPercent: (numSlides - 1) * 100,
        duration: DURATION,
        ease: EASE,
        onComplete: () => {
          // Swap: blue takes position, red hides
          if (indicatorNextRef.current && indicatorPreviousRef.current) {
            gsap.set(indicatorNextRef.current, {
              xPercent: (numSlides - 1) * 100,
            });
            gsap.set(indicatorPreviousRef.current, { xPercent: -100 });
          }
        },
      });
    } else if (isLeavingFirstAfterWrap) {
      // Leaving first forward: reset to normal state
      gsap.set(indicatorPreviousRef.current, { xPercent: -100 });
      gsap.set(indicatorNextRef.current, { xPercent: 0 });

      gsap.to(indicatorNextRef.current, {
        xPercent: nextIndex * 100,
        duration: DURATION,
        ease: EASE,
      });
    } else if (isLeavingLastAfterWrap) {
      // Leaving last backward: reset to normal state
      gsap.set(indicatorPreviousRef.current, { xPercent: -100 });
      gsap.set(indicatorNextRef.current, { xPercent: (numSlides - 1) * 100 });

      gsap.to(indicatorNextRef.current, {
        xPercent: nextIndex * 100,
        duration: DURATION,
        ease: EASE,
      });
    } else {
      // Normal: only next indicator is visible and animates
      gsap.to(indicatorPreviousRef.current, {
        xPercent: -100,
        duration: DURATION,
        ease: EASE,
      });
      gsap.to(indicatorNextRef.current, {
        xPercent: nextIndex * 100,
        duration: DURATION,
        ease: EASE,
      });
    }
  }
};
