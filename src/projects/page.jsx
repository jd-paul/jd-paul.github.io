import React from "react";
import Sidebar from "../components/SideBar";

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr]">
        <Sidebar />
        <div className="space-y-8 bg-[#0a0a0a]">
          <section className="p-6 font-work-sans" id="about">
            <div className="flex justify-between items-center mb-3 mt-6">
              <h2 className="text-2xl font-space-grotesk">My Projects</h2>
              <Link to="/" style={{ textDecoration: "none" }}>
                <button
                  className="flex items-center gap-1 border px-3 py-2.5 border-white text-white rounded-lg text-sm hover:bg-white hover:text-black transition"
                  aria-label="Back to home"
                >
                  Back Home
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
