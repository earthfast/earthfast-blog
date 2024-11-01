export const runtime = "edge";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Frontmatter } from "@/types";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { frontmatter } = await getMdxComponent(params.slug);

    return {
      title: frontmatter.title,
      description: frontmatter.description,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        images: frontmatter.imageUrl ? [frontmatter.imageUrl] : [],
      },
    };
  } catch (e) {
    console.log("error", e);
    return {
      title: "Post Not Found",
      description: "The post you're looking for does not exist",
    };
  }
}

// export function generateStaticParams() {
//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }

const getMdxComponent = async (slug: string) => {
  try {
    // Usar variables de entorno de Cloudflare Pages
    const baseUrl =
      process.env.CF_PAGES_URL ||
      process.env.NEXT_PUBLIC_URL ||
      "https://localhost:3000";

    console.log('Fetching MDX from:', `${baseUrl}/content/${slug}.mdx`);

    const rawMDX = await fetch(`${baseUrl}/content/${slug}.mdx`).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch MDX file: ${res.status} ${res.statusText}`);
      }
      return res.text();
    });

    const { frontmatter, content: body } = await compileMDX<Frontmatter>({
      source: rawMDX,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    });

    return {
      frontmatter,
      body,
    };
  } catch (e) {
    console.error("Error loading MDX file:", e);
    notFound();
  }
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { body, frontmatter } = await getMdxComponent(params.slug);

  return (
    <div className="mt-10 max-w-[1000px] mx-auto px-5 xl:px-0">
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-white bg-black/10 border border-white/20 rounded-full hover:bg-black/20 transition-colors mb-3"
      >
        ← Back
      </Link>

      <div className="mt-4">
        {frontmatter.date && (
          <p className="text-gray-500 text-md mb-2">
            {format(parseISO(frontmatter.date), "MMMM d, yyyy")} • {"5 mins"}
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
        <div className="prose prose-invert max-w-[800px]">{body}</div>
      </div>
    </div>
  );
}
