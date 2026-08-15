// components
import Hero from "@/components/movie/Hero";
import MovieSection from "@/components/movie/MovieSection";
import Title from "@/components/common/Title";
import MovieSectionLoading from "@/components/movie/MovieSectionLoading";
import ErrorMessage from "@/components/common/ErrorMessage";
// hooks
import { useTrendingMovies } from "@/hooks/useTrending";
import { useNowPlayingMovies } from "@/hooks/useNowPlaying";
import { useTopRatedMovies } from "@/hooks/useTopRated";
import { usePopularMovies } from "@/hooks/usePopular";

const Home = () => {
  const {
    data: trendingMovies,
    error: trendingError,
    isLoading: trendingLoading,
    refetch: refetchTrending,
  } = useTrendingMovies("week");

  const {
    data: nowPlayingMovies,
    error: nowPlayingError,
    isLoading: nowPlayingLoading,
    refetch: refetchNowPlaying,
  } = useNowPlayingMovies();

  const {
    data: topRatedMovies,
    error: topRatedError,
    isLoading: topRatedLoading,
    refetch: refetchTopRated,
  } = useTopRatedMovies();

  const {
    data: popularMovies,
    error: popularError,
    isLoading: popularLoading,
    refetch: refetchPopular,
  } = usePopularMovies();

  const trendingResults = trendingMovies?.pages?.[0]?.results ?? [];
  const topRatedResults = topRatedMovies?.pages?.[0]?.results ?? [];
  const nowPlayingResults = nowPlayingMovies?.results ?? [];
  const popularResults = popularMovies?.results ?? [];

  return (
    <section className="min-h-svh bg-background">
      <Hero />

      <div className="container space-y-10">
        {trendingLoading ? (
          <>
            <Title title="Trending this week" />
            <MovieSectionLoading />
          </>
        ) : trendingError ? (
          <ErrorMessage
            error={trendingError}
            onRetry={() => refetchTrending()}
            variant="section"
            title="Trending this week"
          />
        ) : (
          trendingResults.length > 0 && (
            <MovieSection
              title="Trending this week"
              movies={trendingResults}
              linkPath="/trending"
            />
          )
        )}

        {nowPlayingLoading ? (
          <>
            <Title title="Now playing in theaters" />
            <MovieSectionLoading />
          </>
        ) : nowPlayingError ? (
          <ErrorMessage
            error={nowPlayingError}
            onRetry={() => refetchNowPlaying()}
            variant="section"
            title="Now playing in theaters"
          />
        ) : (
          nowPlayingResults.length > 0 && (
            <MovieSection
              title="Now playing in theaters"
              movies={nowPlayingResults}
            />
          )
        )}

        {topRatedLoading ? (
          <>
            <Title title="Top rated movies" />
            <MovieSectionLoading />
          </>
        ) : topRatedError ? (
          <ErrorMessage
            error={topRatedError}
            onRetry={() => refetchTopRated()}
            variant="section"
            title="Top rated movies"
          />
        ) : (
          topRatedResults.length > 0 && (
            <MovieSection
              title="Top rated movies"
              movies={topRatedResults}
              linkPath="/top-rated"
            />
          )
        )}

        {popularLoading ? (
          <>
            <Title title="Popular right now" />
            <MovieSectionLoading />
          </>
        ) : popularError ? (
          <ErrorMessage
            error={popularError}
            onRetry={() => refetchPopular()}
            variant="section"
            title="Popular right now"
          />
        ) : (
          popularResults.length > 0 && (
            <MovieSection
              title="Popular right now"
              movies={popularResults}
              linkPath="/discover"
            />
          )
        )}
      </div>
    </section>
  );
};

export default Home;
