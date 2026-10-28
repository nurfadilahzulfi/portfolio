"use client";

// Runs during HTML parsing on the first load. On the client it renders as
// text/plain so React doesn't warn about script tags it can't execute.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
