// ٍReact Router
import { Link } from "react-router-dom";
// icons
import { ChevronRight } from "lucide-react";
// components
import Title from "@/components/common/Title";
import MovieCarousel from "@/components/movie/MovieCarousel";
// other
import type { MovieSectionProps } from "@/types/types";

const MovieSection = ({ title, movies, linkPath }: MovieSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Title title={title} />
        {linkPath && (
          <Link
            to={linkPath}
            className="flex items-center gap-1 text-primary text-sm mb-2"
          >
            <span className="hover:underline">View All</span>
            <ChevronRight className="size-4" aria-hidden="true" />
          </Link>
        )}
      </div>
      <MovieCarousel movies={movies} />
    </div>
  );
};

export default MovieSection;
