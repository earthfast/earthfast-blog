import { compileMDX } from "next-mdx-remote/rsc";
import { Frontmatter } from "@/types";
import remarkGfm from "remark-gfm";
import { posts } from "@/config/posts";

export async function getPost(slug: string) {
  try {
    const mdxFile = await import(`!!raw-loader!@/content/${slug}.mdx`);

    const { frontmatter, content } = await compileMDX<Frontmatter>({
      source: mdxFile.default,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    });

    return {
      frontmatter,
      content,
    };

  } catch (error) {
    console.log("Error loading post:", error);
    return {
      frontmatter: {
        title: "Post Not Found",
        description: "",
        imageUrl: "",
        date: "",
        readingTime: '',
      },
      content: "",
    };
  }
}

export async function getAllPosts() {
  const postsData = await Promise.all(
    posts.map(async (slug) => {
      try {
        const { frontmatter } = await getPost(slug);

        return {
          ...frontmatter,
          slug,
        };
      } catch (e) {
        console.error(`Error loading post ${slug}:`, e);
        return null;
      }
    })
  );

  return postsData.filter((post) => post !== null);
}
