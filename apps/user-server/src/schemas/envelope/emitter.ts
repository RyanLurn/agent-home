import { z } from "zod";

export const EnvelopeEmitterSchema = z.enum(["client", "server"]);
export type EnvelopeEmitter = z.infer<typeof EnvelopeEmitterSchema>;
