import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import posthog from "./lib/posthog";

const LandingPage = lazy(() => import("./components/LandingPage.jsx"));
const ProjectsPage = lazy(() => import("./projects/page.jsx"));
const AboutPage = lazy(() => import("./about/page.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    posthog.capture('$pageview');
  }, [location]);
  return null;
}

function App() {
  return (
    <Router>
      <div>
        <PageViewTracker />
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Redirect common typos / singular forms to the correct route */}
            <Route path="/project" element={<Navigate to="/projects" replace />} />
            <Route path="/project/*" element={<Navigate to="/projects" replace />} />
            <Route path="/projects/*" element={<Navigate to="/projects" replace />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/about-me" element={<Navigate to="/about" replace />} />

            {/* Catch-all → 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

// npm run build
// npm run deploy
