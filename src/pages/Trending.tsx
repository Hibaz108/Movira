// components
import Title from "@/components/common/Title";
import ErrorMessage from "@/components/common/ErrorMessage";
import MovieCard from "@/components/movie/MovieCard";
// hooks
import { useState } from "react";
import { useTrendingMovies } from "@/hooks/useTrending";
import { useGenres } from "@/hooks/useGenres";
import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";
// shadcn
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
// other
import { getReleaseYear } from "@/lib/movies";

const Trending = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"day" | "week">("week");
  const {
    data,
    error,
    refetch,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useTrendingMovies(selectedPeriod);
  const { data: genres } = useGenres();
  const movies = data?.pages.flatMap((page) => page.results) ?? [];
  const loadMoreRef = useInfiniteScrollTrigger(
    fetchNextPage,
    !!hasNextPage && !isFetchingNextPage,
  );

  if (isLoading) {
    return (
      <section className="min-h-svh my-4">
        <div className="container space-y-4">
          <Skeleton className="h-8 md:h-12 w-1/3 max-w-xl rounded-lg" />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-4 md:h-6 w-2/3 max-w-xl rounded-lg" />

            <Skeleton className="h-10 w-36 rounded-md" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 20 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full aspect-[2/3] rounded-xl"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (error)
    return (
      <ErrorMessage
        error={error}
        onRetry={() => refetch()}
        variant="fullpage"
      />
    );

  return (
    <section className="min-h-svh my-4">
      <div className="container space-y-4">
        <Title title="Trending Movies" />

        {/* daily and weekly trending toggle */}
        <div className="flex flex-col gap-3 sm:justify-between sm:items-center sm:flex-row">
          <p className="text-muted">
            The most popular movies being watched right now.
          </p>

          <div className="bg-surface w-fit p-1.5 text-sm text-foreground rounded-md">
            <button
              className={`py-2 px-3 ${selectedPeriod === "day" ? "bg-background rounded-sm" : "text-muted"} transition-colors duration-500`}
              onClick={() => setSelectedPeriod("day")}
            >
              Today
            </button>
            <button
              className={`py-2 px-3 ${selectedPeriod === "week" ? "bg-background rounded-sm" : "text-muted"} transition-colors duration-500`}
              onClick={() => setSelectedPeriod("week")}
            >
              This Week
            </button>
          </div>
        </div>
        {/* === daily and weekly trending toggle === */}

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
    </section>
  );
};

export default Trending;
