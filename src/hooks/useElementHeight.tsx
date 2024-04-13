import { useEffect, useState, RefObject } from "react";

export const useContainerDimensions = (elementRef: RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    const getDimensions = () => ({
      width: elementRef.current ? elementRef.current.offsetWidth : 0,
      height: elementRef.current ? elementRef.current.offsetHeight : 0,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (elementRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [elementRef]);

  return dimensions;
};
