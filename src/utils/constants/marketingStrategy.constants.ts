import { StrategyValues } from '@models/strategy.model';
import { DateTime } from 'luxon';

export const initialValuesStrategy: StrategyValues = {
  description: '',
  fromSchedule: DateTime.now(),
  toSchedule: DateTime.now().plus({ weeks: 1 }),
};
