import { defineConfig } from "tsdown";

export default defineConfig({
  dts: {
    sourcemap: true,
  },
  entry: "src/rpc-client.ts",
  unbundle: true,
});
