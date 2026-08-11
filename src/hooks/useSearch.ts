import { useInfiniteQuery } from "@tanstack/react-query";
import { searchMovies } from "@/api/moviesApi";

export const useSearchMovies = (userQuery: string) => {
  return useInfiniteQuery({
    queryKey: ["search", userQuery],
    queryFn: ({ pageParam }) => searchMovies(userQuery,pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: !!userQuery.trim(),
  });
};
