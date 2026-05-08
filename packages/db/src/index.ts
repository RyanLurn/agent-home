import { drizzle } from "drizzle-orm/bun-sqlite";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import * as agentTables from "@/schema/tables/agent";

const envVars = createEnv({
  server: {
    SQLITE_FILE_PATH: z.url(),
  },
  runtimeEnv: process.env,
});

export const db = drizzle(envVars.SQLITE_FILE_PATH, {
  schema: { ...agentTables },
});
