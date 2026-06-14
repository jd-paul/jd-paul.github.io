import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

// Notion Light colour palette (RAM Manager's default theme)
const NOTION = {
  bgPrimary: "rgb(255, 255, 255)",
  bgSecondary: "rgb(244, 245, 246)",
  bgTertiary: "rgb(227, 230, 232)",
  textNormal: "rgb(55, 53, 47)",
  textMuted: "rgb(77, 74, 66)",
  textFaint: "rgb(99, 95, 84)",
  accent: "rgb(11, 110, 153)",
  accentHover: "rgb(8, 82, 115)",
  accentLight: "rgba(11, 110, 153, 0.12)",
  border: "rgb(170, 177, 182)",
  borderLight: "rgb(227, 230, 232)",
  success: "rgb(15, 123, 108)",
  danger: "rgb(224, 62, 62)",
};

const PROJECT = {
  title: "RAM Manager",
  description:
    "A lightweight Chrome extension that suspends idle tabs to free up memory. Tabs are preserved and can be restored instantly when you return.",
  tools: "JavaScript, Chrome Extension APIs, HTML, CSS",
  project_link: "https://github.com/jd-paul/ram-manager",
  image_url: "/img_ram_manager.png",
  genre: "Projects",
};

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
  useEffect(() => {
    document.title = `${PROJECT.title} | John Paul San Diego`;
  }, []);

  return (
    <main
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
              <ArrowLeft className="w-4 h-4" />
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
              View on GitHub <ExternalLink className="w-4 h-4" />
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

        {/* Privacy Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-space-grotesk font-semibold mb-2" style={{ color: NOTION.textNormal }}>
            Privacy Policy
          </h2>
          <p className="text-sm mb-6" style={{ color: NOTION.textFaint }}>
            Last updated: June 14, 2026
          </p>

          <div className="space-y-8">
            <div
              className="p-5 rounded-lg border-l-4"
              style={{
                backgroundColor: NOTION.bgSecondary,
                borderLeftColor: NOTION.success,
              }}
            >
              <h3 className="text-lg font-semibold mb-2" style={{ color: NOTION.textNormal }}>
                No data collection
              </h3>
              <p className="leading-relaxed" style={{ color: NOTION.textMuted }}>
                RAM Manager does <strong style={{ color: NOTION.textNormal }}>not collect any personal data</strong>. We do not track you, we do not transmit information to external servers, and we do not use analytics or telemetry. The extension works entirely offline and all functionality runs locally on your device.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: NOTION.textNormal }}>
                What is stored locally
              </h3>
              <p className="leading-relaxed mb-2" style={{ color: NOTION.textMuted }}>
                The only data the extension keeps is a small JSON file inside your own browser storage. This includes:
              </p>
              <ul className="space-y-2 pl-5 list-disc" style={{ color: NOTION.textMuted }}>
                <li>
                  A local suspension history (URL, domain, page title, tab ID, timestamp, and action type) used solely to render your personal dashboard.
                </li>
                <li>Your settings, such as the whitelist, protection rules, and theme preferences.</li>
                <li>Operational data like memory-saved estimates and frozen-tab metadata.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: NOTION.textNormal }}>
                Where the data lives
              </h3>
              <p className="leading-relaxed" style={{ color: NOTION.textMuted }}>
                Everything is stored in your browser's local storage ({" "}
                <code className="px-1 py-0.5 rounded text-sm" style={{ backgroundColor: NOTION.bgSecondary, color: NOTION.textNormal }}>
                  chrome.storage.local
                </code>{" "}
                and{" "}
                <code className="px-1 py-0.5 rounded text-sm" style={{ backgroundColor: NOTION.bgSecondary, color: NOTION.textNormal }}>
                  chrome.storage.sync
                </code>
                ). This is the same place Chrome keeps your bookmarks and passwords. The data never leaves your device, no server is ever contacted, and the extension continues to work even when you are completely offline.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: NOTION.textNormal }}>
                You control your data
              </h3>
              <p className="leading-relaxed" style={{ color: NOTION.textMuted }}>
                You can clear or delete the local JSON data at any time from the extension dashboard. Because nothing is sent to us, there is nothing for us to delete on your behalf.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: NOTION.textNormal }}>
                Favicon loading
              </h3>
              <p className="leading-relaxed" style={{ color: NOTION.textMuted }}>
                When a tab is suspended, the extension may load the original site's favicon image so the suspended page can display it. This is ordinary image loading only; no remote code is executed and no information about you is sent.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: NOTION.textNormal }}>
                Contact
              </h3>
              <p className="leading-relaxed" style={{ color: NOTION.textMuted }}>
                Questions? Email{" "}
                <a
                  href="mailto:johnpaul20030@gmail.com"
                  className="hover:underline"
                  style={{ color: NOTION.accent }}
                >
                  johnpaul20030@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="pt-8 border-t" style={{ borderColor: NOTION.borderLight }}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-medium transition"
            style={{ color: NOTION.accent }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all projects
          </Link>
        </div>
      </article>
    </main>
  );
}
