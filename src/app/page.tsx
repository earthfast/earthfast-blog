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
  const filenames = await fs.readdir(path.join(process.cwd(), "src/posts"));

  interface Frontmatter {
    title: string;
    description: string;
  }

  const projects = await Promise.all(
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

  return (
    <section>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-10 md:mb-16">
        Earthfast blog
      </h1>

      <h2 className="sr-only">Project Ideas</h2>
      <ul>
        {projects.map(({ title, description,slug }) => {
          return (
            <li key={slug} className="mb-4">
              <Link href={`/${slug}`} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">{title}</h3>
                <p className="mt-2 text-gray-600">{description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
