import { DateTime } from 'luxon';
import { z } from 'zod';

export const marketingStrategy = z.object({
  description: z.string().min(5, 'Description must be at least 5 characters long'),
  dateRange: z
    .object({
      startDate: z.string().refine((date) => DateTime.fromISO(date).isValid, 'Invalid start date'),
      endDate: z.string().refine((date) => DateTime.fromISO(date).isValid, 'Invalid end date'),
    })
    .refine(
      ({ startDate, endDate }) => DateTime.fromISO(startDate) <= DateTime.fromISO(endDate),
      'End date must be after start date'
    ),
});

export type marketingStrategyType = z.infer<typeof marketingStrategy>;
