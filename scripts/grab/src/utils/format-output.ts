export function formatOutput({
  content,
  path,
  ext,
}: {
  content: string;
  path: string;
  ext: string;
}) {
  return `Path: \`${path}\`
\`\`\`${ext.slice(1)}
${content.trim()}
\`\`\`
`;
}
