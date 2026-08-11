import { Heart } from "lucide-react";
import Title from "@/components/common/Title";
import { useSavedMoviesStore } from "@/store/savedMoviesStore";
import MovieCard from "@/components/movie/MovieCard";
import { useGenres } from "@/hooks/useGenres";
import EmptyState from "@/components/common/ِEmptyState";

const Favorites = () => {
  const favorites = useSavedMoviesStore((state) => state.favorites);
  const { data: genres } = useGenres();

  return (
    <section className="min-h-svh my-4">
      <div className="container">
        <Heart
          className="size-8 fill-primary stroke-primary"
          aria-hidden="true"
        />
        <Title title="Favorites" />

        <p className="text-muted mt-3">
          Your personal collection of beloved movies.
        </p>
        <p className="mt-3 text-primary text-xs">
          {favorites.length} {favorites.length === 1 ? "movie" : "movies"} in
          your Favorites.
        </p>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {favorites.map((movie) => (
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
            Icon={Heart}
            title="No favorites yet"
            description="You haven't added any movies to your favorites list."
            buttonLabel="Discover Movies"
            buttonLink="/discover"
          />
        )}
      </div>
    </section>
  );
};

export default Favorites;
