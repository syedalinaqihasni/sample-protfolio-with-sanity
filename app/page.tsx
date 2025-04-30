import { client } from '@/sanity/lib/client';
import { HeroSection } from '@/components/hero-section';
import { SkillsSection } from '@/components/skills-section';
import { ProjectCard } from '@/components/project-card';
import { BlogCard } from '@/components/blog-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

async function getHomePageData() {
  const profileData = await client.fetch(`*[_type == "profile"][0]{
    name,
    title,
    image,
    resumeURL,
    socialLinks
  }`);

  const skills = await client.fetch(`*[_type == "skill"] | order(order asc) {
    _id,
    name,
    category,
    proficiency
  }`);

  const featuredProjects =
    await client.fetch(`*[_type == "project" && featured == true] | order(publishedAt desc)[0...3] {
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

  const latestPosts =
    await client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...3] {
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

  return {
    profileData,
    skills,
    featuredProjects,
    latestPosts,
  };
}

export default async function Home() {
  const { profileData, skills, featuredProjects, latestPosts } =
    await getHomePageData();

  return (
    <div>
      {/* Hero Section */}
      <HeroSection profileData={profileData} />

      {/* Skills Section */}
      <SkillsSection skills={skills} />

      {/* Featured Projects Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Featured Projects
              </h2>
              <p className="text-muted-foreground">
                Selected works showcasing my best technical skills and
                creativity.
              </p>
            </div>
            <Button asChild variant="outline">
              <a href="/projects">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project: any) => (
              <ProjectCard key={project._id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Latest Articles
              </h2>
              <p className="text-muted-foreground">
                Thoughts, insights, and stories from my professional journey.
              </p>
            </div>
            <Button asChild variant="outline">
              <a href="/blog">
                All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post: any) => (
              <BlogCard key={post._id} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 bg-gradient-to-br from-muted/50 via-background to-muted/50">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            {`Let's Work Together`}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {`Have a project in mind or want to discuss potential opportunities?
            I'm always open to new ideas and collaborations.`}
          </p>
          <Button asChild size="lg">
            <a href="/contact">Get in Touch</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
