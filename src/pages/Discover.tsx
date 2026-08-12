// components
import Title from "@/components/common/Title";
import DiscoverFiltersDesktop from "@/components/discover/DiscoverFiltersDesktop";
import DiscoverFiltersMobile from "@/components/discover/DiscoverFiltersMobile";
import DiscoverMovies from "@/components/discover/DiscoverMovies";
import DiscoverEmptyState from "@/components/discover/DiscoverEmptyState";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
// icons
import { Funnel } from "lucide-react";
// shadcn
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
// hooks
import { useGenres } from "@/hooks/useGenres";
import { useSearchParams } from "react-router-dom";
import { useDiscover } from "@/hooks/useDiscover";
// other
import { sortOptions } from "@/lib/sortOptions";

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

  const handleClearGenres = () => {
    setSearchParams({ sort: selectedSort });
  };

  const handleResetFilters = () => {
    setSearchParams({ sort: "popularity.desc" });
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error} onRetry={() => refetch()} />;

  const genreList = genres ?? [];

  const selectedSortKey = Object.keys(sortOptions).find(
    (key) => sortOptions[key] === selectedSort,
  );

  return (
    <section className="min-h-svh my-4">
      <div className="container">
        {/* desktop */}
        <div className="w-full hidden sm:flex gap-4">
          {/* sidebar */}
          <aside className="w-1/4 shrink-0 flex flex-col gap-3">
            <Title title="Discover" />

            <DiscoverFiltersDesktop
              genres={genreList}
              selectedGenreId={selectedGenreId}
              selectedSortKey={selectedSortKey}
              onSortChange={handleSortChange}
              onGenreClick={handleGenreClick}
              onClearGenres={handleClearGenres}
            />
          </aside>
          {/* === sidebar === */}

          {/* movies */}
          {movies.length === 0 ? (
            <DiscoverEmptyState onReset={handleResetFilters} />
          ) : (
            <DiscoverMovies
              genres={genreList}
              movies={movies}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
          {/* === movies === */}
        </div>
        {/* === desktop === */}

        {/* mobile */}
        <div className="sm:hidden space-y-5">
          <div className="flex justify-between text-foreground">
            <h1 className="text-2xl font-heading font-bold">Discover</h1>
            {/* filter menu */}
            <Drawer swipeDirection="left">
              <DrawerTrigger
                className="flex items-center gap-2 bg-surface py-2 px-5 rounded-xl"
                render={
                  <button>
                    <Funnel className="size-4" aria-hidden="true" /> Filters
                  </button>
                }
              />
              <DrawerContent className="bg-background border-none">
                <DrawerHeader>
                  <DrawerTitle className="font-bold text-2xl pt-3">
                    Filters
                  </DrawerTitle>
                </DrawerHeader>
                <DiscoverFiltersMobile
                  genres={genreList}
                  selectedGenreId={selectedGenreId}
                  selectedSortKey={selectedSortKey}
                  onSortChange={handleSortChange}
                  onGenreClick={handleGenreClick}
                  onClearGenres={handleClearGenres}
                />
              </DrawerContent>
            </Drawer>
          </div>
          {/* === filter menu === */}

          {movies.length === 0 ? (
            <DiscoverEmptyState onReset={handleResetFilters} />
          ) : (
            <DiscoverMovies
              genres={genreList}
              movies={movies}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </div>
        {/* === mobile === */}
      </div>
    </section>
  );
};

export default Discover;
