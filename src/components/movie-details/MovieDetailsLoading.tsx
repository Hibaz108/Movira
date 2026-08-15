import { Skeleton } from "@/components/ui/skeleton";

const MovieDetailsLoading = () => {
  return (
    <div className="min-h-svh">
      {/* hero */}
      <section className="min-h-svh">
        <div className="container py-12">
          <Skeleton className="h-5 w-20 rounded mb-10" />

          <div className="flex flex-col md:flex-row gap-6">
            {/* poster */}
            <div className="flex-1 flex justify-center md:justify-start">
              <div className="w-56 md:w-64 lg:w-80">
                <Skeleton className="w-full aspect-[2/3] rounded-lg" />

                <Skeleton className="w-full h-10 mt-4 rounded-lg" />

                <div className="flex gap-2 mt-3">
                  <Skeleton className="w-full h-10 rounded-lg" />
                  <Skeleton className="w-full h-10 rounded-lg" />
                </div>
              </div>
            </div>
            {/* === poster === */}

            {/* info */}
            <div className="flex-2 flex flex-col items-center md:items-start justify-center gap-4 md:pt-14">
              <Skeleton className="h-10 md:h-14 w-2/3 max-w-xl rounded-lg" />

              <Skeleton className="h-5 w-48 rounded" />

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Skeleton className="h-5 w-16 rounded" />
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="h-5 w-20 rounded" />
                <Skeleton className="h-5 w-24 rounded" />
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>

              <div className="w-full mt-6 space-y-3">
                <Skeleton className="h-6 w-24 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>
            </div>
            {/* === info === */}
          </div>
        </div>
      </section>
      {/* === hero === */}

      {/* === content === */}
      <div className="container space-y-10 pt-12">
        {/* cast */}
        <section>
          <Skeleton className="h-7 w-28 rounded mb-4" />

          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="w-32 sm:w-36 md:w-40 shrink-0">
                <Skeleton className="w-full aspect-[2/3] rounded-xl" />
                <Skeleton className="h-4 w-3/4 rounded mt-2" />
                <Skeleton className="h-3 w-2/3 rounded mt-2" />
              </div>
            ))}
          </div>
        </section>
        {/* === cast === */}

        {/* reviews */}
        <section>
          <Skeleton className="h-7 w-40 rounded mb-4" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-card p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-16 h-16 rounded-full" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-3 w-16 rounded" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-3 w-full rounded" />
                  <Skeleton className="h-3 w-full rounded" />
                  <Skeleton className="h-3 w-3/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* === reviews === */}

        {/* recommendations */}
        <section>
          <Skeleton className="h-7 w-48 rounded mb-4" />

          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-32 sm:w-36 md:w-40 aspect-[2/3] shrink-0 rounded-xl"
              />
            ))}
          </div>
        </section>
        {/* === recommendations === */}
      </div>
      {/* === content === */}
    </div>
  );
};

export default MovieDetailsLoading;
