import type { ReactNode } from "react";

import { createContext, useEffect, useState } from "react";

import type { UserTheme, AppTheme } from "@/theme/utils";

import {
  handleThemeChange,
  UserThemeSchema,
  getSystemTheme,
  getStoredTheme,
  setStoredTheme,
} from "@/theme/utils";

type ThemeContextProps = {
  setTheme: (theme: UserTheme) => void;
  userTheme: UserTheme;
  appTheme: AppTheme;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [userTheme, setUserTheme] = useState<UserTheme>(getStoredTheme());

  useEffect(() => {
    if (userTheme !== "system") {
      return;
    }

    function systemThemeChangeHandler() {
      handleThemeChange({ userTheme: "system" });
    }

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", systemThemeChangeHandler);

    return () => {
      mediaQueryList.removeEventListener("change", systemThemeChangeHandler);
    };
  }, [userTheme]);

  const appTheme = userTheme === "system" ? getSystemTheme() : userTheme;

  function setTheme(newUserTheme: UserTheme) {
    const newValidTheme = UserThemeSchema.parse(newUserTheme);

    handleThemeChange({ userTheme: newValidTheme });
    setUserTheme(newValidTheme);

    setStoredTheme({ theme: newValidTheme });
  }

  return (
    <ThemeContext value={{ userTheme, appTheme, setTheme }}>
      {children}
    </ThemeContext>
  );
}
