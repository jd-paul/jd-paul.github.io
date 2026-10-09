import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import CssGridBackground from "../components/CssGridBackground";

const NotFound = () => {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center font-work-sans bg-black text-white">
      {/* Background Pattern */}
      <CssGridBackground />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="text-6xl font-space-grotesk mb-2">404</h1>
        <p className="text-neutral-400 text-lg mb-8 font-work-sans">
          The page you're looking for doesn't exist.
        </p>

        <div className="flex gap-4">
          <Link
            to="/"
            aria-label="Back to home"
            className="flex items-center gap-2 border px-4 py-2.5 border-white text-white rounded-lg text-sm hover:bg-white hover:text-black transition no-underline"
          >
            Back Home
            <Home className="w-4 h-4" aria-hidden="true" />
          </Link>

          <Link
            to="/projects"
            aria-label="View projects"
            className="flex items-center gap-2 border px-4 py-2.5 border-white text-white rounded-lg text-sm hover:bg-white hover:text-black transition no-underline"
          >
            Work &amp; Contributions
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Footer to match your Sidebar/Section1 bottom spacing */}
      <footer className="absolute bottom-8 text-neutral-400 text-xs">
        © {new Date().getFullYear()} John Paul San Diego
      </footer>
    </main>
  );
};

export default NotFound;
