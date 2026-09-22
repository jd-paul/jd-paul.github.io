import React, { useCallback } from "react";
import { useState, useEffect } from "react";

import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Pencil,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  FaPython,
  FaJava,
  FaReact,
  FaDocker,
  FaGithub,
  FaAws,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
  SiSupabase,
} from "react-icons/si";

import Conference from "../assets/img/img_working.png";
import Graduation from "../assets/img/img_graduation.jpeg";

import AddExperienceForm from "../experience/AddExperienceForm";
import EditExperienceForm from "../experience/EditExperienceForm";
import { useProjects } from "../hooks/useProjects";
import { useExperience } from "../hooks/useExperience";
import { supabase } from "../lib/supabaseClient";
import { DEBUG_ADMIN } from "../lib/debugAdmin";

// Static data lives at module scope — created once, never re-created on render
const TECH_STACK = [
  { name: "Python", Icon: FaPython, color: "#3776AB" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Java", Icon: FaJava, color: "#007396" },
  { name: "React", Icon: FaReact, color: "#61DBFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Docker", Icon: FaDocker, color: "#2496ED" },
  { name: "AWS", Icon: FaAws, color: "#232F3E" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
  { name: "GitHub", Icon: FaGithub, color: "#181717" },
];

const CERTIFICATIONS = [
  "AWS Cloud Practitioner Essentials",
  "IBM Data Science Professional",
  "Meta Front-End Developer",
  "Stanford Machine Learning Specialization",
];

const LINK_STYLE = { textDecoration: "none" };

const Section1 = () => {
  const [session, setSession] = useState(null);
  const [showExpForm, setShowExpForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [movingId, setMovingId] = useState(null);

  const { data: allProjects = [] } = useProjects();
  const topProjects = allProjects.slice(0, 2);

  const {
    data: experiences = [],
    isLoading: loadingExperience,
    refetch: refetchExperience,
  } = useExperience();

  const isAdmin = Boolean(session) || DEBUG_ADMIN;

  const handleToggleExpForm = useCallback(() => setShowExpForm((v) => !v), []);
  const handleCloseExpForm = useCallback(() => setShowExpForm(false), []);
  const handleCloseEditExp = useCallback(() => setEditingExperience(null), []);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Swap display_order with the adjacent entry; null falls back to 1-based position
  const handleMoveExperience = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;

    const current = experiences[index];
    const target = experiences[targetIndex];
    const currentOrder = current.display_order ?? index + 1;
    const targetOrder = target.display_order ?? targetIndex + 1;

    setMovingId(current.id);
    try {
      const { error: firstError } = await supabase
        .from("experience")
        .update({ display_order: targetOrder })
        .eq("id", current.id);
      if (firstError) throw firstError;

      const { error: secondError } = await supabase
        .from("experience")
        .update({ display_order: currentOrder })
        .eq("id", target.id);
      if (secondError) throw secondError;

      await refetchExperience();
    } catch (err) {
      console.error("Failed to reorder experience:", err.message);
    } finally {
      setMovingId(null);
    }
  };

  return (
    <section className="p-6 font-work-sans" id="about">
      {/* Projects */}
      <div className="flex justify-between items-center mb-3 mt-6">
        <h2 className="text-2xl font-space-grotesk">Work &amp; Contributions</h2>
        <Link to="/projects" style={LINK_STYLE}>
          <button
            className="flex items-center gap-1 border px-3 py-2.5 border-white text-white rounded-lg text-sm hover:bg-white hover:text-black transition"
            aria-label="Back to home"
          >
            Work &amp; Contributions
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {topProjects.map((project, i) => (
          <a
            key={project.id || i}
            href={project.project_link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group block min-h-[180px] max-h-[300px] overflow-hidden rounded-lg"
          >
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover bg-white"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/65 group-hover:from-black/75 to-transparent transition-colors z-10" />
            {/* Caption */}
            <div className="absolute bottom-3 left-0 right-0 z-20 px-6">
              <p className="text-white text-sm font-semibold">
                {project.title}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Experiences — sits between Projects and Stack */}
      <div className="bg-neutral-900 rounded-xl p-6 mt-6" id="experience">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-space-grotesk">Experiences</h2>

          {isAdmin && (
            <button
              onClick={handleToggleExpForm}
              className="bg-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-500 transition"
            >
              {showExpForm ? "Close Form" : "Add Experience"}
            </button>
          )}
        </div>

        {loadingExperience && (
          <p className="text-gray-400 text-sm">Loading experience...</p>
        )}

        {!loadingExperience && experiences.length === 0 && (
          <p className="text-gray-500 text-sm">
            Experience coming soon.{" "}
            {isAdmin && "Add one using the button above."}
          </p>
        )}

        {!loadingExperience && experiences.length > 0 && (
          <ul className="divide-y divide-neutral-800">
            {experiences.map((exp, index) => (
              <li
                key={exp.id}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-white">{exp.role}</p>
                  <p className="text-sm text-blue-400 mt-0.5">{exp.company}</p>
                </div>
                <span className="text-xs text-neutral-400 whitespace-nowrap">
                  {exp.dates}
                </span>

                {isAdmin && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setEditingExperience(exp)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-blue-600 text-blue-400 rounded-lg text-xs hover:bg-blue-600 hover:text-white transition"
                    >
                      Edit
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveExperience(index, -1)}
                      disabled={index === 0 || movingId !== null}
                      aria-label="Move up"
                      className="inline-flex items-center px-2 py-1.5 border border-neutral-600 text-neutral-300 rounded-lg hover:bg-neutral-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveExperience(index, 1)}
                      disabled={
                        index === experiences.length - 1 || movingId !== null
                      }
                      aria-label="Move down"
                      className="inline-flex items-center px-2 py-1.5 border border-neutral-600 text-neutral-300 rounded-lg hover:bg-neutral-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {isAdmin && showExpForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleCloseExpForm}
          />
          <div className="relative z-10 w-full max-w-2xl max-h-screen overflow-y-auto mx-auto my-auto">
            <AddExperienceForm
              onSuccess={refetchExperience}
              onClose={handleCloseExpForm}
            />
          </div>
        </div>
      )}

      {isAdmin && editingExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleCloseEditExp}
          />
          <div className="relative z-10 w-full max-w-2xl max-h-screen overflow-y-auto mx-auto my-auto">
            <EditExperienceForm
              experience={editingExperience}
              onSuccess={refetchExperience}
              onClose={handleCloseEditExp}
            />
          </div>
        </div>
      )}

      {/* Stack */}
      <div className="bg-blue-600 rounded-xl p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-white font-space-grotesk">My Stack</h2>
        </div>

        <div className="flex gap-3 flex-wrap">
          {TECH_STACK.map((tech, idx) => (
            <div
              key={idx}
              title={tech.name}
              className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold bg-white"
              style={{ color: tech.color }}
            >
              {tech.Icon && <tech.Icon className="mr-2 w-4 h-4" />}
              {tech.name}
            </div>
          ))}
        </div>

        <div className="border-t border-white/25 mt-6 pt-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-3 font-space-grotesk">
            Certifications
          </h3>
          <div className="flex gap-3 flex-wrap">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert}
                className="rounded-md px-3 py-2 text-sm font-semibold bg-white text-custom-dark_main"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Me */}
      <div className="flex justify-between items-center mt-6"></div>

      <div className="relative w-full aspect-[3/2] max-h-[450px] overflow-hidden rounded-lg">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 z-10" />

        {/* Background Image — hero image, load eagerly */}
        <img
          src={Conference}
          alt="Paul presenting"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Contact and Graduation Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {/* Contact Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 p-6 flex flex-col">
          <h2 className="text-2xl font-space-grotesk">Contact</h2>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-auto">
            <a
              href="https://www.linkedin.com/in/paul-san-diego/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/jd-paul"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="mailto:johnpaul20030@gmail.com"
              className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition"
            >
              <Mail className="w-4 h-4" />
              johnpaul20030@gmail.com
            </a>
          </div>
        </div>

        {/* Graduation photo — same darkened treatment as the About Me image */}
        <div className="relative overflow-hidden rounded-xl h-[225px]">
          <img
            src={Graduation}
            alt="John Paul San Diego at his graduation ceremony"
            className="absolute inset-0 w-full h-full object-cover object-[center_32%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-40 z-10" />
        </div>
      </div>

    </section>
  );
};

export default Section1;
