import { DateTime } from 'luxon';
import { z } from 'zod';
import i18n from '../../../_i18n';

export const marketingStrategy = z
  .object({
    description: z.string().min(5, i18n.t('validation.strategy.description.min')),
    fromSchedule: z.string().refine((date) => DateTime.fromISO(date).isValid, i18n.t('validation.strategy.fromSchedule.invalid')),
    toSchedule: z.string().refine((date) => DateTime.fromISO(date).isValid, i18n.t('validation.strategy.toSchedule.invalid')),
  })
  .refine(
    ({ fromSchedule, toSchedule }) => DateTime.fromISO(fromSchedule) <= DateTime.fromISO(toSchedule),
    i18n.t('validation.strategy.date.order')
  );

export type marketingStrategyType = z.infer<typeof marketingStrategy>;
