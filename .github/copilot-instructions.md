# Copilot Coding Agent Instructions

These instructions describe the current Next.js + Tailwind personal portfolio codebase. Focus on concrete existing patterns (not aspirational). Keep changes minimal and consistent.

## Stack & Runtime
- Framework: Next.js App Router (`app/`), React 19.
- Styling: Tailwind CSS v4 (JIT) via `@import "tailwindcss"` in `app/globals.css`; no custom design tokens yet.
- TypeScript strict mode; path alias `@/*` -> project root (see `tsconfig.json`).
- No backend API routes, database, or server actions: all data is static in `data/`.

## Project Structure Highlights
- `app/layout.tsx`: Defines global `<html>` skeleton, sets `metadata` (title/description), applies base body classes.
- `app/page.tsx`: Home page listing projects from `data/projects.ts` using summary cards (shows first 3 `techStack` items via `slice(0,3)`).
- `app/projects/[slug]/page.tsx`: Dynamic project detail route. Uses `generateStaticParams()` + `getProjectBySlug()` for static generation. Uses `notFound()` for invalid slugs.
- `data/projects.ts`: Single source of truth for portfolio content. Interface `Project` + array `projects` + helper `getProjectBySlug`.
- `tailwind.config.ts`: Scans `./app/**` and `./components/**`. (Note: `components/` does not yet exist—create it for shared UI.)

## Conventions & Patterns
- Data-driven routing: Adding a new project (object with unique `slug`) to `projects` automatically enables its page; rebuild/restart dev server to pick up new params for SSG.
- Static generation: Avoid fetching during runtime; rely on local imports and `generateStaticParams()`.
- Error handling: Use `notFound()` (Next.js built-in) instead of custom 404 logic for missing resources in dynamic routes.
- Imports: Prefer absolute alias `@/data/projects` instead of relative paths.
- Styling: Utility-first Tailwind classes directly in JSX; keep global CSS minimal. Use semantic HTML (`<main>`, `<section>`, `<article>`, `<aside>`).
- External links: Include `target="_blank" rel="noopener noreferrer"` for safety/performance (as seen in social links).
- Tech stack badges: Small presentational spans with consistent classes; replicate pattern for new badge sets.

## Adding / Modifying Content
1. Add new project: Append to `projects` array with all fields; ensure `slug` is URL-safe (lowercase, hyphens).
2. Extend `Project` interface: Update interface, adjust existing objects, then render new fields explicitly in both list and detail pages.
3. Display more tech tags on home: Modify `slice(0, 3)` in `app/page.tsx`—ensure layout still responsive.
4. Global styles: Add new utilities via Tailwind (avoid writing custom CSS unless necessary). If custom CSS needed, place in `globals.css` sparingly.

## Typical Dev Workflow
- Start dev server: `npm run dev`
- Production build: `npm run build`
- Run prod locally: `npm run start`
- Lint: `npm run lint`
(There are currently no tests; do not invent a testing framework without explicit request.)

## Safe Extension Guidelines
- When introducing components, create `components/` directory (already in Tailwind content glob) and export small, pure presentational components; avoid stateful logic unless required.
- Maintain strict TypeScript types; update affected imports if interface changes.
- Keep accessibility: Preserve semantic tags and readable contrast (dark text on white background currently). When adding interactive elements, include appropriate ARIA attributes.
- Avoid adding runtime dependencies unless clearly beneficial; prefer framework-native features.

## Potential Refinements (Ask Before Implementing)
- Add unit tests (none exist) using Jest or Vitest.
- Add dark mode via Tailwind `dark:` variants.
- Introduce MDX for project descriptions.

## Common Pitfalls
- Forgetting to restart dev server after adding new `slug` -> page might not be statically generated.
- Adding `components/` without updating import paths (remember alias `@/components/...`).
- Extending `Project` without updating both list and detail renderers leads to inconsistent UI.

## Example: New Project Entry
```ts
{
  slug: "my-new-project",
  title: "My New Project",
  role: "Developer",
  techStack: ["Next.js", "TypeScript"],
  description: [
    "Short paragraph 1.",
    "Short paragraph 2."
  ]
}
```

Clarify anything missing or request expansion before large structural changes.
