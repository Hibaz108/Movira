import type { Movie } from "@/types/types";
import MovieCard from "@/components/movie/MovieCard";
import { useGenres } from "@/hooks/useGenres";
import { getReleaseYear } from "@/lib/movies";

const RecommendationsList = ({
  recommendations,
}: {
  recommendations: Movie[];
}) => {
  const { data: genres } = useGenres();

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-6 w-1 bg-primary rounded-full"></div>
        <h1 className="text-lg font-bold text-foreground font-heading">
          You might also like
        </h1>
      </div>

      <div className="flex overflow-x-auto scrollbar-hide gap-4  ">
        {recommendations.slice(0, 10).map((mov) => (
          <MovieCard
            key={mov.id}
            title={mov.title}
            posterPath={mov.poster_path}
            releaseYear={getReleaseYear(mov.release_date)}
            id={mov.id}
            genreIds={mov.genre_ids}
            genresList={genres ?? []}
            className="shrink-0 w-32 sm:w-36 md:w-40 "
          />
        ))}
      </div>
    </>
  );
};

export default RecommendationsList;
