'use client';

import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-80 my-6 overflow-hidden rounded-lg">
          <Image
            src={urlForImage(value).url()}
            alt={value.alt || 'Blog image'}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
          {value.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
    code: ({ value }: any) => (
      <pre className="bg-muted p-4 rounded-md overflow-x-auto my-4">
        <code className="text-sm font-mono">{value.code}</code>
        {value.filename && <p className="text-xs text-muted-foreground mt-2">{value.filename}</p>}
      </pre>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mt-6 mb-2">{children}</h4>,
    normal: ({ children }: any) => <p className="my-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};

export function BlockContent({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}