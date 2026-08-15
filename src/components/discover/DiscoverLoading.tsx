import { Skeleton } from "@/components/ui/skeleton";

const DiscoverLoading = () => {
  return (
    <section className="min-h-svh my-4">
      <div className="container">
        {/* Desktop */}
        <div className="hidden sm:flex gap-4">
          {/* filters skeleton */}
          <aside className="w-1/4 shrink-0 flex flex-col gap-6">
            <Skeleton className="h-10 w-32 rounded-lg" />

            <div className="space-y-3">
              <Skeleton className="h-5 w-20 rounded" />

              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-5 w-32 rounded" />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Skeleton className="h-5 w-20 rounded" />

              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>
            </div>
          </aside>

          {/* movies skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 20 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full aspect-[2/3] rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="sm:hidden space-y-5">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-32 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full aspect-[2/3] rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverLoading;
