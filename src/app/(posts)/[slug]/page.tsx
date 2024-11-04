import { notFound } from 'next/navigation'
import posts from '../metadata'
import Link from 'next/link'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { compileMDX } from 'next-mdx-remote/rsc'
import { Frontmatter } from '@/types'
import remarkGfm from 'remark-gfm'
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_URL || "https://earthfast-blog.pages.dev/post-1";

  return {
    title: `EarthFast - ${post.title}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.imageUrl ? [`${baseUrl}${post.imageUrl}`] : [],
    },
  }
}

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
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
  const post = posts.find((post) => post.slug === params.slug);
  if (!post) notFound();

  const { frontmatter, body } = await getMdxComponent(params.slug)

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
