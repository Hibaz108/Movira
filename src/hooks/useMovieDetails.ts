import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "@/api/moviesApi";

export const useMovieDetails = (id?: number) =>
  useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => getMovieDetails(id!),
    enabled: typeof id === "number" && Number.isInteger(id) && id > 0,
  });
