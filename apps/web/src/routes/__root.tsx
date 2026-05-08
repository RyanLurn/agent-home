import type { ReactNode } from "react";

import {
  createRootRoute,
  HeadContent,
  ScriptOnce,
  Scripts,
} from "@tanstack/react-router";
import { inlineThemeScript } from "@repo/ui/theme/inline-script";
import { ThemeProvider } from "@repo/ui/theme/provider";
import { ModeToggle } from "@repo/ui/theme/mode-toggle";
import { Toaster } from "@repo/ui/components/toaster";

import styles from "@/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "Ultra Bun Web App",
      },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { type: "image/svg+xml", href: "/favicon.svg", rel: "icon" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ScriptOnce children={inlineThemeScript} />
        <ThemeProvider>
          <Toaster position="top-center" closeButton richColors />
          {children}
          <ModeToggle className="fixed top-3 right-3 z-50" />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
