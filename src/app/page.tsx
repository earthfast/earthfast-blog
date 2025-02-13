import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import Image from "next/image";
import { format } from "date-fns";
import { getAllPosts } from "@/utils/blog";

export const metadata = {
  title: "EarthFast Blog - Learn about us",
  description:
    "Whatever you need to know about our product, ecosystem and team you can find here",
};

export default async function Main() {
  const posts = await getAllPosts();
  return (
    <main className="max-w-wrapper mx-auto px-5 xl:px-0 overflow-hidden">
      <div className="text-center mt-10 mb-12 sm:mb-20 sm:mt-28">
        <h1 className="text-2xl sm:text-5xl font-bold mb-4">
          Blog
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg max-w-3xl mx-auto">
          Updates and news about Earthfast
        </p>
      </div>
      <div className="grid gap-0">
        {posts.map(({ title, description, imageUrl, slug, date }) => (
          <article key={slug} className="group">
            <Link
              href={`/${slug}`}
              className="block py-8 sm:py-12 px-4 sm:px-6 border-b border-white/10 hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8">
                <div className="relative w-full sm:w-72 h-48 flex-shrink-0">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                  <div>
                    <div className="text-gray-400 text-sm mb-3">
                      {format(new Date(date + "T00:00:00"), "MMMM d, yyyy")}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                      {title}
                    </h2>
                    <p className="text-gray-400">{description}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-8">
                    <div className="p-3 border border-gray-700 rounded-full group-hover:bg-white group-hover:border-white transition-all duration-300">
                      <HiArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
