import { defineConfig } from "tsdown";

export default defineConfig({
  dts: {
    sourcemap: true,
  },
  entry: "src/lib/api/client.ts",
  unbundle: true,
});
