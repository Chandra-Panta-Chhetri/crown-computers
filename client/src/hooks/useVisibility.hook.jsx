import { useRef, useCallback } from "react";

const useVisibility = (
  options,
  onVisibility,
  args,
  isLoading,
  hasMoreToLoad
) => {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      if (!hasMoreToLoad) return;
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          onVisibility(...args);
        }
      }, options);
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, onVisibility, options, hasMoreToLoad, args]
  );

  return lastElementRef;
};

export default useVisibility;
