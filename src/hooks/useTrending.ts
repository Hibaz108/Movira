import { useInfiniteQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "@/api/moviesApi";

export const useTrendingMovies = (period: "week" | "day") => {
  return useInfiniteQuery({
    queryKey: ["trending", period],
    queryFn: ({ pageParam }) => getTrendingMovies(period, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
};
