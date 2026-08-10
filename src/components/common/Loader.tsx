import { Skeleton } from "@/components/ui/skeleton";

const Loader = () => {
  return (
    <div className="w-full max-w-lg min-h-[75svh] flex flex-col justify-center mx-auto gap-4 px-6">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
};

export default Loader;
