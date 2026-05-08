import { defineConfig } from "tsdown";

export const internalPackageConfig = defineConfig({
  dts: {
    sourcemap: true,
  },
  entry: ["src/**/*.ts", "src/**/*.tsx", "!src/try.ts"],
  unbundle: true,
});
