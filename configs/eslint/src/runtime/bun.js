import prettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import globals from "globals";

import { baseConfig } from "../base.js";

export const bunConfig = defineConfig([
  baseConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      globals: {
        ...globals.bunBuiltin,
      },
    },
  },
  prettier,
]);
