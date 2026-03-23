import "./App.css";
import { lazy, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const LandingPage = lazy(() => import("./components/LandingPage.jsx"));
const ProjectsPage = lazy(() => import("./projects/page.jsx"));
const AboutPage = lazy(() => import("./about/page.jsx"));

function App() {
  return (
    <Router>
      <div>
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

// npm run build
// npm run deploy
