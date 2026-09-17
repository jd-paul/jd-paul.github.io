import React from "react";
import { Briefcase } from "lucide-react";
import { useExperience } from "../hooks/useExperience";

const Experience = () => {
  const { data: experiences = [], isLoading } = useExperience();

  return (
    <section className="p-6 font-work-sans" id="experience">
      <div className="flex justify-between items-center mb-3 mt-6">
        <h2 className="text-2xl font-space-grotesk">Experience</h2>
      </div>

      {isLoading && (
        <div className="text-gray-400 text-sm mt-4 text-center">
          Loading experience...
        </div>
      )}

      {!isLoading && experiences.length === 0 && (
        <div className="text-gray-500 text-sm mt-4 text-center">
          Experience coming soon.
        </div>
      )}

      {!isLoading && experiences.length > 0 && (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-neutral-900 rounded-xl p-5"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Experience;
