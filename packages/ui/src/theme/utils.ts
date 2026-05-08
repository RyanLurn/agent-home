import z from "zod";

export const UserThemeSchema = z
  .enum(["light", "dark", "system"])
  .catch("system");
export type UserTheme = z.infer<typeof UserThemeSchema>;

export const AppThemeSchema = z.enum(["light", "dark"]).catch("light");
export type AppTheme = z.infer<typeof AppThemeSchema>;

export const THEME_STORAGE_KEY = "ui-theme";

export function getStoredTheme() {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const theme = UserThemeSchema.parse(storedTheme);
    return theme;
  } catch {
    return "system";
  }
}

export function setStoredTheme({ theme }: { theme: UserTheme }) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const validTheme = UserThemeSchema.parse(theme);
    localStorage.setItem(THEME_STORAGE_KEY, validTheme);
  } catch {
    return;
  }
}

export function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const matchedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  return matchedTheme;
}

export function handleThemeChange({ userTheme }: { userTheme: UserTheme }) {
  if (typeof window === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.classList.remove("light", "dark", "system");

  const validTheme = UserThemeSchema.parse(userTheme);
  if (validTheme === "system") {
    const systemTheme = getSystemTheme();
    root.classList.add(systemTheme, "system");
  } else {
    root.classList.add(validTheme);
  }
}
