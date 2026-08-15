import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies } from "@/api/moviesApi";

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ["now-playing"],
    queryFn: () => getNowPlayingMovies(),
  });
};
