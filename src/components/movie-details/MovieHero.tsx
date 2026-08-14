import type { MovieDetails, Video } from "@/types/types";
import { IMG_BASE_URL } from "@/constants/constants";
import {
  Heart,
  BookmarkPlus,
  BookmarkCheck,
  Star,
  Calendar,
  Clock4,
  Earth,
  Play,
} from "lucide-react";
import { getReleaseYear, getRunTime, getFullLanguageName } from "@/lib/movies";
import { Link } from "react-router-dom";
import { useSavedMoviesStore } from "@/store/savedMoviesStore";

type MovieHeroProps = {
  movie: MovieDetails;
  trailer?: Video;
  handleShowTrailer: () => void;
};

const MovieHero = ({ movie, trailer, handleShowTrailer }: MovieHeroProps) => {
  const movieId = movie.id;
  const title = movie.title;
  const posterPath = movie.poster_path;
  const releaseYear = getReleaseYear(movie.release_date);
  const genreIds = movie.genres.map((genre) => genre.id);
  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useSavedMoviesStore();

  const isFavorite = favorites.some((m) => m.id === movieId);
  const isInWatchlist = watchlist.some((m) => m.id === movieId);

  return (
    <div className="container relative z-10 py-12 flex flex-col md:flex-row gap-4">
      {/* left */}
      <div className="flex-1 flex justify-center md:justify-start">
        <div className="w-56 md:w-64 lg:w-80">
          <div className="aspect-[2/3] shrink-0 overflow-hidden rounded-lg">
            {posterPath ? (
              <img
                src={`${IMG_BASE_URL}/${posterPath}`}
                draggable={false}
                className="h-full w-full object-cover"
                alt={movie.title}
              />
            ) : (
              <div className="w-full h-full bg-card flex items-center justify-center text-muted">
                <p>No poster</p>
              </div>
            )}
          </div>

          {trailer && (
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 mt-4 p-2 bg-primary
             text-black text-sm font-medium rounded-lg"
              onClick={handleShowTrailer}
            >
              <Play
                className="size-4 fill-black stroke-black"
                aria-hidden="true"
              />
              Play Trailer
            </button>
          )}

          {/* favorite & watchlist btns */}
          <div className="flex justify-between gap-2 mt-3 text-sm">
            <button
              type="button"
              className={`w-full flex items-center justify-center gap-2 text-foreground p-2 rounded-lg border
                    hover:border-primary transition-colors ${isFavorite ? "border-primary bg-primary/30 text-primary font-medium" : "bg-card border-border "} `}
              onClick={() => {
                if (isFavorite) {
                  removeFromFavorites(movieId);
                } else {
                  addToFavorites({
                    title,
                    id: movieId,
                    genreIds,
                    posterPath,
                    releaseYear,
                  });
                }
              }}
            >
              <Heart
                className={`size-4 ${isFavorite ? "fill-primary stroke-primary" : ""}`}
                aria-hidden="true"
              />
              {isFavorite ? "Favorited" : "Favorite"}
            </button>
            <button
              type="button"
              className={`w-full flex items-center justify-center gap-2 text-foreground p-2 rounded-lg border
                    hover:border-primary transition-colors ${isInWatchlist ? "bg-primary border-primary" : "bg-card border-border"}`}
              onClick={() => {
                if (isInWatchlist) {
                  removeFromWatchlist(movieId);
                } else {
                  addToWatchlist({
                    title,
                    id: movieId,
                    genreIds,
                    posterPath,
                    releaseYear,
                  });
                }
              }}
            >
              {isInWatchlist ? (
                <BookmarkCheck className="size-4" aria-hidden="true" />
              ) : (
                <BookmarkPlus className="size-4" aria-hidden="true" />
              )}
              {isInWatchlist ? "Listed" : "Watchlist"}
            </button>
          </div>
          {/* === favorite & watchlist btns === */}
        </div>
      </div>
      {/* === left === */}

      {/* right */}
      <div
        className="flex-2 flex flex-col items-center 
      md:items-start md:justify-center gap-4 text-center md:text-left md:pt-14"
      >
        <h1 className="text-3xl md:text-5xl text-white font-heading font-bold ">
          {movie.title}
        </h1>

        {movie.tagline && (
          <p className="text-muted italic font-light">{`"${movie.tagline}"`}</p>
        )}

        <div className="flex items-center gap-3 md:gap-6 text-muted text-xs sm:text-sm">
          <span className="flex items-center gap-1">
            <Star className="size-4 fill-primary stroke-primary" />
            {movie.vote_average > 0
              ? Number(movie.vote_average.toFixed(1))
              : "--"}
          </span>

          <span className="flex items-center gap-2">
            <Calendar className="size-4" /> {movie.release_date || "--"}
          </span>

          <span className="flex items-center gap-2">
            <Clock4 className="size-4" /> {getRunTime(movie.runtime)}
          </span>

          <span className="flex items-center gap-2">
            <Earth className="size-4" />
            {getFullLanguageName(
              movie.spoken_languages,
              movie.original_language,
            )}
          </span>
        </div>

        {/* genres */}
        <div className="flex justify-center md:justify-start flex-wrap gap-3 text-sm">
          {movie.genres.map((genre) => (
            <Link
              to={`/discover?genres=${genre.id}`}
              key={genre.id}
              className="bg-card text-foreground py-1 px-3 rounded-full border border-transparent hover:border-primary transition-colors"
            >
              {genre.name}
            </Link>
          ))}
        </div>
        {/* === genres === */}

        {/* overview */}
        <div className="flex flex-col items-center md:items-start mt-6 ">
          <div className="mb-2">
            <h1 className="text-xl text-white font-bold font-heading">
              Overview
            </h1>
            <div className="w-8 h-1 bg-primary rounded-full"></div>
          </div>
          <p className="text-muted">
            {movie.overview || "No overview available."}
          </p>
        </div>
        {/* === overview === */}
      </div>
      {/* === right === */}
    </div>
  );
};

export default MovieHero;
