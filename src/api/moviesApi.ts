import { API_KEY, BASE_URL } from "@/constants/constants";
import type { Movies } from "@/types/types";

export const searchMovies = async (
  page: number = 1,
  userQuery: string,
): Promise<Movies> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(userQuery)}&page=${page}`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.status_message || "Failed to fetch movies");
  }
  return data;
};
