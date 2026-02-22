import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 dark:bg-[#0f0f0f]">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold dark:text-gray-200">404</h1>
        <p className="mb-4 text-xl text-neutral-500 dark:text-gray-400">Oops! Page not found</p>
        <a href="/" className="text-[#e10600] underline hover:text-[#e10600]/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
