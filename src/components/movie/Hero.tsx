// React Router
import { Link } from "react-router-dom";
// hooks
import { useTrendingMovies } from "@/hooks/useTrending";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useState } from "react";
// components
import TrailerModal from "../common/TrailerModal";
import Loader from "../common/Loader";
// icons
import { Star, Play, Info } from "lucide-react";
// other
import { getReleaseYear, getRunTime } from "@/lib/movies";
import { BACKDROP_BASE_URL } from "@/constants/constants";

const Hero = () => {
  const { data: trendingMovies, isLoading: trendingLoading } =
    useTrendingMovies("week");
  const movieId = trendingMovies?.pages[0]?.results[0]?.id;
  const { data: movie, isLoading: movieLoading } = useMovieDetails(movieId);
  const [showTrailer, setShowTrailer] = useState(false);

  const isLoading = trendingLoading || !movieId || movieLoading;

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

  if (isLoading) return <Loader />;

  return (
    <div
      className="relative min-h-[90svh] bg-cover bg-center bg-no-repeat mb-4 md:mb-10"
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
