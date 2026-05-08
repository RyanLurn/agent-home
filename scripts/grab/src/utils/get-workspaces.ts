import type { BunLockFile } from "bun";

import { parse } from "jsonc-parser";
import { join } from "node:path";

import { ROOT_DIR } from "@/constants";

export async function getWorkspaces() {
  const lockfileContent = await Bun.file(join(ROOT_DIR, "bun.lock")).text();

  const lockfile = parse(lockfileContent, undefined, {
    allowTrailingComma: true,
  }) as BunLockFile;

  const workspaces = [];

  for (const [key, value] of Object.entries(lockfile.workspaces)) {
    workspaces.push({
      name: value.name ?? "<Unnamed workspace>",
      path: join(ROOT_DIR, key),
    });
  }

  return workspaces;
}
