import { useRef, useCallback } from "react";

const usePaginationOnIntersection = (
  fetchMore,
  fetchMoreFuncArgs,
  isFetchingMore,
  hasMoreToFetch
) => {
  const observer = useRef();
  const triggerPaginationOnIntersection = useCallback(
    (elementNode) => {
      if (isFetchingMore) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      if (!hasMoreToFetch) return;
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            fetchMore(...fetchMoreFuncArgs);
          }
        },
        { threshold: 0.9 }
      );
      if (elementNode) {
        observer.current.observe(elementNode);
      }
    },
    [isFetchingMore, fetchMore, hasMoreToFetch, fetchMoreFuncArgs]
  );

  return triggerPaginationOnIntersection;
};

export default usePaginationOnIntersection;
