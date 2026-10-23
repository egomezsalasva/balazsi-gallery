import { useEffect, useRef, useState } from "react";

const useDescriptionFade = (children: React.ReactNode, isExpanded = false) => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const element = descriptionRef.current;
    if (!element) return;

    const check = () => {
      if (isExpanded) return;
      setHasOverflow(element.scrollHeight > element.clientHeight + 1);
    };

    check();

    const observer = new ResizeObserver(check);
    observer.observe(element);
    window.addEventListener("resize", check);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [children, isExpanded]);

  return {
    descriptionRef,
    hasOverflow,
  };
};

export default useDescriptionFade;
