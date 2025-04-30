import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { BlockContent } from '@/components/ui/block-content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Projects`,
    description:
      project.excerpt ||
      `Detailed information about the ${project.title} project.`,
  };
}

async function getProject(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    mainImage,
    categories[]->{title},
    description,
    publishedAt,
    technologies,
    projectUrl,
    repoUrl
  }`,
    { slug }
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm">
              <a href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
              </a>
            </Button>
          </div>

          <div className="relative rounded-lg overflow-hidden h-[300px] md:h-[400px] lg:h-[500px] mb-8">
            {project.mainImage ? (
              <Image
                src={urlForImage(project.mainImage)
                  .width(1200)
                  .height(800)
                  .url()}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
                className="object-cover object-center"
              />
            ) : (
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <span className="text-2xl font-bold text-muted-foreground">
                  No Image Available
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-3 mb-6">
                {project.categories?.map((category: any) => (
                  <Badge key={category.title} variant="secondary">
                    {category.title}
                  </Badge>
                ))}
              </div>

              {project.publishedAt && (
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    Completed on{' '}
                    {format(new Date(project.publishedAt), 'MMMM dd, yyyy')}
                  </span>
                </div>
              )}
            </div>

            {project.description && (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <BlockContent value={project.description} />
              </div>
            )}

            {project.technologies?.length > 0 && (
              <div className="bg-muted p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              {project.projectUrl && (
                <Button asChild>
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> View Live Project
                  </a>
                </Button>
              )}

              {project.repoUrl && (
                <Button asChild variant="outline">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" /> View Source Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
