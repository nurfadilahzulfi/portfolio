export const themeStorageKey = "theme";

// Saved choice wins; otherwise follow the system setting.
function prefersDark() {
  try {
    const saved = localStorage.getItem(themeStorageKey);
    if (saved) return saved === "dark";
  } catch {
    // Storage blocked; fall through to the system setting.
  }
  return matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applySavedTheme() {
  document.documentElement.classList.toggle("dark", prefersDark());
}

// Runs in <head> before first paint so a dark-mode visitor never sees a white flash.
// Same logic as applySavedTheme, inlined because it runs before any bundle loads.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${themeStorageKey}");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;
