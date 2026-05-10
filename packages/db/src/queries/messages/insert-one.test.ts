import { afterAll, expect, test } from "bun:test";
import { eq } from "drizzle-orm";

import { insertOneMessage } from "@/queries/messages/insert-one";
import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

let testMessageId: string;

test("should insert 1 message", async () => {
  expect.hasAssertions();

  const sender = "agent";
  const content = "Good morning, user.";

  const insertResult = await insertOneMessage({ sender, content });

  if (insertResult.success) {
    const message = insertResult.data;

    expect(typeof message.id).toBe("string");
    expect(message.id).toBeTruthy();

    expect(message.createdAt).toBeInstanceOf(Date);
    expect(message.updatedAt).toBeInstanceOf(Date);

    expect(message).not.toContainAllKeys(["deletedAt"]);

    expect(message).toHaveProperty("sender", sender);
    expect(message).toHaveProperty("content", content);

    testMessageId = message.id;
  }
});

afterAll(async () => {
  try {
    await db.delete(messageTable).where(eq(messageTable.id, testMessageId));
  } catch (error) {
    console.error("insertOneMessage function's test cleanup failed:");
    console.error(error);
    throw error;
  }
});
