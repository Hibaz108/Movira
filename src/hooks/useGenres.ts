import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/api/genresApi";

export const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
