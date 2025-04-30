import { client } from '@/sanity/lib/client';
import { BlogCard } from '@/components/blog-card';

export const metadata = {
  title: 'Blog | Portfolio & Blog',
  description: 'Thoughts, insights, and stories from my professional journey.',
};

async function getBlogPosts() {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    categories[]->{title},
    publishedAt,
    excerpt,
    author->{name, image},
    featured
  }`);
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Thoughts, insights, and stories from my professional journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post._id} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}