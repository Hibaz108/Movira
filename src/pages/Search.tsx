// React
import { useState } from "react";
// React Router
import { Link } from "react-router-dom";
// icons
import { SearchIcon, ArrowRight } from "lucide-react";
// Shadcn
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
// hooks
import { useGenres } from "@/hooks/useGenres";

const Search = () => {
  const { data: genres } = useGenres();
  const [userQuery, setUserQuery] = useState<string>("");

  return (
    <section className="min-h-svh mt-16 mb-6 ">
      <div className="container space-y-3">
        <InputGroup>
          <InputGroupInput
            id="inline-start-input"
            placeholder="Search for movies..."
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
          />
          <InputGroupAddon align="inline-start">
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>

        <>
          <h2 className="uppercase text-sm text-muted font-bold font-heading mt-10">
            Explore Genres
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            {genres?.slice(0, 9).map((genre) => (
              <button
                key={genre.id}
                className="bg-card font-semibold text-foreground px-5 py-1.5 border border-border rounded-full hover:border-primary transition-colors"
              >
                {genre.name}
              </button>
            ))}
            <Link
              to="/genres"
              className="flex items-center gap-1 text-primary hover:underline transition-colors"
            >
              View All Genres
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </>
      </div>
    </section>
  );
};

export default Search;
