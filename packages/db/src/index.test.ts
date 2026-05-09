import { expect, test } from "bun:test";
import { join } from "node:path";

import { devDbFilePath } from "@/index";

test("SQLite file path for development should resolve to the root workspace directory", async () => {
  const bunLockfilePath = join(devDbFilePath, "../bun.lock");
  const bunLockfile = Bun.file(bunLockfilePath);
  const exist = await bunLockfile.exists();
  expect(exist).toBeTrue();
});
