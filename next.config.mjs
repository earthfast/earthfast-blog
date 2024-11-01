import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
  // Cloudflare Pages specific configuration
  output: "standalone",
  images: {
    unoptimized: true,
    // Si necesitas cargar imágenes de dominios externos, añádelos aquí:
    // domains: ['ejemplo.com'],
  },
  // Añadimos la configuración de webpack
  webpack: (config) => {
    // Asegúrate de que webpack maneje correctamente los archivos de contenido
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};

const withMDX = createMDX({
  options: {
    parseFrontmatter: true,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
