import { afterAll, expect, test } from "bun:test";
import { eq } from "drizzle-orm";

import { insertOneMessage } from "@/queries/messages/insert-one";
import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

const testMessageId = crypto.randomUUID();

test("should insert 1 message", async () => {
  const insertResult = await insertOneMessage({
    id: testMessageId,
    sender: "agent",
    content: "Good morning, user.",
  });
  expect(insertResult).toBeDefined();
});

afterAll(async () => {
  await db.delete(messageTable).where(eq(messageTable.id, testMessageId));
});
