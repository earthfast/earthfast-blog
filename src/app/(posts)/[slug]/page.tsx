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
            {format(parseISO(frontmatter.date), "MMMM d, yyyy")} • {"5 mins"}
          </p>
        )}
        <h1 className="text-4xl font-bold">{frontmatter.title}</h1>
        {frontmatter.description && (
          <p className="text-md my-4">{frontmatter.description}</p>
        )}
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
        <div className="prose prose-invert max-w-[800px]">{content}</div>
      </div>
    </div>
  );
}
