import { useEffect, useRef, useState } from "react";

const useDescriptionFade = (children: React.ReactNode) => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const element = descriptionRef.current;
    if (element) {
      setHasOverflow(element.scrollHeight > element.clientHeight);
    }
  }, [children]);

  return {
    descriptionRef,
    hasOverflow,
  };
};

export default useDescriptionFade;
