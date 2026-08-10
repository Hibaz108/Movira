import { useInfiniteQuery } from "@tanstack/react-query";
import { searchMovies } from "@/api/moviesApi";

export const useSearchMovies = (userQuery: string) => {
  return useInfiniteQuery({
    queryKey: ["search", userQuery],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      searchMovies(pageParam, userQuery),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: !!userQuery.trim(),
  });
};
