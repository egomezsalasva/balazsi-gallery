import { useEffect, useMemo, useRef, useState } from "react";
import { animateSlides, initializeSlidesAnimation } from "./animateSlides";
import {
  animateIndicator,
  initializeIndicatorAnimation,
} from "./animateIndicator";

type UseSlideshowAnimationProps<T> = {
  slideshowColNumber: number;
  dataList: T[];
};

const useSlideshowAnimation = <T>({
  slideshowColNumber,
  dataList,
}: UseSlideshowAnimationProps<T>) => {
  const numItems = dataList?.length || 0;
  const numSlides = Math.ceil(numItems / slideshowColNumber);

  const [currentIndex, setCurrentIndex] = useState(0);
  const isTweeningRef = useRef(false);
  const EASE = "sine.inOut";
  const DURATION = 1.25;
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const indicatorPreviousRef = useRef<HTMLDivElement>(null);
  const indicatorNextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeSlidesAnimation({ slidesRef, EASE });
    initializeIndicatorAnimation({ indicatorPreviousRef, indicatorNextRef });
  }, []);

  const gotoSlide = (direction: 1 | -1) => {
    if (isTweeningRef.current || numSlides <= 1) return;

    isTweeningRef.current = true;

    let nextIndex: number;
    if (slidesRef.current[currentIndex + direction]) {
      nextIndex = currentIndex + direction;
    } else {
      nextIndex = direction > 0 ? 0 : numSlides - 1;
    }
    animateIndicator({
      currentIndex,
      nextIndex,
      numSlides,
      indicatorPreviousRef,
      indicatorNextRef,
      DURATION,
      EASE,
      direction,
    });
    animateSlides({
      currentIndex,
      nextIndex,
      slidesRef,
      DURATION,
      EASE,
      direction,
      isTweeningRef,
      onComplete: () => {
        setCurrentIndex(nextIndex);
      },
    });
  };

  const dataListGroups = useMemo(() => {
    const groups = [];
    for (let i = 0; i < dataList.length; i += slideshowColNumber) {
      groups.push(dataList.slice(i, i + slideshowColNumber));
    }
    return groups;
  }, [dataList, slideshowColNumber]);

  return {
    numSlides,
    indicatorPreviousRef,
    indicatorNextRef,
    currentIndex,
    gotoSlide,
    dataListGroups,
    slidesRef,
  };
};

export default useSlideshowAnimation;
