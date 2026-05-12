import { z } from "zod";

import type { WSClientId } from "@/types";

export const WSClientIdSchema = z.custom<WSClientId>(
  (value) => typeof value === "string" && value.length > 0
);
