import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "src/content");
const outputPath = path.join(process.cwd(), "src/config/posts.ts");

const posts = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => file.replace(".mdx", ""));

const fileContent = `
// Este archivo se genera automáticamente - no editar manualmente
export const posts = ${JSON.stringify(posts, null, 2)} as const;
`;

fs.writeFileSync(outputPath, fileContent);
