import { gsap } from "gsap";

type AnimateSlidesProps = {
  currentIndex: number;
  nextIndex: number;
  slidesRef: React.RefObject<(HTMLDivElement | null)[]>;
  DURATION: number;
  EASE: string;
  direction: 1 | -1;
  isTweeningRef: React.RefObject<boolean>;
};

type InitializeSlidesProps = {
  slidesRef: React.RefObject<(HTMLDivElement | null)[]>;
  EASE: string;
};

export const initializeSlidesAnimation = ({
  slidesRef,
  EASE,
}: InitializeSlidesProps) => {
  slidesRef.current.forEach((slide, i) => {
    if (slide) {
      gsap.set(slide, {
        xPercent: i > 0 ? 100 : 0,
      });
      gsap.to(slide, {
        opacity: 1,
        duration: 0.25,
        ease: EASE,
      });
    }
  });
};

export const animateSlides = ({
  currentIndex,
  nextIndex,
  slidesRef,
  DURATION,
  EASE,
  direction,
  isTweeningRef,
  onComplete,
}: AnimateSlidesProps & { onComplete?: () => void }) => {
  const currentSlide = slidesRef.current[currentIndex];
  const nextSlide = slidesRef.current[nextIndex];

  if (direction > 0) {
    // Moving forward
    gsap.set(nextSlide, { xPercent: 100 });
    gsap.to(currentSlide, {
      xPercent: -100,
      duration: DURATION,
      ease: EASE,
    });
  } else {
    // Moving backward
    gsap.set(nextSlide, { xPercent: -100 });
    gsap.to(currentSlide, {
      xPercent: 100,
      duration: DURATION,
      ease: EASE,
    });
  }

  gsap.to(nextSlide, {
    xPercent: 0,
    duration: DURATION,
    ease: EASE,
    onComplete: () => {
      isTweeningRef.current = false;
      onComplete?.(); // Call state update here
    },
  });
};
