import { DateTime } from 'luxon';
import { z } from 'zod';

export const marketingStrategy = z
  .object({
    description: z.string().min(5, 'Description must be at least 5 characters long'),
    fromSchedule: z.string().refine((date) => DateTime.fromISO(date).isValid, 'Invalid start date'),
    toSchedule: z.string().refine((date) => DateTime.fromISO(date).isValid, 'Invalid end date'),
  })
  .refine(
    ({ fromSchedule, toSchedule }) => DateTime.fromISO(fromSchedule) <= DateTime.fromISO(toSchedule),
    'End date must be after start date'
  );

export type marketingStrategyType = z.infer<typeof marketingStrategy>;
