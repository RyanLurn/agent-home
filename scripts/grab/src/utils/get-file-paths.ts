import { join } from "node:path";
import { $ } from "bun";

export async function getFilePaths({ dir }: { dir: string }) {
  const gitLsFilesOutput = await $`git ls-files`.cwd(dir).text();
  const relativePaths = gitLsFilesOutput.trim().split("\n");
  return relativePaths.map((relativePath) => join(dir, relativePath));
}
