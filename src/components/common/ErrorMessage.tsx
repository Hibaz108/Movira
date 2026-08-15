import { CircleAlert } from "lucide-react";
import type { ErrorMessageProps } from "@/types/types";

const ErrorMessage = ({
  error,
  onRetry,
  title,
  variant,
}: ErrorMessageProps) => {
  return (
    <>
      {variant === "hero" ? (
        <div className="flex flex-col items-center justify-center text-center gap-3 p-6">
          <CircleAlert className="size-14 text-muted" strokeWidth={3} />

          <h3 className="text-foreground text-2xl font-semibold font-heading">
            Something went wrong
          </h3>

          <p className="text-muted">
            {error?.message || "We couldn't load this movie. Please try again."}
          </p>

          {onRetry && (
            <button onClick={onRetry} className="btn-primary">
              Try again
            </button>
          )}
        </div>
      ) : variant === "fullpage" ? (
        <div className="min-h-[70svh] flex flex-col justify-center items-center text-center gap-2 p-4 mt-6 bg-background rounded-2xl">
          <CircleAlert className="size-14 text-muted" strokeWidth={3} />

          <h3 className="text-foreground text-2xl font-semibold font-heading">
            Something went wrong
          </h3>

          <p className="text-muted">
            {error?.message ||
              "We couldn't load this content. Please try again."}
          </p>

          {onRetry && (
            <button onClick={onRetry} className="btn-primary">
              Try again
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-6 mb-6 rounded-2xl text-center sm:text-left">
          <span className="text-muted shrink-0">
            <CircleAlert className="size-8" strokeWidth={2} />
          </span>

          <div className="flex-1">
            <h3 className="text-foreground font-semibold font-heading">
              {title
                ? `Couldn't load ${title} section`
                : "Couldn't load this section"}
            </h3>
            <p className="text-muted text-sm">
              {error?.message || "Please try again."}
            </p>
          </div>

          {onRetry && (
            <button
              onClick={onRetry}
              className="shrink-0 py-2 px-6 bg-primary text-black text-sm font-medium rounded-full hover:scale-105 transition-transform"
            >
              Try again
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
