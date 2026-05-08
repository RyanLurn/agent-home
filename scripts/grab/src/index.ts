import { multiselect, isCancel, cancel, select, log } from "@clack/prompts";
import { parse, join } from "node:path";

import { getWorkspaces } from "@/utils/get-workspaces";
import { getFilePaths } from "@/utils/get-file-paths";
import { processFile } from "@/utils/process-file";
import { ROOT_DIR, OUT_DIR } from "@/constants";

try {
  await main();

  process.exit(0);
} catch (error) {
  if (error instanceof Error) {
    log.error(error.message);
  }
  log.error("Something went wrong.");

  process.exit(1);
}

async function main() {
  const workspaces = await getWorkspaces();

  const selectedWorkspacePath = await select({
    message: "Which workspace would you like to grab?",
    options: workspaces.map(({ name, path }) => ({
      value: path,
      label: name,
      hint: path,
    })),
  });

  if (isCancel(selectedWorkspacePath)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const ignoredDirs: string[] = [];

  if (selectedWorkspacePath === ROOT_DIR) {
    const nonRootWorkspaces = workspaces.filter(
      ({ path }) => path !== ROOT_DIR
    );

    const ignoredWorkspaces = await multiselect({
      message: "Which ones would you like to ignore?",
      options: nonRootWorkspaces.map(({ name, path }) => ({
        value: { name, path },
        label: name,
        hint: path,
      })),
      required: false,
    });

    if (isCancel(ignoredWorkspaces)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }

    if (ignoredWorkspaces.length > 0) {
      for (const ignoredWorkspace of ignoredWorkspaces) {
        ignoredDirs.push(ignoredWorkspace.path);
      }

      const ignoredWorkspaceNames = ignoredWorkspaces.map(({ name }) => name);
      log.info(`${ignoredWorkspaceNames.join(", ")} will be skipped.`);
    } else {
      log.info("No workspace will be skipped.");
    }
  }

  log.step("Getting files from Git...");
  const filePaths = await getFilePaths({ dir: selectedWorkspacePath });

  let outputContent = "";

  log.step("Processing files...");
  for (const path of filePaths) {
    const content = await processFile({ path, ignoredDirs });

    outputContent += content;
    outputContent += "\n";
  }

  const outputFile = `${parse(selectedWorkspacePath).name}.md`;
  await Bun.write(join(OUT_DIR, `${outputFile}`), outputContent);

  log.success(`Grabbed files and saved them in ${outputFile}`);
}
