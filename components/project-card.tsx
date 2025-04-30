'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Github, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { urlForImage } from '@/sanity/lib/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProjectProps {
  title: string;
  slug: string;
  mainImage: any;
  categories: { title: string }[];
  publishedAt: string;
  technologies: string[];
  projectUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export function ProjectCard({
  title,
  slug,
  mainImage,
  categories,
  publishedAt,
  technologies,
  projectUrl,
  repoUrl,
  featured,
}: ProjectProps) {
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
        <div className="space-y-1 mb-2">
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

          <a href={`/projects/${slug}`} className="block">
            <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
          </a>

          {publishedAt && (
            <div className="flex items-center text-xs text-muted-foreground mb-4">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{format(new Date(publishedAt), 'MMM dd, yyyy')}</span>
            </div>
          )}
        </div>

        {technologies?.length > 0 && (
          <div className="mt-auto">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-muted rounded px-1.5 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mt-4">
          <Button asChild size="sm" variant="default">
            <a href={`/projects/${slug}`}>View Details</a>
          </Button>

          <div className="flex items-center gap-2">
            {repoUrl && (
              <Button asChild size="icon" variant="outline">
                <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub Repository</span>
                </a>
              </Button>
            )}

            {projectUrl && (
              <Button asChild size="icon" variant="outline">
                <a href={projectUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Live Project</span>
                </a>
              </Button>
            )}
          </div>
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
