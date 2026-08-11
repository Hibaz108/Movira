// components
import Title from "@/components/common/Title";
import MovieCard from "@/components/movie/MovieCard";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
// hooks
import { useTopRatedMovies } from "@/hooks/useTopRated";
import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";
import { useGenres } from "@/hooks/useGenres";
// shadcn
import { Spinner } from "@/components/ui/spinner";
// other
import { getReleaseYear } from "@/lib/movies";

const TopRated = () => {
  const {
    data,
    error,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTopRatedMovies();

  const movies = data?.pages.flatMap((page) => page.results) ?? [];
  const { data: genres } = useGenres();
  const loadMoreRef = useInfiniteScrollTrigger(fetchNextPage, !!hasNextPage);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error} onRetry={() => refetch()} />;

  return (
    <section className="min-h-svh my-4">
      <div className="container space-y-4">
        <Title title="Top Rated" />
        <p className="text-muted">The highest rated movies on TMDB. </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                releaseYear={getReleaseYear(movie.release_date)}
                id={movie.id}
                genreIds={movie.genre_ids}
                genresList={genres ?? []}
              />
            );
          })}
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
      </div>
    </section>
  );
};

export default TopRated;
