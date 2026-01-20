import { useRef } from "react";

export const useSwipeGesture = (
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
) => {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  const SWIPE_THRESHOLD = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;

    // Calculate distances
    const deltaX = Math.abs(touchStartX.current - touchEndX.current);
    const deltaY = Math.abs(touchStartY.current - touchEndY.current);

    // If horizontal movement is greater than vertical, prevent scroll
    if (deltaX > deltaY && deltaX > 10) {
      // 10px threshold before locking
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > SWIPE_THRESHOLD) {
      if (distance > 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
