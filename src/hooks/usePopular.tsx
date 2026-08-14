import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "@/api/moviesApi";

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popular"],
    queryFn: () => getPopularMovies(),
  });
};
