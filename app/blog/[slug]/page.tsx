import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { BlockContent } from '@/components/ui/block-content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || `Read more about ${post.title}`,
  };
}

async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    mainImage,
    categories[]->{title},
    publishedAt,
    excerpt,
    body,
    author->{
      name,
      image,
      bio
    }
  }`,
    { slug }
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    return notFound();
  }

  const readingTime = Math.max(1, Math.ceil(post.body?.length / 1000)) || 3;

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm">
              <a href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </a>
            </Button>
          </div>

          <article>
            <div className="mb-8">
              <div className="flex flex-wrap gap-3 mb-4">
                {post.categories?.map((category: any) => (
                  <Badge key={category.title} variant="secondary">
                    {category.title}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold tracking-tight mb-6">
                {post.title}
              </h1>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Avatar>
                    {post.author?.image ? (
                      <AvatarImage
                        src={urlForImage(post.author.image)
                          .width(60)
                          .height(60)
                          .url()}
                        alt={post.author.name}
                      />
                    ) : null}
                    <AvatarFallback>
                      {post.author?.name?.[0] || 'A'}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium">
                      {post.author?.name || 'Anonymous'}
                    </p>

                    <div className="flex items-center text-sm text-muted-foreground gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <time dateTime={post.publishedAt}>
                          {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
                        </time>
                      </div>

                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
              </div>
            </div>

            {post.mainImage && (
              <div className="relative rounded-lg overflow-hidden h-[300px] md:h-[400px] lg:h-[500px] mb-10">
                <Image
                  src={urlForImage(post.mainImage)
                    .width(1200)
                    .height(800)
                    .url()}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                  className="object-cover object-center"
                />
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <BlockContent value={post.body} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
