// React Router
import { useParams, useNavigate } from "react-router-dom";
// hooks
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useState } from "react";
// icons
import { ArrowLeft } from "lucide-react";
// components
import MovieHero from "@/components/movie-details/MovieHero";
import TrailerModal from "@/components/common/TrailerModal";
import CastList from "@/components/movie-details/CastList";
import ReviewsList from "@/components/movie-details/ReviewsList";
import RecommendationsList from "@/components/movie-details/RecommendationsList";
import Loader from "@/components/common/Loader";
import ErrorMessage from "@/components/common/ErrorMessage";
// other
import { BACKDROP_BASE_URL } from "@/constants/constants";

const MovieDetails = () => {
  const { id } = useParams();
  const movieId = Number(id);
  const navigate = useNavigate();
  const { data: movie, isLoading, error, refetch } = useMovieDetails(movieId);
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const videos = movie?.videos?.results ?? [];
  const cast = movie?.credits?.cast ?? [];
  const reviews = movie?.reviews?.results ?? [];
  const recommendations = movie?.recommendations?.results ?? [];

  const trailer =
    videos.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.name.toLowerCase().includes("official"),
    ) ??
    videos.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );

  const handleShowTrailer = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error} onRetry={() => refetch()} />;

  return (
    <>
      <section
        className="relative min-h-svh bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BACKDROP_BASE_URL}${movie?.backdrop_path})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />

        {/* back btn */}
        <div className="container relative z-10 pt-12">
          <button
            type="button"
            className="flex items-center gap-2 text-primary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Back
          </button>
        </div>
        {/* === back btn === */}

        {/* Hero */}
        {movie && (
          <MovieHero
            movie={movie}
            trailer={trailer}
            handleShowTrailer={handleShowTrailer}
          />
        )}
        {/* === Hero === */}
      </section>

      <div className="container space-y-10 pt-12">
        {/* top cast */}
        {cast.length > 0 && <CastList cast={cast} />}
        {/* === top cast === */}

        {/* reviews */}
        {reviews.length > 0 && <ReviewsList reviews={reviews} />}
        {/* === reviews === */}

        {/* recommendations */}
        {recommendations.length > 0 && (
          <RecommendationsList recommendations={recommendations} />
        )}
        {/* recommendations */}

        {showTrailer && trailer && (
          <TrailerModal
            handleCloseTrailer={handleCloseTrailer}
            trailer={trailer}
          />
        )}
      </div>
    </>
  );
};

export default MovieDetails;
