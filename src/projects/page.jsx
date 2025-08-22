import React from "react";
import Sidebar from "../components/SideBar";

import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

import kcltech from "../assets/img/img_kcl-tech.png";
import codingTutors from "../assets/img/img_coding-tutors.png";
import resumeIQ from "../assets/img/img_resume-iq.jpg";
import javaCovid from "../assets/img/img_java-statistics.png";
import gsyp from "../assets/img/img_gsyp.png";
import tictactoe from "../assets/img/img_tic-tac-toe.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr]">
        <Sidebar />
        <div className="space-y-8 bg-[#0a0a0a]">
          <section className="p-6 font-work-sans" id="about">
            <div className="flex justify-between items-center mb-3 mt-6">
              <h2 className="text-2xl font-space-grotesk">Projects Page</h2>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                {
                  img: resumeIQ,
                  name: "Resume IQ: Python, Classical Machine Learning",
                  desc: "Built an ML tool that evaluates resumes. Receives PDF input, cleans up data, identifies key skills, and evaluates quality of response.",
                  tool: "Python, Scikit-learn",
                  link: "https://github.com/jd-paul/resume-iq",
                },
                {
                  img: kcltech,
                  name: "KCL Tech Hub",
                  desc: "Redesigned the KCL Tech Hub for events, blogs, and job listings. The new design focused on UX and showcasing professionalism.",
                  tool: "Figma, React",
                  link: "https://www.kcltech.co.uk/",
                },
                {
                  img: codingTutors,
                  name: "Tutor Student Management System",
                  desc: "Created a full-stack management application for admins, tutors, and students. Key features include a schedule manager, ticketing system, user management, and more.",
                  tool: "React, Node.js, MongoDB",
                  link: "https://github.com/jd-paul/tutor-management-system",
                },
                {
                  img: javaCovid,
                  name: "Java COVID Statistics",
                  desc: "Created a JavaFX application for visualizing and analyzing COVID-19 data for London boroughs. It loads data containing daily COVID statistics (cases, deaths, mobility changes, etc.).",
                  tool: "Java, JavaFX, MVC Pattern",
                  link: "https://github.com/jd-paul/covid-dashboard-java",
                },
                {
                  img: gsyp,
                  name: "Global Society of Young Physicists",
                  desc: "Developed a single page application (SPA) for a client. It has links for their application pages, resources, and published magazines.",
                  tool: "Next.js, UI / UX",
                  link: "https://gsyp.vercel.app/",
                },
                {
                  img: tictactoe,
                  name: "Tic Tac Toe AI",
                  desc: "Developed learning agent in Python with an epsilon-greedy policy. The agent learns against a random player. The AI uses minimax algorithm for decision making.",
                  tool: "Python, NumPy",
                  link: "https://github.com/jd-paul/tic-tac-bot",
                },
              ].map((project, i) => (
                <div
                  key={i}
                  className="bg-neutral-100 rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="m-3 mb-1 rounded-md overflow-hidden border border-blue-600 shadow-sm shadow-blue-600/20">
                    <img
                      src={project.img}
                      alt={project.name}
                      className="w-full h-40 object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="pt-1 p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {project.name}
                    </h3>
                    <p className="text-sm text-neutral-700 mt-2 flex-1">
                      {project.desc}
                    </p>

                    {/* Tools */}
                    <p className="text-xs text-neutral-700 mt-3">
                      <span className="font-medium text-neutral-800">
                        Tools:
                      </span>{" "}
                      {project.tool}
                    </p>

                    {/* Button */}
                    <div className="mt-3">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-black text-black rounded-lg text-sm hover:bg-black hover:text-white transition w-auto"
                      >
                        Link to project
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
