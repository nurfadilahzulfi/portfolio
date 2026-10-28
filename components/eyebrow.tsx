import { cn } from "@/lib/utils";

// The "✱ LABEL" marker from the home page hero, reused as a section kicker.
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300", className)}>
      <span className="text-xl text-red-500" aria-hidden="true">
        ✱
      </span>
      {children}
    </p>
  );
}
