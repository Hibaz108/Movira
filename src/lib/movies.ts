import type { Genre } from "@/types/types";

export function getReleaseYear(releaseDate: string):string {
  if (!releaseDate) return "--";

  return releaseDate.split("-")[0];
}

export function getMoviesGenres(genreIds: number[], genresList: Genre[]) {
  return genreIds.map(
    (id) => genresList.find((genre) => genre?.id === id)?.name,
  );
}
