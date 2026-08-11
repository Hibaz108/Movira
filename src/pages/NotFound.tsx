import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60svh] flex flex-col items-center justify-center gap-2">
      <h1 className="text-foreground text-6xl md:text-9xl ">404</h1>
      <p className="uppercase text-xl text-foreground font-semibold">
        Page Not Found
      </p>
      <p className="text-muted text-center">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn-primary mt-4">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
