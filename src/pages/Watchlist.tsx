import { Bookmark } from "lucide-react";
import Title from "@/components/common/Title";
import { useSavedMoviesStore } from "@/store/savedMoviesStore";
import MovieCard from "@/components/movie/MovieCard";
import { useGenres } from "@/hooks/useGenres";
import EmptyState from "@/components/common/ِEmptyState";

const Watchlist = () => {
  const watchlist = useSavedMoviesStore((state) => state.watchlist);
  const { data: genres } = useGenres();

  return (
    <section className="min-h-svh my-4">
      <div className="container">
        <Bookmark
          className="size-8 fill-primary stroke-primary"
          aria-hidden="true"
        />
        <Title title="Favorites" />

        <p className="text-muted mt-3">Movies you're planning to watch. </p>
        <p className="mt-3 text-primary text-xs">
          {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"} in
          your Watchlist.
        </p>

        {watchlist.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {watchlist.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                posterPath={movie.posterPath}
                releaseYear={movie.releaseYear}
                id={movie.id}
                genreIds={movie.genreIds}
                genresList={genres ?? []}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            Icon={Bookmark}
            title="Your watchlist is empty"
            description="Keep track of movies you want to see by adding them to your watchlist."
            buttonLabel="See Trending Movies"
            buttonLink="/trending"
          />
        )}
      </div>
    </section>
  );
};

export default Watchlist;
