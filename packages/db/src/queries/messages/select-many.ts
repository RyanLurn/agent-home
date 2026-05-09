import { desc, asc, and, lt, gt, or, eq } from "drizzle-orm";

import type { SelectedMessage } from "@/types";

import { messageTable } from "@/schema/tables/message";
import { db } from "@/index";

export async function selectManyMessages({
  cursor,
  order = "desc",
  pageSize = 10,
}: {
  cursor?: Pick<SelectedMessage, "createdAt" | "id">;
  order?: "desc" | "asc";
  pageSize?: number;
}) {
  const rows = await db
    .select()
    .from(messageTable)
    .where(
      cursor
        ? or(
            order === "desc"
              ? lt(messageTable.createdAt, cursor.createdAt)
              : gt(messageTable.createdAt, cursor.createdAt),
            and(
              eq(messageTable.createdAt, cursor.createdAt),
              order === "desc"
                ? lt(messageTable.id, cursor.id)
                : gt(messageTable.id, cursor.id)
            )
          )
        : undefined
    )
    .limit(pageSize + 1)
    .orderBy(
      order === "desc"
        ? desc(messageTable.createdAt)
        : asc(messageTable.createdAt)
    );

  const hasMore = rows.length > pageSize;
  const data = hasMore ? rows.slice(0, -1) : rows;
  const nextRow = hasMore ? data[data.length - 1] : undefined;
  const nextCursor = nextRow
    ? { id: nextRow.id, createdAt: nextRow.createdAt }
    : null;

  return {
    data,
    metadata: {
      pagination: {
        order,
        pageSize,
        nextCursor,
        hasMore,
      },
    },
  };
}
