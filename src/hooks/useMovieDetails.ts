import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "@/api/moviesApi";

export const useMovieDetails = (id: number) =>
  useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => getMovieDetails(id),
    enabled: Number.isInteger(id) && id> 0,
  });
