import type { Actor } from "@/types/types";
import { IMG_BASE_URL } from "@/constants/constants";

const CastList = ({ cast }: { cast: Actor[] }) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-6 w-1 bg-primary rounded-full"></div>
        <h1 className="text-lg text-foreground font-bold font-heading">
          Top Cast
        </h1>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {cast.slice(0, 10).map((actor) => (
          <div key={actor.id} className="w-32 sm:w-36 md:w-40 shrink-0">
            <div className="aspect-[2/3] rounded-xl overflow-hidden">
              {actor.profile_path ? (
                <img
                  src={`${IMG_BASE_URL}${actor.profile_path}`}
                  draggable={false}
                  className="w-full h-full object-cover"
                  alt={actor.name}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-2 text-center bg-card text-muted text-sm">
                  {actor.name}
                </div>
              )}
            </div>

            <div className="mt-2">
              <p className="font-semibold line-clamp-1">{actor.name}</p>
              <span className="text-muted text-sm line-clamp-1">
                {actor.character}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CastList;
