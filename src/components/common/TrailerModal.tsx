import type { TrailerModalProps } from "@/types/types";

const TrailerModal = ({ handleCloseTrailer, trailer }: TrailerModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      onClick={handleCloseTrailer}
    >
      <div
        className="relative w-full max-w-5xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCloseTrailer}
          className="absolute -top-10 right-0 text-white text-xl"
          aria-label="Close trailer"
        >
          ✕
        </button>

        <iframe
          className="w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Movie Trailer"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
