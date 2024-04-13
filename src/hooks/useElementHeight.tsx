import { useEffect, useState, RefObject } from "react";

export const useElementHeight = (elementRef: RefObject<HTMLElement>) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (elementRef.current) {
        const newHeight = elementRef.current.offsetHeight;
        setHeight(newHeight);
      }
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [elementRef]);

  return height;
};
