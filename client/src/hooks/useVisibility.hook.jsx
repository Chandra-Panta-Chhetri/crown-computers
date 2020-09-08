import { useRef, useCallback } from "react";

const useVisibility = (options, onVisibility, isLoading, hasMoreToLoad) => {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      if (!hasMoreToLoad) return;
      observer.current = new IntersectionObserver(([entry]) => {
        console.log(entry);
        if (entry.isIntersecting) {
          onVisibility();
        }
      }, options);
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, onVisibility, options]
  );

  return lastElementRef;
};

export default useVisibility;
