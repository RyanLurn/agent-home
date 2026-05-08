export const inlineThemeScript = (function () {
  function themeFn() {
    try {
      const storedTheme = localStorage.getItem("ui-theme") || "system";
      const validTheme = ["system", "light", "dark"].includes(storedTheme)
        ? storedTheme
        : "system";

      if (validTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        document.documentElement.classList.add(systemTheme, "system");
      } else {
        document.documentElement.classList.add(validTheme);
      }
    } catch {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.classList.add(systemTheme, "system");
    }
  }
  return `(${themeFn.toString()})();`;
})();
