# Frontend Tech Stack

Agenza's frontend is designed for high impact, high performance, and a raw neobrutalist aesthetic.

## Core Framework
- **Next.js 14**: Utilizing the App Router for server-side rendering, streaming, and efficient routing.
- **React**: Modern functional components and hooks.

## Styling & Design System
- **Vanilla CSS**: Comprehensive, ad-hoc-free design system implemented in `globals.css`.
- **CSS Modules**: Scoped styling for components to ensure maintainability.
- **Neobrutalist Tokens**:
  - **Colors**: High-contrast palette (Harsh Yellow, Neon Green, Radical Red).
  - **Borders**: Sharp `3px` and `5px` black borders on all elements.
  - **Shadows**: Hard, non-blurred `6px` offsets for that "brutal" depth.
  - **Typography**: `Space Grotesk` for headings and `JetBrains Mono` for execution logs and technical data.

## Animation & UI Components
- **Framer Motion**: Used for fluid entrance animations, layout transitions, and the "Swarm Protocol" visualizations.
- **Lucide React**: Clean, consistent iconography throughout the platform.
- **Dynamic Themes**: Context-based Day/Night mode implementation with CSS variable injection.

## State Management & Context
- **React Context API**: Used for global theme management and persistent user settings.
- **React Hooks**: `useState`, `useEffect`, and `useRef` for complex UI interactions like the Arena log streaming and the asymptotic loading bar.

## Performance Optimization
- **Image Optimization**: Utilizing `next/image` for responsive, optimized assets.
- **Suppressed Hydration**: Strategic use of `suppressHydrationWarning` to ensure stability across varied browser environments and extensions.
