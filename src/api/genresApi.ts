import { API_KEY, BASE_URL } from "@/constants/constants";
import type { Genre } from "@/types/types";

export const getGenres = async (): Promise<Genre[]> => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.status_message || "Failed to fetch genres");
  }

  return data.genres;
};
