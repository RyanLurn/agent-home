import { z } from "zod";

export const EnvelopeSenderSchema = z.enum(["client", "server"]);
export type EnvelopeSender = z.infer<typeof EnvelopeSenderSchema>;
