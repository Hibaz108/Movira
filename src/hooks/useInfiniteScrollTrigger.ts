import { useEffect, useRef } from "react";

export const useInfiniteScrollTrigger = (
  onIntersect: () => void|Promise<unknown>,
  enabled: boolean,
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && onIntersect(),
      { rootMargin: "300px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onIntersect, enabled]);

  return ref;
};
