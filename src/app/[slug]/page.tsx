import { compileMDX } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import path from "path";
import { Frontmatter } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const content = await fs.readFile(
    path.join(process.cwd(), "src/posts", `${params.slug}.mdx`),
    "utf-8"
  );

  const { frontmatter, content: body } = await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });
  const readingTimeStats = readingTime(content);

  return (
    <div className="mt-10 max-w-wrapper mx-auto px-5 xl:px-0">
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-white bg-black/10 border border-white/20 rounded-full hover:bg-black/20 transition-colors mb-3"
      >
        ← Back
      </Link>

      <div className="mt-4">
        {frontmatter.date && (
          <p className="text-gray-500 text-md mb-2">
            {format(parseISO(frontmatter.date), "MMMM d, yyyy")} •{" "}
            {readingTimeStats.text}
          </p>
        )}
        <h1 className="text-4xl font-bold">{frontmatter.title}</h1>
        {frontmatter.imageUrl && (
          <div className="relative w-full max-w-4xl h-[300px] my-8">
            <Image
              src={frontmatter.imageUrl}
              alt={frontmatter.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}
        <div className="prose prose-invert prose-lg max-w-[900px]">{body}</div>
      </div>
    </div>
  );
}
