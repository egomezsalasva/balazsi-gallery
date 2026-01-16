import { useRef } from "react";

export const useSwipeGesture = (
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
) => {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const SWIPE_THRESHOLD = 50; // minimum distance for swipe

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > SWIPE_THRESHOLD) {
      if (distance > 0) {
        onSwipeLeft(); // swipe left = next slide
      } else {
        onSwipeRight(); // swipe right = previous slide
      }
    }
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
