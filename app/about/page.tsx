import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { BlockContent } from '@/components/ui/block-content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DownloadIcon } from 'lucide-react';

export const metadata = {
  title: 'About Me | Portfolio & Blog',
  description:
    'Learn more about my background, skills, and professional journey.',
};

async function getAboutPageData() {
  return client.fetch(`*[_type == "profile"][0]{
    name,
    title,
    image,
    about,
    resumeURL
  }`);
}

export default async function AboutPage() {
  const profile = await getAboutPageData();

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About Me</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Get to know more about my background and professional journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <div className="aspect-square relative rounded-lg overflow-hidden mb-6 border shadow-sm">
                  {profile.image ? (
                    <Image
                      src={urlForImage(profile.image)
                        .width(500)
                        .height(500)
                        .url()}
                      alt={profile.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <span className="text-4xl font-bold text-muted-foreground">
                        {profile.name[0]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.title}</p>

                  {profile.resumeURL && (
                    <Button asChild className="w-full mt-4">
                      <a href={profile.resumeURL} target="_blank">
                        <DownloadIcon className="mr-2 h-4 w-4" /> Download
                        Resume
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 prose prose-lg dark:prose-invert max-w-none">
              <BlockContent value={profile.about} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
