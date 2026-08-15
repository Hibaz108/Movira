// React Router
import { Link } from "react-router-dom";
// types
import type { MovieCardProps } from "@/types/types";
// constants
import { IMG_BASE_URL } from "@/constants/constants";
// icons
import { BookmarkPlus, Heart } from "lucide-react";
// other
import { getMoviesGenres } from "@/lib/movies";
import { useSavedMoviesStore } from "@/store/savedMoviesStore";
import { cn } from "@/lib/utils";

const MovieCard = ({
  title,
  posterPath,
  releaseYear,
  id,
  genreIds,
  genresList,
  className,
}: MovieCardProps) => {
  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useSavedMoviesStore();

  const isFavorite = favorites.some((movie) => movie.id === id);
  const isInWatchlist = watchlist.some((movie) => movie.id === id);
  const genres = getMoviesGenres(genreIds, genresList);

  return (
    <Link
      to={`/movie/${id}`}
      className={cn("group space-y-3 cursor-pointer", className)}
    >
      <div
        className="relative aspect-2/3 rounded-2xl overflow-hidden border border-transparent group-hover:border-primary active:border-primary
 transition-all"
      >
        {posterPath ? (
          <img
            src={`${IMG_BASE_URL}/${posterPath}`}
            draggable={false}
            className="h-full w-full object-cover"
            alt={title}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted bg-card">
            <p>No poster</p>
          </div>
        )}

        <div
          className="absolute top-2 right-2 flex flex-col gap-2 opacity-100 md:opacity-0 
        translate-x-1 transition-all duration-300 md:group-hover:opacity-100 md:group-hover:translate-x-0"
        >
          <button
            type="button"
            className="flex items-center justify-center p-2 bg-black/50 rounded-full text-white"
            aria-label={`Add ${title} to watchlist`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isInWatchlist) {
                removeFromWatchlist(id);
              } else {
                addToWatchlist({
                  title,
                  posterPath,
                  releaseYear,
                  id,
                  genreIds: genreIds ?? [],
                });
              }
            }}
          >
            <BookmarkPlus
              className={`size-4 ${isInWatchlist ? "fill-primary stroke-primary" : "fill-transparent"}`}
              strokeWidth={3}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            className="flex items-center justify-center p-2 bg-black/50 rounded-full text-white"
            aria-label={`Add ${title} to favorites`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isFavorite) {
                removeFromFavorites(id);
              } else {
                addToFavorites({
                  title,
                  posterPath,
                  releaseYear,
                  id,
                  genreIds: genreIds ?? [],
                });
              }
            }}
          >
            <Heart
              strokeWidth={3}
              className={`size-4 ${isFavorite ? "fill-primary stroke-primary" : "fill-transparent"}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-foreground text-sm group-hover:text-primary font-bold font-heading line-clamp-1 transition-colors">
          {title}
        </p>
        <div className="flex justify-between gap-6 text-muted text-xs font-medium">
          <span>{releaseYear}</span>
          <span className="line-clamp-1">
            {genres.slice(0, 2).join(", ") || "--"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
