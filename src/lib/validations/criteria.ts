import * as z from 'zod';

export const criteriaSchema = z.object({
  code: z.string(),
  name: z.string(),
  weight: z.number(),
  // type: z.string(),
});

