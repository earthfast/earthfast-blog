# EarthFast Blog

This is the repository for the EarthFast Blog, built with Next.js and MDX.

## Getting Started

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog in your browser.

## Creating a New Post

1. **Add a New MDX File**: Create a new `.mdx` file in the `src/content` directory. Use the following frontmatter template:

   ```mdx
   ---
   title: 'Your Post Title'
   description: 'A brief description of your post.'
   imageUrl: '/path-to-image.jpg'
   date: "YYYY-MM-DD"
   ---

   Your post content goes here.
   ```

2. **Generate Post List**: Run the following command to update the list of posts:

   ```bash
   npm run posts
   # or
   yarn posts
   ```

   This will update `src/config/posts.ts` with the new post.

## Updating a Post

1. **Edit the MDX File**: Make changes directly in the `.mdx` file located in `src/content`.

2. **Regenerate Post List**: After editing, run the post generation command to ensure the changes are reflected:

   ```bash
   npm run posts
   # or
   yarn posts
   ```

## Deployment

To build and deploy the blog:

```bash
npm run build
npm run start
```

This will compile the application for production and start the server.

## Key Technologies

- **Next.js**: Framework for server-side rendering and static site generation.
- **MDX**: Allows writing JSX in Markdown for rich content.
- **Tailwind CSS**: Utility-first CSS framework for styling.

For more detailed information, refer to the source code and comments within the project.
