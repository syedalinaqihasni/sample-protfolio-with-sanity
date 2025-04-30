import { client } from '@/sanity/lib/client';
import { ExperienceCard } from '@/components/experience-card';
import { EducationCard } from '@/components/education-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata = {
  title: 'Experience | Portfolio & Blog',
  description: 'My professional experience and educational background.',
};

async function getExperienceData() {
  const experience = await client.fetch(`*[_type == "experience"] | order(startDate desc) {
    _id,
    title,
    company,
    location,
    startDate,
    endDate,
    current,
    description
  }`);

  const education = await client.fetch(`*[_type == "education"] | order(startDate desc) {
    _id,
    institution,
    degree,
    fieldOfStudy,
    startDate,
    endDate,
    current,
    description
  }`);

  return { experience, education };
}

export default async function ExperiencePage() {
  const { experience, education } = await getExperienceData();

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Professional Journey</h1>
            <p className="text-xl text-muted-foreground">
              An overview of my professional experience and educational background.
            </p>
          </div>

          <Tabs defaultValue="experience" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList>
                <TabsTrigger value="experience">Work Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="experience" className="space-y-8">
              {experience.map((exp) => (
                <ExperienceCard key={exp._id} {...exp} />
              ))}
            </TabsContent>

            <TabsContent value="education" className="space-y-8">
              {education.map((edu) => (
                <EducationCard key={edu._id} {...edu} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}