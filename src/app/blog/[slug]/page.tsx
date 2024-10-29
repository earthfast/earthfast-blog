import { compileMDX } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import path from "path";

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const content = await fs.readFile(
    path.join(process.cwd(), "src/blogs", `${params.slug}.mdx`),
    "utf-8"
  );

  interface Frontmatter {
    title: string;
  }

  const data = await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
  });

  return (
    <div className="mt-10">
      {/* <h1>{ data.frontmatter.title }</h1> */}
      {data.content}
    </div>
  );
}
