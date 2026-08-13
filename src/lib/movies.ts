import type { Genre, Language } from "@/types/types";

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

export function getFullLanguageName(
  spokenLanguages?: Language[],
  originalLanguage?: string,
) {
  return (
    spokenLanguages?.find((l) => l.iso_639_1 === originalLanguage)
      ?.english_name ?? "Unknown"
  );
}

export function getRunTime(minutes?: number) {
  if (minutes == null || minutes === 0) return "Unknown";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours && mins) return `${hours}h ${mins}m`;
  if (hours) return `${hours}h`;
  return `${mins}m`;
}
