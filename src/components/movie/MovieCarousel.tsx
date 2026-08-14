// embla carousel react
import useEmblaCarousel from "embla-carousel-react";
// hooks
import { useGenres } from "@/hooks/useGenres";
// components
import MovieCard from "./MovieCard";
// icons
import { ChevronLeft, ChevronRight } from "lucide-react";
// other
import { getReleaseYear } from "@/lib/movies";
import type { Movie } from "@/types/types";

const MovieCarousel = ({ movies }: { movies: Movie[] }) => {
  const { data: genres } = useGenres();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 2,
    duration: 70,
  });

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };
  return (
    <div className="relative group/carousel">
      {/* left btn */}
      <button
        type="button"
        onClick={scrollPrev}
        className="
        absolute left-2 top-1/2 -translate-y-1/2 z-10
        hidden size-10 group-hover/carousel:flex
        items-center justify-center
        rounded-full bg-black/60 text-white
        hover:bg-primary transition"
        aria-label="Previous movies"
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      {/* === left btn === */}

      {/* carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-3">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="
              pl-3
              flex-[0_0_50%]
              sm:flex-[0_0_33.333%]
              lg:flex-[0_0_25%]
              xl:flex-[0_0_20%]
              "
            >
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                releaseYear={getReleaseYear(movie.release_date)}
                genreIds={movie.genre_ids}
                genresList={genres ?? []}
              />
            </div>
          ))}
        </div>
      </div>
      {/* === carousel === */}

      {/* right btn */}
      <button
        type="button"
        onClick={scrollNext}
        className="
        absolute right-2 top-1/2 -translate-y-1/2 z-10
        hidden size-10 group-hover/carousel:flex
        items-center justify-center
        rounded-full bg-black/60 text-white
        hover:bg-primary transition"
        aria-label="Next movies"
      >
        <ChevronRight aria-hidden="true" />
      </button>
      {/* === right btn === */}
    </div>
  );
};

export default MovieCarousel;
