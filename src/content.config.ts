import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    category: z.enum(['Journey', 'Ideas', 'Photography', 'Introduction']).default('Journey'),
    location: z.string().optional(),
    heroImage: image().optional(),
    heroAlt: z.string().optional(),
    photos: z.array(z.object({
      src: image(),
      alt: z.string().trim().min(1),
      caption: z.string().optional(),
      date: z.coerce.date().optional(),
      location: z.string().optional(),
    })).default([]),
  }).refine((data) => !data.heroImage || Boolean(data.heroAlt?.trim()), {
    message: 'Aggiungi un testo descrittivo in heroAlt quando usi heroImage.',
    path: ['heroAlt'],
  }),
});

export const collections = { blog };
