import { WEB_APP_PORT } from "@repo/core/constants/ports";
import { hc } from "hono/client";

import type { api } from "@/lib/api";

export const client = hc<typeof api>(`http://localhost:${WEB_APP_PORT}/`);
