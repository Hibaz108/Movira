import { CircleAlert } from "lucide-react";
import type { ErrorMessageProps } from "@/types/types";

const ErrorMessage = ({ error, onRetry }: ErrorMessageProps) => {
  return (
    <div
      className="min-h-[70svh] flex flex-col justify-center items-center
  text-center gap-2 p-4 mt-6 bg-background rounded-2xl"
    >
      <span className="text-muted">
        <CircleAlert className="size-14" strokeWidth={3} />
      </span>

      <h3 className="text-foreground text-xl font-semibold font-heading">
        Something went wrong
      </h3>

      <p className="text-muted">
        {error?.message || "We couldn't load this content. Please try again."}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="py-2 px-8 mt-4 bg-primary text-black font-medium rounded-full hover:scale-105 transition-transform"
        >
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
