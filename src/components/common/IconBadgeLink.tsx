import { Link } from "react-router-dom";
import type { IconBadgeLinkProps } from "@/types/types";

const IconBadgeLink = ({ to, label, count, Icon }: IconBadgeLinkProps) => {
  return (
    <Link
      to={to}
      className="relative"
      aria-label={`${label}${count > 0 ? ` contains ${count} movies` : ""}`}
    >
      <Icon className="size-5" aria-hidden="true" />

      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-4 px-1 text-xs bg-primary rounded-full text-foreground text-center font-medium">
          {count}
        </span>
      )}
    </Link>
  );
};

export default IconBadgeLink;
