import { ViewTransition, type ReactNode } from "react";

// Wraps a page's content so route changes fade the old page out and ease the
// new one in. Must sit in each page.tsx: layouts persist, so they never
// enter or exit. Animations are defined in globals.css (.page-enter/.page-exit).
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
