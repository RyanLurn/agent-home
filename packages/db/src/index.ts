import { drizzle } from "drizzle-orm/bun-sqlite";
import { createEnv } from "@t3-oss/env-core";
import { join } from "node:path";
import { z } from "zod";

import { messageTable } from "@/schema/tables/message";
import * as agentTables from "@/schema/tables/agent";

export const dbEnvVars = createEnv({
  server: {
    SQLITE_FILE_PATH: z
      .string()
      .min(1)
      .default(() => {
        if (process.env.NODE_ENV === "production") {
          throw new Error("Missing SQLITE_FILE_PATH environment variable.");
        }
        // Resolve from this file's directory to the SQLite file in the root workspace's directory
        return join(import.meta.dir, "../../..", "dev.sqlite");
      }),
  },
  runtimeEnv: process.env,
});

export const db = drizzle(dbEnvVars.SQLITE_FILE_PATH, {
  schema: { ...agentTables, messageTable },
});
