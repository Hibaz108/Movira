import { Link } from "react-router-dom";
import type { EmptyStateProps } from "@/types/types";

const EmptyState = ({
  Icon,
  title,
  description,
  buttonLabel,
  buttonLink,
}: EmptyStateProps) => {
  return (
    <div className="min-h-96 flex flex-col justify-center items-center gap-2 mt-6 p-4 bg-card text-center rounded-2xl">
      <span className="text-muted">
        <Icon className="size-14" strokeWidth={3} />
      </span>
      <h3 className="text-2xl text-foreground font-semibold font-heading">
        {title}
      </h3>
      <p className="text-muted">{description}</p>

      <Link
        to={buttonLink}
        className="py-2 px-6 mt-4 bg-primary font-semibold text-black rounded-full hover:scale-105 "
      >
        {buttonLabel}
      </Link>
    </div>
  );
};

export default EmptyState;
