// React Router
import { Link } from "react-router-dom";
// components
import Title from "@/components/common/Title";
import ErrorMessage from "@/components/common/ErrorMessage";
// shadcn
import { Skeleton } from "@/components/ui/skeleton";
// other
import { genreColors } from "@/lib/genreColors";
import { useGenres } from "@/hooks/useGenres";

const Genres = () => {
  const { data, isLoading, error, refetch } = useGenres();

  if (isLoading) {
    return (
      <div className="min-h-svh my-4">
        <div className="container space-y-4">
          <Skeleton className="h-8 md:h-12 w-1/3 max-w-xl rounded-lg" />

          <Skeleton className="h-4 md:h-6 w-2/3 max-w-xl rounded-lg" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-3">
            {Array.from({ length: 16 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-36 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (error)
    return (
      <ErrorMessage
        error={error}
        onRetry={() => refetch()}
        variant="fullpage"
      />
    );

  return (
    <section className="min-h-svh my-4">
      <div className="container space-y-4">
        <Title title="Explore Genres" />

        <p className="text-muted">Find movies matching your mood</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-3">
          {data?.map((gen) => {
            const colors = genreColors[gen.name];
            return (
              <Link
                to={`/discover?genres=${gen.id}`}
                key={gen.id}
                className="group relative w-full h-36 flex items-center justify-center rounded-2xl overflow-hidden
                 bg-card/80 text-2xl text-foreground font-semibold cursor-pointer transition-colors"
              >
                <div
                  className={`absolute inset-0 transition-colors ${
                    colors?.overlay || "bg-primary/5"
                  } ${colors?.hover || "group-hover:bg-primary/15"} `}
                />
                <span className="relative z-10">{gen.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Genres;
