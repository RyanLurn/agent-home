import { z } from "zod";

import type { WSClientId } from "@/types";

export const EnvelopeSenderSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("server") }),
  z.object({
    type: z.literal("client"),
    id: z.custom<WSClientId>(
      (value) => typeof value === "string" && value.length > 0
    ),
  }),
]);
export type EnvelopeSender = z.infer<typeof EnvelopeSenderSchema>;
