export interface StrategyValues {
  description: string;
  fromSchedule: string;
  toSchedule: string;
}

export interface StrategyEndpoint {
  description: string;
  from_schedule: string | null;
  to_schedule: string | null;
}
