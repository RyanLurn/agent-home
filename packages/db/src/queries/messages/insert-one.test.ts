import { afterAll, expect, test } from "bun:test";
import { eq } from "drizzle-orm";

import { insertOneMessage } from "@/queries/messages/insert-one";
import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

let testMessageId: undefined | string = undefined;

test("insertOneMessage function should insert sender and content, then return a message DTO", async () => {
  expect.hasAssertions();

  const insertResult = await insertOneMessage({
    sender: "agent",
    content: "Good morning, user.",
  });

  if (insertResult.success) {
    const messageDTO = insertResult.data;
    expect(messageDTO).toContainAllKeys([
      "id",
      "sender",
      "content",
      "createdAt",
      "updatedAt",
    ]);

    testMessageId = insertResult.data.id;
  }
});

afterAll(async () => {
  if (testMessageId) {
    try {
      await db.delete(messageTable).where(eq(messageTable.id, testMessageId));
    } catch (error) {
      console.error("Test cleanup failed:");
      console.error(error);
      throw error;
    }
  }
});
