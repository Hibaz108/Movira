// components
import Hero from "@/components/movie/Hero";
import MovieSection from "@/components/movie/MovieSection";
// hooks
import { useTrendingMovies } from "@/hooks/useTrending";
import { useNowPlayingMovies } from "@/hooks/useNowPlaying";
import { useTopRatedMovies } from "@/hooks/useTopRated";
import { usePopularMovies } from "@/hooks/usePopular";

const Home = () => {
  const { data: trendingMovies } = useTrendingMovies("week");
  const { data: nowPlayingMovies } = useNowPlayingMovies();
  const { data: topRatedMovies } = useTopRatedMovies();
  const { data: popularMovies } = usePopularMovies();

  const trendingResults = trendingMovies?.pages?.[0]?.results ?? [];
  const topRatedResults = topRatedMovies?.pages?.[0]?.results ?? [];

  return (
    <section className="min-h-svh bg-background">
      <Hero />

      <div className="container space-y-10">
        <MovieSection
          title="Trending this week"
          movies={trendingResults}
          linkPath="/trending"
        />

        <MovieSection
          title="Now playing in theaters"
          movies={nowPlayingMovies?.results ?? []}
        />

        <MovieSection
          title="Top rated movies"
          movies={topRatedResults}
          linkPath="/top-rated"
        />

        <MovieSection
          title="Popular right now"
          movies={popularMovies?.results ?? []}
          linkPath="/discover"
        />
      </div>
    </section>
  );
};

export default Home;
