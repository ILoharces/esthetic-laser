import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: ['*.md', '!README.md'], base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    cover: z.string(),
    coverAlt: z.string(),
    tags: z.array(z.string()).default([]),
    service: z.enum(['depilacion', 'presoterapia', 'hydroface', 'general']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
