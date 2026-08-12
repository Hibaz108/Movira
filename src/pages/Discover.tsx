// components
import Title from "@/components/common/Title";
import MovieCard from "@/components/movie/MovieCard";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
// icons
import { SlidersHorizontal, Funnel, X } from "lucide-react";
// shadcn
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
// hooks
import { useGenres } from "@/hooks/useGenres";
import { useSearchParams } from "react-router-dom";
import { useDiscover } from "@/hooks/useDiscover";
import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";
// other
import { sortOptions } from "@/lib/sortOptions";
import { getReleaseYear } from "@/lib/movies";

const Discover = () => {
  const { data: genres } = useGenres();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSort = searchParams.get("sort") ?? "popularity.desc";
  const selectedGenreId =
    searchParams.get("genres")?.split(",").map(Number) ?? [];

  const {
    data,
    error,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDiscover({
    genres: selectedGenreId.join(","),
    sort: selectedSort,
  });

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  const handleSortChange = (value: string) => {
    setSearchParams(
      selectedGenreId.length > 0
        ? {
            genres: selectedGenreId.join(","),
            sort: sortOptions[value],
          }
        : {
            sort: sortOptions[value],
          },
    );
  };

  const desktopLoadMoreRef = useInfiniteScrollTrigger(
    fetchNextPage,
    !!hasNextPage && !isFetchingNextPage,
  );

  const handleGenreClick = (genreId: number) => {
    const updatedGenres = selectedGenreId.includes(genreId)
      ? selectedGenreId.filter((id) => id !== genreId)
      : [...selectedGenreId, genreId];

    setSearchParams(
      updatedGenres.length > 0
        ? { genres: updatedGenres.join(","), sort: selectedSort }
        : { sort: selectedSort },
    );
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error} onRetry={() => refetch()} />;

  return (
    <section className="min-h-svh my-4">
      <div className="container">
        {/* desktop */}
        <div className="w-full hidden sm:flex gap-4">
          {/* sidebar */}
          <aside className="w-1/4 shrink-0 flex flex-col gap-3">
            <Title title="Discover" />
            {/* sort */}
            <div className="space-y-3 mt-4">
              <p className="uppercase flex items-center gap-1 font-semibold font-heading text-sm">
                <SlidersHorizontal className="size-4" aria-hidden="true" />
                Sort by
              </p>

              <RadioGroup
                className="w-fit"
                value={Object.keys(sortOptions).find(
                  (key) => sortOptions[key] === selectedSort,
                )}
                onValueChange={handleSortChange}
              >
                <div className="flex items-center gap-3 ">
                  <RadioGroupItem value="most-popular" id="most-popular" />
                  <Label htmlFor="most-popular">Most Popular</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="least-popular" id="least-popular" />
                  <Label htmlFor="least-popular">Least Popular</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="highest-rated" id="highest-rated" />
                  <Label htmlFor="highest-rated">Highest Rated</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="newest-first" id="newest-first" />
                  <Label htmlFor="newest-first">Newest First</Label>
                </div>
              </RadioGroup>
            </div>
            {/* === sort === */}

            {/* genres */}
            <div className="space-y-3 mt-6">
              <p className="uppercase flex items-center gap-1 text-sm font-semibold font-heading">
                <Funnel className="size-4" aria-hidden="true" />
                Genres
              </p>

              {/* gen buttons */}
              <div className="flex flex-wrap gap-2">
                {genres?.map((gen) => (
                  <button
                    key={gen.id}
                    className={`py-1.5 px-4 border rounded-full text-sm transition-colors ${selectedGenreId.includes(gen.id) ? "border-primary bg-primary" : "border-border bg-card  hover:border-primary"}`}
                    onClick={() => handleGenreClick(gen.id)}
                    aria-pressed={selectedGenreId.includes(gen.id)}
                  >
                    {gen.name}
                  </button>
                ))}
              </div>
              {/* === gen buttons === */}

              {/* clear genres btn */}
              {selectedGenreId.length > 0 && (
                <button
                  className="flex items-center gap-1 text-sm text-red-600"
                  onClick={() => setSearchParams({ sort: selectedSort })}
                >
                  <X className="size-4" aria-hidden="true" /> Clear genres
                </button>
              )}

              {/* === clear genres btn === */}
            </div>
            {/* === genres === */}
          </aside>
          {/* === sidebar === */}

          {/* movies */}
          {movies.length === 0 ? (
            <div className="w-full pt-36 flex flex-col items-center text-center gap-2 ">
              <span className="text-muted">
                <Funnel
                  className="size-14"
                  strokeWidth={3}
                  aria-hidden="true"
                />
              </span>
              <h3 className="text-foreground font-semibold font-heading text-4xl">
                No movies found
              </h3>
              <p className="text-muted">
                Try adjusting your filters or selecting different genres to see
                more results.
              </p>
              <button
                className="btn-primary mt-4"
                onClick={() => setSearchParams({ sort: "popularity.desc" })}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
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
                    genresList={genres ?? []}
                  />
                ))}
              </div>

              <div
                ref={desktopLoadMoreRef}
                className="h-4"
                aria-hidden="true"
              />

              {isFetchingNextPage && (
                <div
                  className="flex justify-center py-6 text-primary mb-4"
                  aria-label="Loading more movies"
                >
                  <Spinner className="size-6" aria-hidden="true" />
                </div>
              )}
            </div>
          )}
          {/* === movies === */}
        </div>

        {/* === desktop === */}
      </div>
    </section>
  );
};

export default Discover;
