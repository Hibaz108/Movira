import type { DiscoverMoviesProps } from "@/types/types";
import MovieCard from "@/components/movie/MovieCard";
import { getReleaseYear } from "@/lib/movies";
import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";
import { Spinner } from "@/components/ui/spinner";

const DiscoverMovies = ({
  movies,
  genres,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetchNextPageError,
}: DiscoverMoviesProps) => {
  const loadMoreRef = useInfiniteScrollTrigger(
    fetchNextPage,
    hasNextPage && !isFetchingNextPage,
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            releaseYear={getReleaseYear(movie.release_date)}
            id={movie.id}
            genreIds={movie.genre_ids}
            genresList={genres}
          />
        ))}
      </div>

      <div ref={loadMoreRef} className="h-4" aria-hidden="true" />

      {isFetchingNextPage && (
        <div
          className="flex justify-center py-6 text-primary mb-4"
          aria-label="Loading more movies"
        >
          <Spinner className="size-6" aria-hidden="true" />
        </div>
      )}

      {isFetchNextPageError && !isFetchingNextPage && (
        <div className="flex flex-col items-center gap-2 py-4">
          <p className="text-center text-muted text-sm">
            Couldn't load more movies.
          </p>
          <button
            type="button"
            onClick={fetchNextPage}
            className="text-primary text-sm font-medium hover:underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscoverMovies;
