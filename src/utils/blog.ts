import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

interface Frontmatter {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export async function getBlogPosts() {
  const filenames = await fs.readdir(path.join(process.cwd(), "src/posts"));

  return Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.readFile(
        path.join(process.cwd(), "src/posts", filename),
        "utf-8"
      );
      const { frontmatter } = await compileMDX<Frontmatter>({
        source: content,
        options: {
          parseFrontmatter: true,
        },
      });
      return {
        filename,
        slug: filename.replace(".mdx", ""),
        ...frontmatter,
      };
    })
  );
}
