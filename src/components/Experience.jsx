import React, { useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Briefcase, Pencil } from "lucide-react";
import AddExperienceForm from "../experience/AddExperienceForm";
import EditExperienceForm from "../experience/EditExperienceForm";
import { supabase } from "../lib/supabaseClient";
import { useExperience } from "../hooks/useExperience";
import { DEBUG_ADMIN } from "../lib/debugAdmin";

const Experience = () => {
  const [session, setSession] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [movingId, setMovingId] = useState(null);

  const isAdmin = Boolean(session) || DEBUG_ADMIN;

  const { data: experiences = [], isLoading, refetch } = useExperience();

  const handleToggleForm = useCallback(() => setShowForm((v) => !v), []);
  const handleCloseForm = useCallback(() => setShowForm(false), []);
  const handleCloseEdit = useCallback(() => setEditingExperience(null), []);

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
  const handleMove = async (index, direction) => {
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

      await refetch();
    } catch (err) {
      console.error("Failed to reorder experience:", err.message);
    } finally {
      setMovingId(null);
    }
  };

  return (
    <section className="p-6 font-work-sans" id="experience">
      <div className="flex justify-between items-center mb-3 mt-6">
        <h2 className="text-2xl font-space-grotesk">Experience</h2>

        {isAdmin && (
          <button
            onClick={handleToggleForm}
            className="bg-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-500 transition"
          >
            {showForm ? "Close Form" : "Add Experience"}
          </button>
        )}
      </div>

      {isLoading && (
        <div className="text-gray-400 text-sm mt-4 text-center">
          Loading experience...
        </div>
      )}

      {!isLoading && experiences.length === 0 && (
        <div className="text-gray-500 text-sm mt-4 text-center">
          Experience coming soon.{" "}
          {isAdmin && "Add one using the button above."}
        </div>
      )}

      {!isLoading && experiences.length > 0 && (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="bg-neutral-900 rounded-xl p-5"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-lg font-semibold text-white">
                      {exp.role}
                    </h3>
                    <span className="text-xs text-neutral-400 whitespace-nowrap">
                      {exp.dates}
                    </span>
                  </div>
                  <p className="text-sm text-blue-400 mt-0.5">{exp.company}</p>
                  <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                    {exp.highlights}
                  </p>

                  {isAdmin && (
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => setEditingExperience(exp)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-blue-600 text-blue-400 rounded-lg text-xs hover:bg-blue-600 hover:text-white transition"
                      >
                        Edit
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMove(index, -1)}
                        disabled={index === 0 || movingId !== null}
                        aria-label="Move up"
                        className="inline-flex items-center px-2 py-1.5 border border-neutral-600 text-neutral-300 rounded-lg hover:bg-neutral-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMove(index, 1)}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isAdmin && showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleCloseForm}
          />
          <div className="relative z-10 w-full max-w-2xl max-h-screen overflow-y-auto mx-auto my-auto">
            <AddExperienceForm onSuccess={refetch} onClose={handleCloseForm} />
          </div>
        </div>
      )}

      {isAdmin && editingExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleCloseEdit}
          />
          <div className="relative z-10 w-full max-w-2xl max-h-screen overflow-y-auto mx-auto my-auto">
            <EditExperienceForm
              experience={editingExperience}
              onSuccess={refetch}
              onClose={handleCloseEdit}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;
