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
  title?: string;
  variant?: "section" | "fullpage" | "hero";
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
  className?: string;
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
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetchNextPageError: boolean;
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

export type MovieDetails = {
  backdrop_path: string | null;
  genres: {
    id: number;
    name: string;
  }[];

  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;

  release_date: string;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  tagline: string;
  title: string;
  vote_average: number;

  credits: {
    cast: Actor[];
  };

  reviews: {
    page: number;
    results: Review[];
    total_pages: number;
    total_results: number;
  };

  recommendations: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };

  videos: {
    results: Video[];
  };
};

export type Actor = {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
};

export type Review = {
  author: string;
  author_details: {
    name: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  id: string;
};

export type Video = {
  name: string;
  key: string;
  site: string;
  type: string;
  id: string;
};

export type Language = {
  iso_639_1: string;
  english_name: string;
  name: string;
};

export type TrailerModalProps = {
  handleCloseTrailer: () => void;
  trailer: Video;
};

export type MovieSectionProps = {
  title: string;
  movies: Movie[];
  linkPath?: string;
};
