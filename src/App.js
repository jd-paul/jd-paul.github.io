import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import posthog from "./lib/posthog";

const LandingPage = lazy(() => import("./components/LandingPage.jsx"));
const ProjectsPage = lazy(() => import("./projects/page.jsx"));
const RamManagerPage = lazy(() => import("./projects/ram-manager/index.jsx"));
const RamManagerPrivacyPage = lazy(() => import("./projects/ram-manager/privacy.jsx"));
const AboutPage = lazy(() => import("./about/page.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));
const ImageOptimizerPage = lazy(() => import("./pages/ImageOptimizerPage.jsx"));

const PAGE_TITLES = {
  "/": "John Paul San Diego | Software Engineer",
  "/projects": "Projects | John Paul San Diego",
  "/projects/ram-manager": "RAM Manager | John Paul San Diego",
  "/projects/ram-manager/privacy": "Privacy Policy | RAM Manager",
  "/about": "About | John Paul San Diego",
  "/admin/image-optimizer": "Image Optimizer | Admin",
};

function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    document.title =
      PAGE_TITLES[location.pathname] ?? "Page Not Found | John Paul San Diego";
    posthog.capture("$pageview");
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
            <Route path="/projects/ram-manager" element={<RamManagerPage />} />
            <Route path="/projects/ram-manager/privacy" element={<RamManagerPrivacyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin/image-optimizer" element={<ImageOptimizerPage />} />

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
