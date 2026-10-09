import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Ban,
  Cloud,
  Clock,
  Database,
  FileCode2,
  Globe,
  HardDrive,
  Image as ImageIcon,
  KeyRound,
  Lock,
  Mail,
  MousePointerClick,
  ShieldCheck,
} from "lucide-react";
import { NOTION, PROJECT, PRIVACY_LAST_UPDATED, PRIVACY_VERSION } from "./theme";

const SHORT_VERSION = [
  "No analytics, no telemetry, no tracking of any kind.",
  "No remote servers — the extension makes zero network calls of its own.",
  "Everything it remembers lives in your own browser's storage, on your device.",
  "No ads, no data brokers, and your data is never sold.",
];

const STORAGE_ROWS = [
  {
    icon: Cloud,
    area: "chrome.storage.sync",
    examples: "Your settings, whitelist, and theme choice",
    note: "Synced between your own devices by Chrome's built-in sync if you're signed in — never sent to us.",
  },
  {
    icon: HardDrive,
    area: "chrome.storage.local",
    examples: "Suspension history (capped at 500 entries), frozen-tab metadata, idle timers, saved sessions (capped at 20), memory-saved estimates",
    note: "Stays on this device only.",
  },
  {
    icon: Clock,
    area: "chrome.storage.session",
    examples: "Keep-awake holds you set from the popup",
    note: "Wiped automatically when the browser restarts.",
  },
  {
    icon: Lock,
    area: "localStorage",
    examples: "Cached light/dark class so pages don't flash the wrong theme; popup section open/closed state",
    note: "Page-appearance cache only, on this device.",
  },
];

const PERMISSIONS = [
  {
    icon: Database,
    name: "tabs",
    label: "Read your tabs",
    body: "Used to read tab URLs, titles, and states (audible, pinned, active) so the extension can tell which tabs are idle and safe to suspend — and to render the tab list in the popup. The only write it ever makes is navigating a tab to, and back from, the suspended page. That navigation is the entire product.",
  },
  {
    icon: HardDrive,
    name: "storage",
    label: "Store data locally",
    body: "Persists your settings, whitelist, and theme, plus the local-only history and stats shown on the dashboard. Nothing written through this permission is ever transmitted anywhere.",
  },
  {
    icon: Clock,
    name: "alarms",
    label: "Run on a schedule",
    body: "A one-minute heartbeat that checks which tabs have passed their idle threshold. It only runs while auto-suspend is enabled — the feature is off by default.",
  },
  {
    icon: MousePointerClick,
    name: "contextMenus",
    label: "Add right-click menu items",
    body: "Adds the “Suspend this tab” and “Suspend other tabs” entries to Chrome's right-click menu. Nothing more.",
  },
  {
    icon: FileCode2,
    name: "scripting",
    label: "Inject scripts on demand",
    body: "A small, local script (shipped inside the extension, never from the internet) is injected into a page only in the instant before an automatic suspension. It draws an on-page warning banner with a “Not now” button, and — only if you enable Form Protection — checks whether a page has unsaved form input. It is never injected at install, never on every page, collects nothing, and cannot execute remote code (the extension's content security policy is script-src 'self').",
  },
  {
    icon: Globe,
    name: "<all_urls>",
    label: "Access to sites — optional, off by default",
    body: "This optional permission is requested only at the moment you enable Form Protection, so the unsaved-form check can actually inspect page content. Without it, Form Protection falls back to a URL-pattern heuristic and every other feature works unchanged. You can revoke it at any time from chrome://extensions → RAM Manager → Details.",
  },
];

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl font-space-grotesk font-semibold mb-4" style={{ color: NOTION.textNormal }}>
      {children}
    </h2>
  );
}

export default function RamManagerPrivacyPage() {
  useEffect(() => {
    document.title = `Privacy Policy — ${PROJECT.title} | John Paul San Diego`;
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
            <Link to="/projects/ram-manager" className="hover:underline transition" style={{ color: NOTION.accent }}>
              {PROJECT.title}
            </Link>
            <span>/</span>
            <span>Privacy</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-space-grotesk font-bold mb-4" style={{ color: NOTION.textNormal }}>
            Privacy Policy
          </h1>

          <p className="text-xl md:text-2xl leading-relaxed mb-4" style={{ color: NOTION.textMuted }}>
            How RAM Manager handles your data — in plain language.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: NOTION.textFaint }}>
            <span
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: NOTION.bgSecondary, color: NOTION.textMuted }}
            >
              Version {PRIVACY_VERSION}
            </span>
            <span>Last updated: {PRIVACY_LAST_UPDATED}</span>
          </div>
        </header>

        {/* No data collection */}
        <section className="mb-12">
          <div
            className="p-6 rounded-lg border-l-4"
            style={{
              backgroundColor: NOTION.bgSecondary,
              borderLeftColor: NOTION.success,
            }}
          >
            <h2 className="text-2xl font-space-grotesk font-semibold mb-3 flex items-center gap-2" style={{ color: NOTION.textNormal }}>
              <ShieldCheck className="w-6 h-6" style={{ color: NOTION.success }} />
              No data collection
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: NOTION.textMuted }}>
              RAM Manager does <strong style={{ color: NOTION.textNormal }}>not collect any personal data</strong>. We
              do not track you, we do not transmit information to external servers, and we do not use analytics or
              telemetry. The extension works entirely offline and all functionality runs locally on your device.
            </p>
          </div>
        </section>

        {/* The short version */}
        <section className="mb-12">
          <SectionTitle>The short version</SectionTitle>
          <ul className="space-y-3">
            {SHORT_VERSION.map((item) => (
              <li key={item} className="flex items-start gap-3" style={{ color: NOTION.textNormal }}>
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: NOTION.success }}
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What is stored locally */}
        <section className="mb-12">
          <SectionTitle>What is stored locally</SectionTitle>
          <p className="leading-relaxed mb-4" style={{ color: NOTION.textMuted }}>
            The only data the extension keeps is a small amount of JSON inside your own browser storage:
          </p>
          <div className="space-y-3">
            {STORAGE_ROWS.map((row) => (
              <div
                key={row.area}
                className="p-4 rounded-lg border"
                style={{ backgroundColor: NOTION.bgSecondary, borderColor: NOTION.borderLight }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <row.icon className="w-4 h-4 shrink-0" style={{ color: NOTION.accent }} />
                  <code className="text-sm font-semibold" style={{ color: NOTION.textNormal }}>
                    {row.area}
                  </code>
                </div>
                <p className="text-sm leading-relaxed mb-1" style={{ color: NOTION.textMuted }}>
                  {row.examples}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: NOTION.textFaint }}>
                  {row.note}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed mt-4" style={{ color: NOTION.textFaint }}>
            If you are signed into Chrome with sync enabled, Chrome itself may roam your settings between your devices —
            that is Chrome's built-in sync, and it never touches any server of ours.
          </p>
        </section>

        {/* You control your data */}
        <section className="mb-12">
          <SectionTitle>You control your data</SectionTitle>
          <p className="leading-relaxed" style={{ color: NOTION.textMuted }}>
            You can export your data as JSON, import it back, or clear stats and history at any time from the
            extension's settings. Because nothing is ever sent to us, there is nothing for us to delete on your behalf
            — uninstalling the extension removes everything it stored.
          </p>
        </section>

        {/* Permissions explained */}
        <section className="mb-12">
          <SectionTitle>Permissions explained</SectionTitle>
          <p className="leading-relaxed mb-4" style={{ color: NOTION.textMuted }}>
            Chrome lists every permission an extension requests at install time. Here is exactly what each one is for,
            and why it is needed:
          </p>
          <div className="space-y-3">
            {PERMISSIONS.map((perm) => (
              <div
                key={perm.name}
                className="p-5 rounded-lg border"
                style={{ backgroundColor: NOTION.bgPrimary, borderColor: NOTION.borderLight }}
              >
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <perm.icon className="w-4 h-4 shrink-0" style={{ color: NOTION.accent }} />
                  <code
                    className="px-1.5 py-0.5 rounded text-sm font-semibold"
                    style={{ backgroundColor: NOTION.accentLight, color: NOTION.accent }}
                  >
                    {perm.name}
                  </code>
                  <span className="text-sm font-medium" style={{ color: NOTION.textNormal }}>
                    {perm.label}
                  </span>
                </div>
                <p className="leading-relaxed" style={{ color: NOTION.textMuted }}>
                  {perm.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What we never do */}
        <section className="mb-12">
          <div
            className="p-6 rounded-lg border-l-4"
            style={{
              backgroundColor: NOTION.bgSecondary,
              borderLeftColor: NOTION.danger,
            }}
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: NOTION.textNormal }}>
              <Ban className="w-5 h-5" style={{ color: NOTION.danger }} />
              What we never do
            </h3>
            <p className="leading-relaxed" style={{ color: NOTION.textMuted }}>
              We never sell your data, never show ads, never fingerprint your device, and never load code from a
              content delivery network. Every line of code that runs ships inside the extension package you installed,
              and you can read all of it on{" "}
              <a
                href="https://github.com/jd-paul/ram-manager"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: NOTION.accent }}
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </section>

        {/* Favicon loading */}
        <section className="mb-12">
          <SectionTitle>Favicon loading</SectionTitle>
          <div
            className="flex items-start gap-3 p-4 rounded-lg"
            style={{ backgroundColor: NOTION.bgSecondary }}
          >
            <ImageIcon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: NOTION.accent }} />
            <p className="leading-relaxed" style={{ color: NOTION.textMuted }}>
              When a tab is suspended, the placeholder page may load the original site's favicon so it can display it.
              This is an ordinary image request — the same as your browser makes when you visit the site yourself. No
              remote code is executed and no information about you is sent.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <SectionTitle>Contact</SectionTitle>
          <p className="leading-relaxed" style={{ color: NOTION.textMuted }}>
            Questions or concerns about privacy? Email{" "}
            <a href="mailto:johnpaul20030@gmail.com" className="hover:underline" style={{ color: NOTION.accent }}>
              johnpaul20030@gmail.com
            </a>{" "}
            and we will answer personally.
          </p>
        </section>

        {/* Back link */}
        <div className="pt-8 border-t" style={{ borderColor: NOTION.borderLight }}>
          <Link
            to="/projects/ram-manager"
            className="inline-flex items-center gap-2 font-medium transition"
            style={{ color: NOTION.accent }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {PROJECT.title}
          </Link>
        </div>
      </article>
    </main>
  );
}
