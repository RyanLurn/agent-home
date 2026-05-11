import { selectAllContextEntries } from "@repo/db/queries/context-entry-table/select-all";

export async function getState() {
  const contextEntries = await selectAllContextEntries();
  return { contextEntries };
}
