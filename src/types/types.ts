import type { LucideIcon } from "lucide-react";

export type ThemeStore = {
  theme: "dark" | "light";
  toggleTheme: () => void;
};

export type Genre = {
  id: number;
  name: string;
};

export type ErrorMessageProps = {
  error?: Error | null;
  onRetry?: () => void;
};

export type Movie = {
  backdrop_path: string | null;
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  genre_ids?: number[];
  release_date: string;
  vote_average: number;
};

export type Movies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieCardProps = {
  id: number;
  title: string;
  posterPath: string | null;
  releaseYear: string;
  genreIds?: number[];
  genresList: Genre[];
};

export type SavedMovie = {
  id: number;
  title: string;
  posterPath: string | null;
  releaseYear: string;
  genreIds: number[];
};

export type SavedMoviesStore = {
  favorites: SavedMovie[];
  addToFavorites: (movie: SavedMovie) => void;
  removeFromFavorites: (id: number) => void;
  watchlist: SavedMovie[];
  addToWatchlist: (movie: SavedMovie) => void;
  removeFromWatchlist: (id: number) => void;
};

export type EmptyStateProps = {
  Icon: LucideIcon;
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
};

export type IconBadgeLinkProps = {
  to: string;
  label: string;
  count: number;
  Icon: LucideIcon;
};

export type DiscoverParams = {
  genres: string;
  sort: string;
};

export type DiscoverMoviesProps = {
  genres: Genre[];
  movies: Movie[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export type DiscoverEmptyStateProps = {
  onReset: () => void;
};

export type DiscoverFiltersProps = {
  genres: Genre[];
  selectedGenreId: number[];
  selectedSortKey: string | undefined;
  onSortChange: (value: string) => void;
  onGenreClick: (id: number) => void;
  onClearGenres: () => void;
};
