import type { Review } from "@/types/types";
import { IMG_BASE_URL } from "@/constants/constants";

const ReviewsList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="h-6 w-1 bg-primary rounded-full"></div>
        <h1 className="text-lg text-foreground font-bold font-heading">
          Featured Reviews
        </h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {reviews.slice(0, 3).map((review) => (
          <div key={review.id} className="bg-card p-4 rounded-2xl space-y-3">
            <div className="flex items-center gap-4">
              {review.author_details.avatar_path ? (
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={`${IMG_BASE_URL}${review.author_details.avatar_path}`}
                    draggable={false}
                    className="h-full w-full object-cover"
                    alt={review.author}
                  />
                </div>
              ) : (
                <div className=" bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                  {review.author.slice(0, 1)}
                </div>
              )}

              <div>
                <p className="text-foreground font-bold">{review.author}</p>
                <p className="text-sm text-muted">
                  {review.author_details.rating != null
                    ? `Rating: ${review.author_details.rating}/10`
                    : "No Rating"}
                </p>
              </div>
            </div>

            <p className="line-clamp-6 italic text-muted text-sm">{`"${review.content}"`}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewsList;
