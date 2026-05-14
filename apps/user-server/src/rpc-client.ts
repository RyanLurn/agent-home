import { USER_SERVER_PORT } from "@repo/core/constants/ports";
import { hc } from "hono/client";

import type { app } from "@/index";

export const rpcClient = hc<typeof app>(
  `http://localhost:${USER_SERVER_PORT}/`
);
