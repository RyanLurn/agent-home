import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";

import {
  MESSAGE_CONTENT_MAX_LENGTH,
  MESSAGE_CONTENT_MIN_LENGTH,
} from "@/schema/constants";
import { messageTable } from "@/schema/tables/message";

const MessageContentSchema = z
  .string()
  .min(MESSAGE_CONTENT_MIN_LENGTH)
  .max(MESSAGE_CONTENT_MAX_LENGTH);

export const SelectedMessageSchema = createSelectSchema(messageTable, {
  id: z.uuidv7(),
  content: MessageContentSchema,
});

export const InsertedMessageSchema = createInsertSchema(messageTable, {
  id: z.uuidv7().optional(),
  content: MessageContentSchema,
});
