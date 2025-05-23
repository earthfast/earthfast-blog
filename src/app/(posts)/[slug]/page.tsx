import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { posts } from '@/config/posts';
import { getPost } from '@/utils/blog';

  const baseUrl =
    process.env.NEXT_PUBLIC_URL || "https://earthfast-blog.pages.dev/post-1";

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const { frontmatter } = await getPost(slug);

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

/**
 * Generates mapping for all blog posts at build time
 * For example,
 *    if posts = ["example-1", "example-2"], this will return:
 *    [
 *      { slug: "example-1" },
 *      { slug: "example-2" }
 *    ]
 *
 * These objects are used by Next.js to create static pages at the routes:
 *  - /example-1
 *  - /example-2
 */
export async function generateStaticParams() {
  return posts.map(slug => ({ slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { frontmatter, content } = await getPost(params.slug);

  if (!frontmatter?.description) notFound();

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
            {format(parseISO(frontmatter.date), "MMMM d, yyyy")}
            {/* {format(parseISO(frontmatter.date), "MMMM d, yyyy")} • {frontmatter.readingTime} */}
          </p>
        )}
        <h1 className="text-4xl font-bold">{frontmatter.title}</h1>
        {frontmatter.description && (
          <div className="max-w-[800px] my-4">
            <p className="text-md text-gray-300 italic my-2">
              {frontmatter.description}
            </p>
          </div>
        )}
        {frontmatter.imageUrl && (
          <div className="relative w-full max-w-4xl aspect-[16/9] my-8">
            <Image
              src={frontmatter.imageUrl}
              alt={frontmatter.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}
        <div className="prose prose-invert max-w-[800px]">{content}</div>
      </div>
    </div>
  );
}
