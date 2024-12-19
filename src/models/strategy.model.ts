import { DateTime } from 'luxon';

export interface StrategyValues {
  description: string;
  fromSchedule: DateTime;
  toSchedule: DateTime;
}

export interface StrategyEndpoint {
  description: string;
  from_schedule: string | null;
  to_schedule: string | null;
}
