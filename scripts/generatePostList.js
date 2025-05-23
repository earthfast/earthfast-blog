import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.resolve(process.cwd(), "src/content");
const outputPath = path.resolve(process.cwd(), "src/config/posts.ts");

function getPostSlugs(directory) {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(directory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      return { ...data, slug: file.replace(".mdx", "") };
    })
    .filter((post) => !post.hidden)
    .map((post) => post.slug);
}

function generateFileContent(posts) {
  return `
// This file is automatically generated - do not edit manually
export const posts = ${JSON.stringify(posts, null, 2)} as const;
`;
}

function writeToFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content);
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error);
  }
}

const posts = getPostSlugs(contentDir);
const fileContent = generateFileContent(posts);
writeToFile(outputPath, fileContent);
