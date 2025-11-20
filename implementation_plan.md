# Hero Transition Implementation Plan

## Goal
Implement a "Hero Transition" effect for project cards where clicking a card smoothly expands it to fill the screen using a custom FLIP technique, as requested by the user.

## User Review Required
- The new effect will act as a modal overlay on the main page.
- Navigation to `/projects/[slug]` will be intercepted to show this overlay instead.
- Deep linking (refreshing on the detail view) will still work if the existing `/projects/[slug]` route is kept, but the transition is primarily for the main page user flow.

## Proposed Changes

### Components

#### [NEW] [ProjectsGrid.tsx](file:///Users/philipm614/PhilipWebsite/components/ProjectsGrid.tsx)
- A new client component that renders the grid of projects.
- Manages the state of the selected project and the animation logic.
- Handles the "FLIP" animation:
    - Captures card position on click.
    - Renders a fixed overlay.
    - Animates from card position to full screen.
    - Handles closing animation.

#### [MODIFY] [ProjectCard.tsx](file:///Users/philipm614/PhilipWebsite/components/ProjectCard.tsx)
- Accept `onClick` prop to handle the expansion trigger.
- Forward `ref` or expose a way to get the DOM element for measurement.
- Disable the default `next/link` or `router.push` behavior when `onClick` is provided.

### Pages

#### [MODIFY] [page.tsx](file:///Users/philipm614/PhilipWebsite/app/page.tsx)
- Replace the direct mapping of `projects` and `ProjectCard` with the new `ProjectsGrid` component.

## Verification Plan

### Manual Verification
- Open the main page.
- Click on a project card ("Geni" or "Research").
- Verify the card expands smoothly to fill the screen.
- Verify the content fades in.
- Click "Back" or close button.
- Verify the card shrinks back to its original position.
- Verify hover effects on the card still work when not expanded.
