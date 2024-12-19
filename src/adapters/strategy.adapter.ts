import { StrategyEndpoint, StrategyValues } from '@models/strategy.model';

export const uploadStrategyAdapter = (strategy: StrategyValues): StrategyEndpoint => ({
  description: strategy.description,
  from_schedule: strategy.fromSchedule.toISO(),
  to_schedule: strategy.toSchedule.toISO(),
});
