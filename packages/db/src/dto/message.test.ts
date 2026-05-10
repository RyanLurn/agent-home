import { beforeAll, afterAll, expect, test } from "bun:test";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createMessageDTO, type MessageDTO } from "@/dto/message";
import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

let messageDTO: MessageDTO;

beforeAll(async () => {
  try {
    const [returnedMessage] = await db
      .insert(messageTable)
      .values({
        sender: "user",
        content: "Hi, agent!",
      })
      .returning();

    if (!returnedMessage) {
      throw new Error("Failed to insert test message");
    }

    messageDTO = createMessageDTO(returnedMessage);
  } catch (error) {
    console.error("Message DTO's test setup failed:");
    console.error(error);
    throw error;
  }
});

test("Message DTO should be JSON-serializable", () => {
  const validationResult = z.json().safeParse(messageDTO);
  expect(validationResult.success).toBeTrue();
});

test("Message DTO should NOT contain deletedAt key", () => {
  expect(messageDTO).not.toContainAllKeys(["deletedAt"]);
});

test("Message DTO's createdAt and updatedAt properties should have values following the ISO 8601 format", () => {
  const createdAtValidationResult = z.iso
    .datetime()
    .safeParse(messageDTO.createdAt);
  expect(createdAtValidationResult.success).toBeTrue();

  const updatedAtValidationResult = z.iso
    .datetime()
    .safeParse(messageDTO.updatedAt);
  expect(updatedAtValidationResult.success).toBeTrue();
});

afterAll(async () => {
  try {
    await db.delete(messageTable).where(eq(messageTable.id, messageDTO.id));
  } catch (error) {
    console.error("Message DTO's test cleanup failed:");
    console.error(error);
    throw error;
  }
});
