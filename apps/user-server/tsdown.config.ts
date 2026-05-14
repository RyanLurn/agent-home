import { defineConfig } from "tsdown";

export default defineConfig({
  dts: {
    sourcemap: true,
  },
  entry: ["src/client/**/*.ts", "!src/client/**/*.test.ts"],
  unbundle: true,
});
