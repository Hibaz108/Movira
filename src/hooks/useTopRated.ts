import { useInfiniteQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "@/api/moviesApi";

export const useTopRatedMovies = () => {
  return useInfiniteQuery({
    queryKey: ["top-rated"],
    queryFn: ({ pageParam }) => getTopRatedMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
};
