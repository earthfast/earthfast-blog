import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { compileMDX } from 'next-mdx-remote/rsc'
import { Frontmatter } from '@/types'
import remarkGfm from 'remark-gfm'
import { posts } from '@/config/posts';

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const mdxFile = await import(`!!raw-loader!@/content/${slug}.mdx`);

  if (!mdxFile) {
    return {
      title: "Post Not Found",
    };
  }
  const { frontmatter } = await compileMDX<Frontmatter>({
    source: mdxFile.default,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });
  const baseUrl =
    process.env.NEXT_PUBLIC_URL || "https://earthfast-blog.pages.dev/post-1";

  return {
    title: `EarthFast - ${frontmatter.title}`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.imageUrl ? [`${baseUrl}${frontmatter.imageUrl}`] : [],
    },
  }
}
export async function generateStaticParams() {
  return posts.map(slug => ({ slug }));
}

const getMdxComponent = async (slug: string) => {
  try {
    const component2 = await import(`!!raw-loader!@/content/${slug}.mdx`);
    const { frontmatter, content: body } = await compileMDX<Frontmatter>({
      source: component2.default,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    });
    return {
      frontmatter,
      body
    }
  } catch (e) {
    console.log("error", e);
    notFound()
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { frontmatter, body } = await getMdxComponent(params.slug)

    if (!frontmatter?.title) notFound();

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
        <div className="prose prose-invert max-w-[800px]">
          {body}
        </div>
      </div>
    </div>
  );
}
