import { API_KEY, BASE_URL } from "@/constants/constants";
import { fetchApi } from "@/api/api";
import type { Genre } from "@/types/types";

export const getGenres = async (): Promise<Genre[]> => {
  const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;

  const data = await fetchApi<{ genres: Genre[] }>(
    url,
    "Failed to fetch genres",
  );

  return data.genres;
};
