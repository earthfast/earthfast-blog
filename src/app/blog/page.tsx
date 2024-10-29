import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";

export const metadata = {
  title: "Projects",
  description:
    "Use these 50 real-world project ideas to learn by doing including building an ecommerce store and a budget manager.",
};

export default async function Projects() {
  const filenames = await fs.readdir(path.join(process.cwd(), "src/blogs"));

  interface Frontmatter {
    title: string;
  }

  const projects = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.readFile(
        path.join(process.cwd(), "src/blogs", filename),
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

  return (
    <section >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-10 md:mb-16">
          Projects to Start Building
        </h1>

          <h2 className="sr-only">Project Ideas</h2>
          <ul>
            {projects.map(({ title, slug }) => {
              return (
                <li key={slug}>
                  <Link href={`/blog/${slug}`}>{title}</Link>
                </li>
              );
            })}
          </ul>
    </section>
  );
}
