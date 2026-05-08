import { HOME_APP_PORT } from "@repo/core/constants/ports";
import { webAppConfig } from "@repo/vite-config";
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  ...webAppConfig,
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: HOME_APP_PORT,
  },
});
