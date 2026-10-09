import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { NOTION, PROJECT } from "./theme";

const FEATURES = [
  "Automatic suspension after a custom idle period",
  "One-click manual suspend via popup, context menu, or keyboard shortcut",
  "Auto-restore when you click a suspended tab",
  "Suspend-on-window-unfocus",
  "Protection rules for pinned tabs, media tabs, active tab, local URLs, and forms",
  "Site whitelist so specific domains are never suspended",
  "Dashboard with memory-saved estimates and session timeline",
  "28 built-in light and dark themes",
  "JSON export/import for your settings and data",
];

const FAQ = [
  {
    q: "How do I whitelist a site?",
    a: "Open the extension settings, go to the Whitelist section, and add the domain or URL you want to protect.",
  },
  {
    q: "How do I restore a suspended tab?",
    a: "Click anywhere on the suspended tab page, or switch to the tab with auto-restore enabled.",
  },
  {
    q: "How do I export my settings?",
    a: "Open the extension dashboard, scroll to the data section, and use the export button to download a JSON file.",
  },
];

export default function RamManagerPage() {
  return (
    <main
      id="main"
      className="min-h-screen font-work-sans"
      style={{ backgroundColor: NOTION.bgPrimary, color: NOTION.textNormal }}
    >
      <article className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: NOTION.textFaint }}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 hover:underline transition"
              style={{ color: NOTION.accent }}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Projects
            </Link>
            <span>/</span>
            <span>{PROJECT.title}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-space-grotesk font-bold mb-4" style={{ color: NOTION.textNormal }}>
            {PROJECT.title}
          </h1>

          <p className="text-xl md:text-2xl leading-relaxed mb-4" style={{ color: NOTION.textMuted }}>
            {PROJECT.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: NOTION.textFaint }}>
            <span>{PROJECT.genre}</span>
          </div>
        </header>

        {/* Hero image — full image, no cropping */}
        <figure
          className="rounded-xl overflow-hidden border mb-12"
          style={{ backgroundColor: NOTION.bgSecondary, borderColor: NOTION.borderLight }}
        >
          <img
            src={PROJECT.image_url}
            alt={`${PROJECT.title} hero banner`}
            className="w-full h-auto block"
            width="1280"
            height="800"
            fetchPriority="high"
          />
        </figure>

        {/* Intro */}
        <section className="mb-12">
          <p className="text-lg leading-relaxed" style={{ color: NOTION.textNormal }}>
            RAM Manager reduces Chrome's memory usage by suspending tabs you aren't using. When a tab has been idle for the time you choose, it is replaced with a lightweight suspended page. The original page is preserved and can be restored instantly when you return.
          </p>

          {PROJECT.project_link && (
            <a
              href={PROJECT.project_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg text-sm font-medium transition"
              style={{
                backgroundColor: NOTION.accent,
                color: "rgb(255, 255, 255)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = NOTION.accentHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = NOTION.accent;
              }}
            >
              View on GitHub <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </section>

        {/* Tech stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-space-grotesk font-semibold mb-4" style={{ color: NOTION.textNormal }}>
            Tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {PROJECT.tools.split(",").map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: NOTION.accentLight,
                  color: NOTION.accent,
                }}
              >
                {tool.trim()}
              </span>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-space-grotesk font-semibold mb-4" style={{ color: NOTION.textNormal }}>
            Key features
          </h2>
          <ul className="space-y-3">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3" style={{ color: NOTION.textNormal }}>
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: NOTION.accent }}
                />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Support / FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-space-grotesk font-semibold mb-6" style={{ color: NOTION.textNormal }}>
            Support
          </h2>
          <div className="space-y-6">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold mb-1" style={{ color: NOTION.textNormal }}>
                  {item.q}
                </h3>
                <p className="leading-relaxed" style={{ color: NOTION.textMuted }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy — summary with link to the dedicated page */}
        <section className="mb-12">
          <h2 className="text-2xl font-space-grotesk font-semibold mb-4" style={{ color: NOTION.textNormal }}>
            Privacy
          </h2>

          <div
            className="p-5 rounded-lg border-l-4 mb-6"
            style={{
              backgroundColor: NOTION.bgSecondary,
              borderLeftColor: NOTION.success,
            }}
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: NOTION.textNormal }}>
              <ShieldCheck className="w-5 h-5" style={{ color: NOTION.success }} aria-hidden="true" />
              No data collection
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: NOTION.textMuted }}>
              RAM Manager does <strong style={{ color: NOTION.textNormal }}>not collect any personal data</strong>.
              There is no tracking, no analytics, and no remote server — everything is stored locally in your own
              browser and works fully offline.
            </p>
            <Link
              to="/projects/ram-manager/privacy"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition"
              style={{
                backgroundColor: NOTION.accent,
                color: "rgb(255, 255, 255)",
              }}
            >
              Read the full privacy policy
            </Link>
          </div>
        </section>

        {/* Back link */}
        <div className="pt-8 border-t" style={{ borderColor: NOTION.borderLight }}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-medium transition"
            style={{ color: NOTION.accent }}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to all projects
          </Link>
        </div>
      </article>
    </main>
  );
}
