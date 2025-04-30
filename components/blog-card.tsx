'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { urlForImage } from '@/sanity/lib/image';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface BlogCardProps {
  title: string;
  slug: string;
  mainImage: any;
  categories: { title: string }[];
  publishedAt: string;
  excerpt: string;
  author: {
    name: string;
    image: any;
  };
  featured: boolean;
  readTime?: number;
}

export function BlogCard({
  title,
  slug,
  mainImage,
  categories,
  publishedAt,
  excerpt,
  author,
  featured,
  readTime = 5,
}: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-lg overflow-hidden bg-card border shadow-sm h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        {mainImage && (
          <Image
            src={urlForImage(mainImage).width(600).height(400).url()}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 sm:p-6 flex flex-col">
        <div className="space-y-1 mb-4">
          {categories?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {categories.map((category) => (
                <Badge
                  key={category.title}
                  variant="secondary"
                  className="text-xs"
                >
                  {category.title}
                </Badge>
              ))}
            </div>
          )}

          <a href={`/blog/${slug}`} className="block">
            <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
          </a>

          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <div className="flex items-center mr-4">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{format(new Date(publishedAt), 'MMM dd, yyyy')}</span>
            </div>

            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>

        {excerpt && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {author?.image ? (
                <AvatarImage
                  src={urlForImage(author.image).width(80).height(80).url()}
                  alt={author.name}
                />
              ) : null}
              <AvatarFallback>{author?.name?.[0] || 'A'}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{author?.name}</span>
          </div>

          <a
            href={`/blog/${slug}`}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Read more
          </a>
        </div>
      </div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 4 }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute bottom-0 left-0 right-0 bg-primary"
        />
      )}
    </motion.div>
  );
}
