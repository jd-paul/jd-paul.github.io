# Performance Implementation Plan — jd-paul.github.io

**Project:** React + Supabase Portfolio Site
**Date:** 2026-03-23
**Scope:** Page loading performance — Supabase queries, React caching, data fetching strategy, bundle size, image optimisation, Supabase client instantiation

---

## Summary Table

| #   | Issue                                                      | Priority   | Category      | Effort   |
| --- | ---------------------------------------------------------- | ---------- | ------------- | -------- |
| 1   | No data caching — same queries re-run on every route visit | **High**   | Data Fetching | Medium   |
| 2   | Large unoptimised image assets (~20 MB total)              | **High**   | Images        | Medium   |
| 3   | No `loading="lazy"` on any `<img>` tag                     | **High**   | Images        | Low      |
| 4   | No route-based code splitting                              | **High**   | Bundle        | Low      |
| 5   | FontAwesome is a heavy dependency for ~15 icons            | **Medium** | Bundle        | Medium   |
| 6   | Missing `.select()` column filtering in Projects query     | **Medium** | Supabase      | Low      |
| 7   | Static arrays/objects recreated on every render            | **Low**    | React         | Low      |
| 8   | No `React.memo` on reusable leaf components                | **Low**    | React         | Low      |
| 9   | Inline `onClick` arrow functions in JSX                    | **Low**    | React         | Low      |
| 10  | Inline `style={{}}` objects recreated on every render      | **Low**    | React         | Very Low |

---

## Issue 1 — No data caching: queries re-run on every route visit

**Priority: High**

### Problem

There is no caching layer. Every time a component mounts it fires a fresh Supabase request. React Router unmounts components on navigation, so round-tripping between `/` and `/projects` triggers at least three redundant database calls:

| Component                        | Query          | Fires on every mount |
| -------------------------------- | -------------- | -------------------- |
| `src/components/Section1.jsx:42` | top 2 projects | yes                  |
| `src/projects/page.jsx:16`       | all projects   | yes                  |
| `src/components/SideBar.jsx:10`  | auth session   | yes                  |

### Fix

Install TanStack Query and wrap the app in a `QueryClientProvider`. Replace raw `useEffect`/`useState` fetch blocks with `useQuery` hooks. The cache is kept in memory for the session so subsequent navigations return data instantly.

```bash
npm install @tanstack/react-query
```

```jsx
// src/main.jsx (or index.js)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
```

```js
// src/hooks/useProjects.js
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(
          "id, title, image_url, description, tools, project_link, display_order",
        )
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, // treat data as fresh for 5 min
  });
}
```

```jsx
// src/projects/page.jsx  — replace fetchProjects useEffect with:
import { useProjects } from "../hooks/useProjects";

const { data: projects = [], isLoading } = useProjects();
```

```jsx
// src/components/Section1.jsx — reuse the same hook, filter client-side
const { data: allProjects = [] } = useProjects();
const topProjects = allProjects.slice(0, 2);
```

Both components now share a single cached result — zero extra network requests.

---

## Issue 2 — Large unoptimised image assets (~20 MB)

**Priority: High**

### Problem

The `src/assets/img/` folder contains uncompressed PNGs and JPEGs totalling roughly 20 MB. These are bundled/referenced directly with no compression or modern format conversion.

| File                       | Size   | Issue                |
| -------------------------- | ------ | -------------------- |
| `img_food.png`             | 3.4 MB | PNG should be WebP   |
| `img_productivity-app.png` | 3.1 MB | PNG should be WebP   |
| `img_fun.png`              | 2.5 MB | PNG should be WebP   |
| `img_gsyp.png`             | 2.2 MB | PNG should be WebP   |
| `img_concrete.jpg`         | 2.1 MB | Oversized background |
| `img_hl26.png`             | 1.6 MB | PNG should be WebP   |

### Fix

Convert all PNGs to WebP (typically 40–60 % smaller). Use [Squoosh](https://squoosh.app) for a GUI, or ImageMagick in batch:

```bash
# Run once from project root
for f in src/assets/img/*.png; do
  convert "$f" -quality 80 "${f%.png}.webp"
done
```

Then update every import/`src` reference from `.png` → `.webp`. For JPEG hero images, re-export at 80 % quality and no larger than 1200 px wide.

---

## Issue 3 — No `loading="lazy"` on any `<img>` tag

**Priority: High**

### Problem

Every `<img>` in the codebase loads eagerly, blocking the main thread while off-screen images download.

Affected locations:

| File                              | Lines             |
| --------------------------------- | ----------------- |
| `src/components/Section1.jsx`     | 81, 141, 181, 184 |
| `src/components/Section2.jsx`     | 18                |
| `src/components/Section4.jsx`     | 66                |
| `src/components/SideBar.jsx`      | 42                |
| `src/about/page.jsx`              | 35, 78            |
| `src/projects/page.jsx`           | 114               |
| `src/projects/AddProjectForm.jsx` | 134               |

### Fix

Add `loading="lazy"` to every non-hero `<img>`. The hero/above-the-fold image in Section1 should keep `loading="eager"` (or omit the attribute).

```jsx
// Before
<img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />

// After
<img
  src={project.image_url}
  alt={project.title}
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

---

## Issue 4 — No route-based code splitting

**Priority: High**

### Problem

`src/App.js` imports all three page components statically. The entire application JS is downloaded on first load, even if the user only visits `/`.

```js
// src/App.js (current)
import LandingPage from "./components/LandingPage.jsx";
import ProjectsPage from "./projects/page.jsx";
import AboutPage from "./about/page.jsx";
```

### Fix

Replace static imports with `React.lazy()` + `Suspense`:

```jsx
// src/App.js
import { lazy, Suspense } from "react";

const LandingPage = lazy(() => import("./components/LandingPage"));
const ProjectsPage = lazy(() => import("./projects/page"));
const AboutPage = lazy(() => import("./about/page"));

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Suspense>
  );
}
```

Expected impact: initial JS bundle reduced by ~20–30 %; `/projects` and `/about` chunks are fetched on demand.

---

## Issue 5 — FontAwesome is a heavy dependency (~500 KB unminified)

**Priority: Medium**

### Problem

Three FontAwesome packages are installed and used across four files for ~15 icons total:

```json
"@fortawesome/fontawesome-svg-core": "^6.5.2",
"@fortawesome/free-brands-svg-icons": "^6.5.2",
"@fortawesome/free-solid-svg-icons": "^6.5.2"
```

`lucide-react` is already installed in the project but underused. `react-icons` is also available and provides FA-compatible icons tree-shakeable per icon.

### Fix

Replace FontAwesome with `react-icons` (FA brand icons are available via `react-icons/fa`):

```jsx
// Before (Section1.jsx)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPython } from "@fortawesome/free-brands-svg-icons";
<FontAwesomeIcon icon={faPython} />;

// After
import { FaPython } from "react-icons/fa";
<FaPython />;
```

Once all icons are migrated, uninstall the three FontAwesome packages:

```bash
npm uninstall @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

---

## Issue 6 — Missing `.select()` column filtering in the Projects page query

**Priority: Medium**

### Problem

`src/projects/page.jsx:20` fetches every column with a wildcard:

```js
.select("*")
```

If the `projects` table has extra columns (internal metadata, admin fields, large text blobs), these are transferred to the client unnecessarily.

`src/components/Section1.jsx:46` already uses explicit column selection — use the same pattern.

### Fix

```js
// src/projects/page.jsx
const { data, error } = await supabase
  .from("projects")
  .select(
    "id, title, image_url, description, tools, project_link, display_order",
  )
  .order("display_order", { ascending: true });
```

---

## Issue 7 — Static arrays/objects recreated on every render

**Priority: Low**

### Problem

`src/components/Section1.jsx` defines the `techStack` array inside the component body (lines ~30–40). It is referentially new on every render, which can trigger needless work in child components that receive it as a prop.

```js
// Current — inside the component
const techStack = [
  { name: "Python", icon: faPython, color: "#3776AB" },
  { name: "Java", icon: faJava, color: "#007396" },
  // ...
];
```

### Fix

Move constant data outside the component module entirely (preferred over `useMemo` for truly static data):

```js
// At module scope — created once, never re-created
const TECH_STACK = [
  { name: "Python", icon: faPython, color: "#3776AB" },
  { name: "Java", icon: faJava, color: "#007396" },
  // ...
];

export default function Section1() {
  // use TECH_STACK directly
}
```

Similarly, replace `{[...Array(5)].map(...)}` (line ~166) with a module-level constant:

```js
const STAR_INDICES = [0, 1, 2, 3, 4];
// ...
{STAR_INDICES.map((i) => (...))}
```

---

## Issue 8 — No `React.memo` on reusable leaf components

**Priority: Low**

### Problem

Reusable components that receive stable props are not memoised. If a parent re-renders for unrelated state changes, these components re-render unnecessarily.

Affected files:

- `src/components/Modal.jsx`
- `src/components/ProgressBar.jsx`
- `src/components/CardProject.jsx`

### Fix

Wrap exports with `React.memo`:

```jsx
// src/components/ProgressBar.jsx
export default React.memo(ProgressBar);

// src/components/CardProject.jsx
export default React.memo(CardProject);

// src/components/Modal.jsx
export default React.memo(Modal);
```

---

## Issue 9 — Inline arrow functions in JSX `onClick` handlers

**Priority: Low**

### Problem

Handlers are defined inline, creating a new function reference on every render:

| File                              | Line | Code                                            |
| --------------------------------- | ---- | ----------------------------------------------- |
| `src/components/Section1.jsx`     | 154  | `onClick={() => setShowModal(true)}`            |
| `src/projects/page.jsx`           | 55   | `onClick={() => setShowForm(!showForm)}`        |
| `src/projects/AddProjectForm.jsx` | 150  | `onClick={() => fileInputRef.current?.click()}` |

This is harmless for plain DOM elements, but causes unnecessary re-renders if these handlers are passed as props to a `React.memo`-wrapped child.

### Fix

Use `useCallback` when the handler is passed to a child component:

```jsx
const handleShowModal = useCallback(() => setShowModal(true), []);
// <SomeChild onClick={handleShowModal} />
```

For handlers used only on native DOM elements (`<button>`, `<div>`), this is optional and can be deferred.

---

## Issue 10 — Inline `style={{}}` objects recreated on every render

**Priority: Low**

### Problem

Multiple components create new style objects inline:

| File                             | Lines              | Example                             |
| -------------------------------- | ------------------ | ----------------------------------- |
| `src/components/CardProject.jsx` | 18, 24, 35, 43, 94 | `style={{ perspective: "1500px" }}` |
| `src/components/Section1.jsx`    | 61, 110, 130       | `style={{ color: tech.color }}`     |
| `src/components/Section3.jsx`    | 11                 | `style={{ backgroundImage: ... }}`  |

### Fix

For static styles, extract to module-level constants or replace with Tailwind classes:

```jsx
// Before
<div style={{ perspective: "1500px" }}>

// After — constant (if dynamic Tailwind classes are not possible)
const CARD_STYLE = { perspective: '1500px' };
<div style={CARD_STYLE}>
```

For dynamic values (e.g. `tech.color`), `useMemo` inside the map callback is the correct approach, but the impact here is negligible.

---

## Supabase Client — Verified Good Practice

**No action required.**

`src/lib/supabaseClient.js` creates the client once and exports a singleton:

```js
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

All components import this shared instance — no per-component instantiation detected.

---

## Recommended Implementation Order

1. **Images** — Convert assets to WebP + add `loading="lazy"` (Issues 2 & 3). Zero code-logic risk, immediate payload reduction.
2. **Code splitting** — Add `React.lazy()` to `App.js` (Issue 4). One file change, high impact.
3. **Data caching** — Install TanStack Query, create `useProjects` hook, update `Section1` and `ProjectsPage` (Issue 1). Biggest architectural change but well-isolated.
4. **Column filtering** — Fix `.select("*")` in `projects/page.jsx` (Issue 6). One-liner.
5. **Bundle — FontAwesome** — Migrate icons to `react-icons`, remove three packages (Issue 5). Moderate effort, meaningful bundle saving.
6. **React micro-optimisations** — Issues 7–10. Address opportunistically during other feature work; low individual impact.
