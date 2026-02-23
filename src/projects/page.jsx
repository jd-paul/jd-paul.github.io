import React from "react";
import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import AddProjectForm from "./AddProjectForm";

import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const LandingPage = () => {
  const [session, setSession] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error) setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();

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

  return (
    <div className="min-h-screen text-white bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr]">
        <Sidebar session={session} />
        <div className="space-y-8 bg-[#0a0a0a]">
          <section className="p-6 font-work-sans">
            <div className="flex justify-between items-center mb-3 mt-6">
              <h2 className="text-2xl font-space-grotesk">Projects Page</h2>

              <div className="flex gap-3">
                {session && (
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                  >
                    {showForm ? "Close Form" : "Add Project"}
                  </button>
                )}

                <Link to="/" className="no-underline">
                  <button className="flex items-center gap-1 border px-3 py-2.5 border-white text-white rounded-lg text-sm hover:bg-white hover:text-black transition">
                    Back Home <ArrowLeft className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
            {session && showForm && (
              <div className="mb-6">
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  {/* Darkened backdrop */}
                  <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={() => setShowForm(false)}
                  />
                  <div className="relative z-10 w-full max-w-2xl max-h-screen overflow-y-auto mx-auto my-auto">
                    <AddProjectForm
                      onSuccess={fetchProjects}
                      onClose={() => setShowForm(false)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-gray-400 text-sm mt-10 text-center">
                Loading projects...
              </div>
            )}

            {/* Empty State */}
            {!loading && projects.length === 0 && (
              <div className="text-gray-500 text-sm mt-10 text-center">
                No projects yet.{" "}
                {session
                  ? "Add one using the button above."
                  : "Check back soon."}
              </div>
            )}

            {/* Projects Grid */}
            {!loading && projects.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
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
                      {project.project_link && (
                        <div className="mt-3">
                          <a
                            href={project.project_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-black text-black rounded-lg text-sm hover:bg-black hover:text-white transition w-auto"
                          >
                            Link to project
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
