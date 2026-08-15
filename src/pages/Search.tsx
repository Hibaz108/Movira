// React
import { useState } from "react";
// React Router
import { Link } from "react-router-dom";
// icons
import { SearchIcon, ArrowRight } from "lucide-react";
// Shadcn
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
// hooks
import { useGenres } from "@/hooks/useGenres";
import { useDebounce } from "use-debounce";
import { useSearchMovies } from "@/hooks/useSearch";
import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";
// components
import MovieCard from "@/components/movie/MovieCard";
import ErrorMessage from "@/components/common/ErrorMessage";
// other
import { getReleaseYear } from "@/lib/movies";

const Search = () => {
  const { data: genres } = useGenres();
  const [userQuery, setUserQuery] = useState("");
  const [debouncedQuery] = useDebounce(userQuery, 600);
  const {
    data,
    error,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useSearchMovies(debouncedQuery);
  const searchResults = data?.pages.flatMap((page) => page.results) ?? [];
  const loadMoreRef = useInfiniteScrollTrigger(
    fetchNextPage,
    !!hasNextPage && !isFetchingNextPage,
  );

  return (
    <section className="min-h-svh mt-16 mb-6 ">
      <div className="container space-y-3">
        <InputGroup>
          <label htmlFor="movie-search" className="sr-only">
            Search for movies
          </label>
          <InputGroupInput
            id="movie-search"
            placeholder="Search for movies..."
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
          />
          <InputGroupAddon align="inline-start">
            <SearchIcon className="text-muted-foreground" aria-hidden="true" />
          </InputGroupAddon>
        </InputGroup>

        {!debouncedQuery.trim() ? (
          <>
            <h2 className="uppercase text-sm text-muted font-bold font-heading mt-10">
              Explore Genres
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              {genres?.slice(0, 9).map((genre) => (
                <Link
                  to={`/discover?genres=${genre.id}`}
                  key={genre.id}
                  className="bg-card px-5 py-1.5 font-semibold text-foreground border border-border rounded-full hover:border-primary transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
              <Link
                to="/genres"
                className="flex items-center gap-1 text-primary hover:underline transition-colors"
              >
                View All Genres
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </>
        ) : isLoading ? (
          <div className="mt-10 space-y-4">
            <Skeleton className="h-8 w-2/3 max-w-xl rounded-lg" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 20 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full aspect-[2/3] rounded-xl"
                />
              ))}
            </div>
          </div>
        ) : error ? (
          <ErrorMessage
            error={error}
            onRetry={() => refetch()}
            variant="fullpage"
          />
        ) : searchResults.length > 0 ? (
          <>
            <h2 className="mt-10 mb-4 text-2xl text-foreground font-bold font-heading">
              {`Results for "${debouncedQuery}"`}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  releaseYear={getReleaseYear(movie.release_date)}
                  id={movie.id}
                  genreIds={movie.genre_ids}
                  genresList={genres ?? []}
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
          </>
        ) : (
          <div className="min-h-80 p-4 flex flex-col justify-center items-center gap-2 text-center rounded-2xl">
            <span className="text-muted">
              <SearchIcon
                className="size-14"
                strokeWidth={3}
                aria-hidden="true"
              />
            </span>
            <h3 className="text-foreground font-semibold font-heading text-2xl">
              No movies found
            </h3>
            <p className="text-muted">{`We couldn't find any movies matching "${debouncedQuery}"`}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
