// React Router
import { Link } from "react-router-dom";
// hooks
import { useTrendingMovies } from "@/hooks/useTrending";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useState } from "react";
// components
import TrailerModal from "@/components/common/TrailerModal";
import ErrorMessage from "@/components/common/ErrorMessage";
// shadcn
import { Skeleton } from "@/components/ui/skeleton";
// icons
import { Star, Play, Info } from "lucide-react";
// other
import { getReleaseYear, getRunTime } from "@/lib/movies";
import { BACKDROP_BASE_URL } from "@/constants/constants";

const Hero = () => {
  const {
    data: trendingMovies,
    isLoading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useTrendingMovies("week");
  const movieId = trendingMovies?.pages[0]?.results[0]?.id;
  const {
    data: movie,
    isLoading: movieLoading,
    error: movieError,
    refetch: refetchMovie,
  } = useMovieDetails(movieId);
  const [showTrailer, setShowTrailer] = useState(false);

  const isLoading = trendingLoading || movieLoading;
  const hasNoTrending = !trendingLoading && !trendingError && !movieId;

  const videos = movie?.videos.results ?? [];
  const trailer =
    videos.find(
      (v) =>
        v.site === "YouTube" &&
        v.type === "Trailer" &&
        v.name.toLowerCase().includes("official"),
    ) ?? videos.find((v) => v.site === "YouTube" && v.type === "Trailer");

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  if (trendingError || movieError) {
    const error = trendingError ?? movieError;
    const onRetry = trendingError ? refetchTrending : refetchMovie;

    return (
      <div className="relative min-h-[90svh] mb-6 md:mb-10 flex items-center">
        <div className="container">
          <ErrorMessage error={error} onRetry={onRetry} variant="hero" />
        </div>
      </div>
    );
  }

  if (hasNoTrending) {
    return (
      <div className="relative min-h-[90svh] mb-6 md:mb-10 flex items-center">
        <div className="container">
          <ErrorMessage
            error={new Error("No trending movies available right now.")}
            onRetry={() => refetchTrending()}
            variant="hero"
          />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative min-h-[85svh] mb-10">
        <div className="container relative min-h-[90svh] flex flex-col justify-center gap-6">
          <Skeleton className="h-12 md:h-16 w-2/3 max-w-xl rounded-lg" />

          <div className="flex items-center gap-6">
            <Skeleton className="h-4 w-12 rounded" />
            <Skeleton className="h-4 w-10 rounded" />
            <Skeleton className="h-4 w-14 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
          </div>

          <div className="max-w-2xl space-y-2">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-40 rounded-3xl" />
            <Skeleton className="h-12 w-32 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-[90svh] bg-cover bg-center bg-no-repeat mb-6 md:mb-10"
      style={{
        backgroundImage: movie?.backdrop_path
          ? `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`
          : undefined,
      }}
    >
      {/* background overlay */}
      <div className="absolute inset-0 bg-black/40" />
      {/* background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent" />

      {/* hero content */}
      <div className="container relative z-10 min-h-[90svh] flex flex-col justify-center gap-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-heading font-bold">
          {movie?.title}
        </h1>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-muted text-xs sm:text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-primary stroke-primary" />
              {movie?.vote_average?.toFixed(1) ?? "--"}
            </span>
            <span>{getReleaseYear(movie?.release_date ?? "--")}</span>
            <span>{getRunTime(movie?.runtime)}</span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-white">
            {movie?.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full px-4 py-2 bg-muted/30"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        <p className="max-w-2xl text-gray-300 text-sm md:text-base line-clamp-3 leading-6">
          {movie?.overview}
        </p>

        <div className="flex items-center gap-3 text-sm">
          {trailer && (
            <button
              type="button"
              onClick={() => setShowTrailer(true)}
              className="flex items-center gap-2 bg-primary px-6 py-3 rounded-3xl text-black font-medium hover:scale-105 transition-transform"
            >
              <Play
                className="size-4 fill-black stroke-black"
                aria-hidden="true"
              />
              Watch Trailer
            </button>
          )}

          <Link
            to={`/movie/${movie?.id}`}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-3xl text-white hover:bg-white/20 transition-colors"
          >
            <Info className="size-4" aria-hidden="true" />
            More Info
          </Link>
        </div>
      </div>
      {/* === hero content === */}

      {/* trailer modal */}
      {showTrailer && trailer && (
        <TrailerModal
          trailer={trailer}
          handleCloseTrailer={handleCloseTrailer}
        />
      )}
      {/* === trailer modal === */}
    </div>
  );
};

export default Hero;
