import type { DiscoverFiltersProps } from "@/types/types";
import { SlidersHorizontal, Funnel, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const DiscoverFiltersDesktop = ({
  genres,
  selectedGenreId,
  selectedSortKey,
  onSortChange,
  onGenreClick,
  onClearGenres,
}: DiscoverFiltersProps) => {
  return (
    <>
      <div className="space-y-3 mt-4">
        <p className="uppercase flex items-center gap-1 font-semibold font-heading text-sm">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Sort by
        </p>

        <RadioGroup
          className="w-fit"
          value={selectedSortKey}
          onValueChange={onSortChange}
        >
          <div className="flex items-center gap-3 ">
            <RadioGroupItem value="most-popular" id="desktop-most-popular" />
            <Label htmlFor="desktop-most-popular">Most Popular</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="least-popular" id="desktop-least-popular" />
            <Label htmlFor="desktop-least-popular">Least Popular</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="highest-rated" id="desktop-highest-rated" />
            <Label htmlFor="desktop-highest-rated">Highest Rated</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="newest-first" id="desktop-newest-first" />
            <Label htmlFor="desktop-newest-first">Newest First</Label>
          </div>
        </RadioGroup>
      </div>
      {/* === sort === */}

      {/* genres */}
      <div className="space-y-3 mt-6">
        <p className="uppercase flex items-center gap-1 text-sm font-semibold font-heading">
          <Funnel className="size-4" aria-hidden="true" />
          Genres
        </p>

        {/* gen buttons */}
        <div className="flex flex-wrap gap-2">
          {genres.map((gen) => (
            <button
              key={gen.id}
              className={`py-1.5 px-4 border rounded-full text-sm transition-colors ${selectedGenreId.includes(gen.id) ? "border-primary bg-primary" : "border-border bg-card  hover:border-primary"}`}
              onClick={() => onGenreClick(gen.id)}
              aria-pressed={selectedGenreId.includes(gen.id)}
            >
              {gen.name}
            </button>
          ))}
        </div>
        {/* === gen buttons === */}

        {/* clear genres btn */}
        {selectedGenreId.length > 0 && (
          <button
            className="flex items-center gap-1 text-sm text-red-600"
            onClick={onClearGenres}
          >
            <X className="size-4" aria-hidden="true" /> Clear genres
          </button>
        )}

        {/* === clear genres btn === */}
      </div>
      {/* === genres === */}
    </>
  );
};

export default DiscoverFiltersDesktop;
