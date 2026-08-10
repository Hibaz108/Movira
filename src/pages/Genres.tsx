import { genreColors } from "@/lib/genreColors";
import Title from "@/components/common/Title";
import { useGenres } from "@/hooks/useGenres";

const Genres = () => {
  const { data } = useGenres();

  return (
    <section className="min-h-svh my-4">
      <div className="container space-y-4">
        <Title title="Explore Genres" />

        <p className="text-muted">Find movies matching your mood</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-3">
          {data?.map((gen) => {
            const colors = genreColors[gen.name];
            return (
              <div
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Genres;
