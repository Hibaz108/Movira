import { API_KEY, BASE_URL } from "@/constants/constants";
import type { Movies } from "@/types/types";

export const searchMovies = async (
  userQuery: string,
  page: number = 1,
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

export const getTrendingMovies = async (
  selectedPeriod: "week" | "day",
  page: number = 1,
): Promise<Movies> => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/${selectedPeriod}?api_key=${API_KEY}&page=${page}`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.status_message || "Failed to fetch trending movies");
  }
  return data;
};

export const getTopRatedMovies = async (page: number = 1): Promise<Movies> => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.status_message || "Failed to fetch top rated movies");
  }
  return data;
};
