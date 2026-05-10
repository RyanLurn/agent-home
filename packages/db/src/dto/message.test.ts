import { expectTypeOf, describe, expect, test } from "bun:test";
import { z } from "zod";

import type { SelectedMessage } from "@/types";

import {
  createMessageDTO,
  MessageDTOSchema,
  type MessageDTO,
} from "@/dto/message";

const testMessage: SelectedMessage = {
  id: crypto.randomUUID(),
  sender: "user",
  content: "Hi, agent.",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

describe("MessageDTOSchema should fail to validate SelectedMessage because", () => {
  const validationResult = MessageDTOSchema.safeParse(testMessage, {
    reportInput: true,
  });
  expect(validationResult.success).toBeFalse();

  if (!validationResult.success) {
    const issues = validationResult.error.issues;

    test("it has 3 validation issues", () => {
      expect(validationResult.error.issues).toHaveLength(3);
    });

    const extraKey: keyof SelectedMessage = "deletedAt";
    test(`it has an extra key of ${extraKey}`, () => {
      expect.hasAssertions();

      const deletedAtExtraKeyIssue = issues.find(
        (issue) => issue.code === "unrecognized_keys"
      );

      if (deletedAtExtraKeyIssue) {
        expect(deletedAtExtraKeyIssue.keys).toHaveLength(1);
        expect(deletedAtExtraKeyIssue.keys[0]).toBe(extraKey);
      }
    });

    const createdAtKey: keyof SelectedMessage = "createdAt";
    test(`its ${createdAtKey} property is an instnace of Date, not a string`, () => {
      expect.hasAssertions();

      const createdAtIssue = issues.find(
        (issue) => issue.path.length === 1 && issue.path[0] === createdAtKey
      );

      if (createdAtIssue && createdAtIssue.code === "invalid_type") {
        expect(createdAtIssue.expected).toBe("string");
        expect(createdAtIssue.input).toBeInstanceOf(Date);
      }
    });

    const updatedAtKey: keyof SelectedMessage = "updatedAt";
    test(`its ${updatedAtKey} property is an instnace of Date, not a string`, () => {
      expect.hasAssertions();

      const updatedAtIssue = issues.find(
        (issue) => issue.path.length === 1 && issue.path[0] === updatedAtKey
      );

      if (updatedAtIssue && updatedAtIssue.code === "invalid_type") {
        expect(updatedAtIssue.expected).toBe("string");
        expect(updatedAtIssue.input).toBeInstanceOf(Date);
      }
    });
  }
});

describe("createMessageDTO function", () => {
  const messageDTO = createMessageDTO(testMessage);

  test("should return a valid message DTO", () => {
    const validationResult = MessageDTOSchema.safeParse(messageDTO);
    expect(validationResult.success).toBeTrue();
  });

  test("should return a JSON-serializable value", () => {
    const validationResult = z.json().safeParse(messageDTO);
    expect(validationResult.success).toBeTrue();
  });

  // Type testing. These functions are no-ops at runtime.
  expectTypeOf(createMessageDTO).parameters.toEqualTypeOf<[SelectedMessage]>();
  expectTypeOf(createMessageDTO).returns.toEqualTypeOf<MessageDTO>();
});
