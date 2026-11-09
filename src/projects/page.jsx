import React, { useCallback, useMemo } from "react";
import { useState, useEffect } from "react";
import Dialog from "../components/Dialog";
import Sidebar from "../components/SideBar";
import AddProjectForm from "./AddProjectForm";
import EditProjectForm from "./EditProjectForm";

import { ArrowLeft, ExternalLink, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useProjects } from "../hooks/useProjects";
import { getGenreLabel } from "../lib/projectLabels";
import { getAdminSession } from "../lib/adminAuth";

// Genre sections in display order
const GENRE_ORDER = ["Clients", "Open Source", "Contributions", "Projects"];

const LandingPage = () => {
  const [session, setSession] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const {
    data: projects = [],
    isLoading: loading,
    isError,
    refetch,
  } = useProjects();

  const groupedProjects = useMemo(() => {
    const groups = new Map();
    for (const project of projects) {
      const genre = project.genre ?? GENRE_ORDER[GENRE_ORDER.length - 1];
      if (!groups.has(genre)) groups.set(genre, []);
      groups.get(genre).push(project);
    }
    const orderedGenres = GENRE_ORDER.filter((genre) => groups.has(genre));
    for (const genre of groups.keys()) {
      if (!orderedGenres.includes(genre)) orderedGenres.push(genre);
    }
    return orderedGenres.map((genre) => [genre, groups.get(genre)]);
  }, [projects]);

  const handleToggleForm = useCallback(() => setShowForm((v) => !v), []);
  const handleCloseForm = useCallback(() => setShowForm(false), []);
  const handleCloseEdit = useCallback(() => setEditingProject(null), []);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(getAdminSession(session)))
      .catch(() => {});

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(getAdminSession(session));
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen text-white bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr]">
        <Sidebar session={session} />
        <main id="main" className="space-y-8 bg-[#0a0a0a]">
          <section className="p-6 font-work-sans">
            <div className="flex justify-between items-center mb-3 mt-6">
              <h1 className="text-2xl font-space-grotesk">Work & Contributions</h1>

              <div className="flex gap-3">
                {session && (
                  <button
                    onClick={handleToggleForm}
                    className="bg-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-500 transition"
                  >
                    {showForm ? "Close Form" : "Add Project"}
                  </button>
                )}

                <Link
                  to="/"
                  className="no-underline flex items-center gap-1 border px-3 py-2.5 border-white text-white rounded-lg text-sm hover:bg-white hover:text-black transition"
                >
                  Back Home <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            {session && showForm && (
              <div className="mb-6">
                <Dialog
                  open={showForm}
                  onClose={handleCloseForm}
                  ariaLabel="Add project"
                  className="relative z-10 w-full max-w-2xl max-h-screen overflow-y-auto mx-auto my-auto"
                >
                  <AddProjectForm
                    onSuccess={refetch}
                    onClose={handleCloseForm}
                  />
                </Dialog>
              </div>
            )}

            {session && editingProject && (
              <Dialog
                open={!!editingProject}
                onClose={handleCloseEdit}
                ariaLabel="Edit project"
                className="relative z-10 w-full max-w-2xl max-h-screen overflow-y-auto mx-auto my-auto"
              >
                <EditProjectForm
                  project={editingProject}
                  onSuccess={refetch}
                  onClose={handleCloseEdit}
                />
              </Dialog>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-gray-400 text-sm mt-10 text-center">
                Loading projects...
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="text-gray-400 text-sm mt-10 text-center">
                Couldn't load projects.{" "}
                <button
                  onClick={() => refetch()}
                  className="underline hover:text-white transition"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !isError && projects.length === 0 && (
              <div className="text-gray-400 text-sm mt-10 text-center">
                No projects yet.{" "}
                {session
                  ? "Add one using the button above."
                  : "Check back soon."}
              </div>
            )}

            {/* Projects Grid - grouped by genre */}
            {!loading && projects.length > 0 && (
              <div className="space-y-10">
                {groupedProjects.map(([genre, genreProjects]) => (
                  <div key={genre}>
                    <h3 className="text-xl font-space-grotesk mb-4">
                      {getGenreLabel(genre)}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {genreProjects.map((project) => (
                        <div
                          key={project.id}
                          className="bg-neutral-100 rounded-lg shadow-md overflow-hidden flex flex-col"
                        >
                          {/* Image - Uses database 'image_url' column */}
                          <div className="m-3 mb-1 rounded-md overflow-hidden border border-blue-600 shadow-sm shadow-blue-600/20">
                            <img
                              src={project.image_url}
                              alt={project.title}
                              className="w-full h-40 object-cover"
                              loading="lazy"
                            />
                          </div>

                          {/* Content */}
                          <div className="pt-1 p-4 flex flex-col flex-1">
                            {/* Title - Uses database 'title' column */}
                            <h3 className="text-lg font-semibold text-neutral-900">
                              {project.title}
                            </h3>
                            <p className="text-sm text-neutral-700 mt-2 flex-1">
                              {project.description}
                            </p>

                            {/* Tools */}
                            <p className="text-xs text-neutral-700 mt-3">
                              <span className="font-medium text-neutral-800">
                                Tools:
                              </span>{" "}
                              {project.tools}
                            </p>

                            {/* Button - Uses database 'project_link' column */}
                            <div className="mt-3 flex items-center gap-2 flex-wrap">
                              {project.project_link && (
                                <a
                                  href={project.project_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-black text-black rounded-lg text-sm hover:bg-black hover:text-white transition"
                                >
                                  Link to project
                                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                </a>
                              )}
                              {session && (
                                <button
                                  onClick={() => setEditingProject(project)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-blue-600 text-blue-600 rounded-lg text-sm hover:bg-blue-600 hover:text-white transition"
                                >
                                  Edit
                                  <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
