import type { Genre } from "@/types/types";

export function getReleaseYear(releaseDate: string): string {
  if (!releaseDate) return "--";

  return releaseDate.split("-")[0];
}

export function getMoviesGenres(
  genreIds: number[] | undefined,
  genresList: Genre[],
): string[] {
  if (!genreIds) return [];

  return genreIds
    .map((id) => genresList.find((genre) => genre.id === id)?.name)
    .filter((name): name is string => Boolean(name));
}
