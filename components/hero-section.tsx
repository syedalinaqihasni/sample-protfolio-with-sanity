'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { urlForImage } from '@/sanity/lib/image';

interface HeroProps {
  profileData: {
    name: string;
    title: string;
    image: any;
    socialLinks: { platform: string; url: string }[];
    resumeURL?: string;
  };
}

export function HeroSection({ profileData }: HeroProps) {
  const { name, title, image, socialLinks, resumeURL } = profileData;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col space-y-6"
          >
            <motion.div variants={item}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                {`Hello, I'm`} <span className="text-primary">{name}</span>
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground">
                {title}
              </p>
            </motion.div>

            <motion.div variants={item}>
              <p className="text-lg text-muted-foreground max-w-xl">
                I create beautiful, functional websites and applications with
                focus on performance and user experience.
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a href="/contact">Get in Touch</a>
              </Button>

              {resumeURL && (
                <Button asChild variant="outline" size="lg">
                  <a href={resumeURL} target="_blank">
                    <FileText className="mr-2 h-4 w-4" /> Resume
                  </a>
                </Button>
              )}
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-4">
              {socialLinks?.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.platform === 'github' && <Github className="h-5 w-5" />}
                  {link.platform === 'linkedin' && (
                    <aedin className="h-5 w-5" />
                  )}
                  {link.platform === 'email' && <Mail className="h-5 w-5" />}
                  <span className="sr-only">{link.platform}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto md:ml-auto"
          >
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
              {image ? (
                <Image
                  src={urlForImage(image).width(800).height(800).url()}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                  className="object-cover object-center"
                />
              ) : (
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <span className="text-4xl font-bold text-muted-foreground">
                    {name[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-24 w-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-primary/10 rounded-full blur-xl" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-sm text-muted-foreground mb-2">
            Scroll Down
          </span>
          <ArrowDown className="h-5 w-5 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
