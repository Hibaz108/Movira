import { Skeleton } from "@/components/ui/skeleton";

const MovieSectionLoading = () => {
  return (
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          key={index}
          className="flex-[0_0_50%] sm:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] aspect-[2/3] rounded-xl"
        />
      ))}
    </div>
  );
};

export default MovieSectionLoading;
