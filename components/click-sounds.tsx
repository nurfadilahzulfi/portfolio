"use client";

import { useEffect } from "react";
import { isSoundOn, playSelect } from "@/lib/sound";

// One listener for the whole site, so every link and button (including ones
// added later) gets the select sound without wiring each component.
export function ClickSounds() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!isSoundOn()) return;
      const target = (event.target as Element | null)?.closest(
        "a[href], button, [role='button'], summary"
      );
      if (!target || target.matches(":disabled, [aria-disabled='true']")) return;
      if (target.closest("[data-no-click-sound]")) return;
      playSelect();
    };
    // Capture phase: fires before navigation or state changes swap the element out.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
