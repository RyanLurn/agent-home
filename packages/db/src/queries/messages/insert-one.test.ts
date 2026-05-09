import { afterAll, expect, test } from "bun:test";
import { SQLiteError } from "bun:sqlite";
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

test("should throw error on duplicate primary key", async () => {
  expect.assertions(1);

  try {
    await insertOneMessage({
      id: testMessageId,
      sender: "user",
      content: "Good morning, agent.",
    });
  } catch (error) {
    if (error instanceof SQLiteError) {
      expect(error.code).toBe("SQLITE_CONSTRAINT_PRIMARYKEY");
    }
  }
});

afterAll(async () => {
  await db.delete(messageTable).where(eq(messageTable.id, testMessageId));
});
