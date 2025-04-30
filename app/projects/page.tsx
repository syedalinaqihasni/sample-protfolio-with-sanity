import { client } from '@/sanity/lib/client';
import { ProjectCard } from '@/components/project-card';

export const metadata = {
  title: 'Projects | Portfolio & Blog',
  description: 'Explore my portfolio of projects and technical work.',
};

async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    categories[]->{title},
    publishedAt,
    technologies,
    projectUrl,
    repoUrl,
    featured
  }`);
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Projects</h1>
            <p className="text-xl text-muted-foreground">
              A showcase of my technical work and creative projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}