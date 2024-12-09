import { z } from '@i18n-zod/i18n-zod-setup.ts';
import { DateTime } from 'luxon';

const dateTimeSchema = z.any().refine((value) => DateTime.isDateTime(value) && value.isValid, {
  message: 'Invalid date. Must be a valid DateTime object.',
});

export const postSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }).max(100, { message: 'Maximum 100 characters.' }),
  description: z
    .string()
    .min(10, { message: 'Content must be at least 10 characters long.' })
    .max(5000, { message: 'Maximum 5000 characters.' }),
  imageUrl: z.string().optional(),
  tags: z
    .string()
    .regex(/^([^,]+)(,[^,]+)*$/, { message: 'Tags must be separated by commas and cannot be empty.' })
    .optional(),
  programmingDateToPost: z.union([z.string().datetime(), dateTimeSchema]),
});
