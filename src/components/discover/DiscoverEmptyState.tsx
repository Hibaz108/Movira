import type { DiscoverEmptyStateProps } from "@/types/types";
import { Funnel } from "lucide-react";

const DiscoverEmptyState = ({ onReset }: DiscoverEmptyStateProps) => {
  return (
    <div className="w-full pt-36 flex flex-col items-center text-center gap-2 ">
      <span className="text-muted">
        <Funnel className="size-14" strokeWidth={3} aria-hidden="true" />
      </span>
      <h3 className="text-foreground font-semibold font-heading text-4xl">
        No movies found
      </h3>
      <p className="text-muted">
        Try adjusting your filters or selecting different genres to see more
        results.
      </p>
      <button className="btn-primary mt-4" onClick={onReset}>
        Reset All Filters
      </button>
    </div>
  );
};

export default DiscoverEmptyState;
