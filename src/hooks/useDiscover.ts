import { useInfiniteQuery } from "@tanstack/react-query";
import { getDiscoverMovies } from "@/api/moviesApi";
import type { DiscoverParams } from "@/types/types";

export const useDiscover = ({ genres, sort }: DiscoverParams) =>
  useInfiniteQuery({
    queryKey: ["discover", genres, sort],
    queryFn: ({ pageParam }) => getDiscoverMovies(pageParam, genres, sort),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
