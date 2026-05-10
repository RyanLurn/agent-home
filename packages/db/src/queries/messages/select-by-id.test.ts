import { NotFoundError } from "@repo/core/error/classes/not-found";
import { beforeAll, afterAll, expect, test } from "bun:test";
import { eq } from "drizzle-orm";

import { selectMessageById } from "@/queries/messages/select-by-id";
import { messageTable } from "@/schema/tables/message";
import { MessageDTOSchema } from "@/dto/message";
import { db } from "@/index";

const testMessageId = crypto.randomUUID();

beforeAll(async () => {
  try {
    await db.insert(messageTable).values({
      id: testMessageId,
      sender: "agent",
      content: "Greetings, user.",
    });
  } catch (error) {
    console.error("Test setup failed:");
    console.error(error);
    throw error;
  }
});

test("selectMessageById function should select the a message by its id and return a message DTO", async () => {
  expect.hasAssertions();

  const selectResult = await selectMessageById({ id: testMessageId });

  if (selectResult.success) {
    const validationResult = MessageDTOSchema.safeParse(selectResult.data);
    expect(validationResult.success).toBeTrue();
  }
});

test("selectMessageById function should return a NotFoundError when given a message id that doesn't exist", async () => {
  expect.hasAssertions();

  const selectResult = await selectMessageById({ id: "Yo" });

  if (!selectResult.success) {
    expect(selectResult.error).toBeInstanceOf(NotFoundError);
  }
});

afterAll(async () => {
  try {
    await db.delete(messageTable).where(eq(messageTable.id, testMessageId));
  } catch (error) {
    console.error("Test cleanup failed:");
    console.error(error);
    throw error;
  }
});
