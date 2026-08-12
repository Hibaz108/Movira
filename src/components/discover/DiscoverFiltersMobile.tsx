import type { DiscoverFiltersProps } from "@/types/types";
import { SlidersHorizontal, Funnel, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const DiscoverFiltersMobile = ({
  genres,
  selectedGenreId,
  selectedSortKey,
  onSortChange,
  onGenreClick,
  onClearGenres,
}: DiscoverFiltersProps) => {
  return (
    <div className="mt-4 px-5 divide-y divide-gray-700 ">
      {/* sort */}
      <div className="space-y-3 py-6">
        <p className="uppercase flex items-center gap-1 font-semibold font-heading text-sm">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Sort by
        </p>

        <RadioGroup
          className="w-fit space-y-2"
          value={selectedSortKey}
          onValueChange={onSortChange}
        >
          <div className="flex items-center gap-3 ">
            <RadioGroupItem value="most-popular" id="mobile-most-popular" />
            <Label htmlFor="mobile-most-popular">Most Popular</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="least-popular" id="mobile-least-popular" />
            <Label htmlFor="mobile-least-popular">Least Popular</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="highest-rated" id="mobile-highest-rated" />
            <Label htmlFor="mobile-highest-rated">Highest Rated</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="newest-first" id="mobile-newest-first" />
            <Label htmlFor="mobile-newest-first">Newest First</Label>
          </div>
        </RadioGroup>
      </div>
      {/* === sort === */}

      {/* genres */}
      <div className="space-y-3 pt-6">
        <p className="uppercase flex items-center gap-1 font-semibold text-sm font-heading">
          <Funnel className="size-4" aria-hidden="true" />
          Genres
        </p>

        {/* gen buttons */}
        <div className="flex flex-wrap gap-2">
          {genres.map((gen) => (
            <button
              key={gen.id}
              className={`py-1.5 px-4 rounded-full text-sm border transition-colors ${
                selectedGenreId.includes(gen.id)
                  ? "bg-primary border-primary"
                  : "bg-card border-border hover:border-primary"
              }`}
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
            className="flex items-center gap-1 text-sm text-red-600 "
            onClick={onClearGenres}
          >
            <X className="size-4" aria-hidden="true" /> Clear genres
          </button>
        )}
        {/* === clear genres btn === */}
      </div>
      {/* === genres === */}
    </div>
  );
};

export default DiscoverFiltersMobile;
