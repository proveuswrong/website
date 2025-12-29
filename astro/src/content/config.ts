import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "content",
  schema: z.object({
    draft: z.boolean().optional(),
    toc: z.boolean().optional(),
  }),
});

export const collections = { pages };
