import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { BOARD_ROLES } from '@/lib/board';
import { LOCAL_DATETIME_PATTERN } from '@/lib/datetime';

/*
 * Schemas for everything editable in Pages CMS (see `.pages.yml`).
 * If an edit doesn't match, the build fails with a clear message and the live site
 * stays on the last good version.
 */

/** Pages CMS saves cleared fields as "" or null; treat those as "not set". */
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((value) => (value === '' || value === null ? undefined : value), schema.optional());

const localDateTime = z
  .string()
  .regex(LOCAL_DATETIME_PATTERN, 'Use the format YYYY-MM-DDTHH:mm, e.g. 2026-10-02T18:30');

const settings = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/settings' }),
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    description: z.string(),
    email: z.email(),
    instagram: z.url(),
    mailingList: optional(z.url()),
    contactForm: optional(z.url()),
    address: z.array(z.string()).min(1),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Shown in search results and link previews. */
      description: z.string(),
      photos: z
        .array(z.object({ image: image(), alt: z.string(), caption: optional(z.string()) }))
        .default([]),
      // Home page
      heroImage: optional(image()),
      heroImageAlt: optional(z.string()),
      highlights: z
        .array(z.object({ title: z.string(), text: z.string(), link: optional(z.string()) }))
        .default([]),
      // Fellowship page
      recipients: z
        .array(
          z.object({
            year: z.number().int(),
            fellows: z.array(z.object({ name: z.string(), placement: optional(z.string()) })),
          }),
        )
        .default([]),
      // Origins page
      sponsorsHeading: optional(z.string()),
      sponsorTiers: z
        .array(z.object({ tier: z.string(), sponsors: z.array(z.string()) }))
        .default([]),
    }),
});

const board = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/board' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.enum(BOARD_ROLES),
      photo: optional(image()),
      bio: z.string(),
    }),
});

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events' }),
  schema: z
    .object({
      title: z.string(),
      start: localDateTime,
      end: optional(localDateTime),
      location: optional(z.string()),
    })
    .refine((e) => !e.end || e.end >= e.start, {
      message: 'The end time must be after the start time',
      path: ['end'],
    }),
});

export const collections = { settings, pages, board, events };
