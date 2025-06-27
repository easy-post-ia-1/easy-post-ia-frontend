import { StrategyEndpoint, StrategyValues, FetchedStrategy, Strategy } from '@models/strategy.model';

export const uploadStrategyAdapter = (strategy: StrategyValues): StrategyEndpoint => ({
  description: strategy.description,
  from_schedule: strategy.fromSchedule,
  to_schedule: strategy.toSchedule,
});

// Assuming the API returns a list of strategies without a color property
// We'll add a color property here for the UI

export const fetchedStrategiesAdapter = (
  strategies: FetchedStrategy[],
  page: number,
  limit: number
): { strategies: Strategy[]; total: number; page: number; limit: number } => {
  return {
    strategies: strategies.map((strategy) => ({
      ...strategy,
      id: Number(strategy.id),
    })),
    total: strategies.length,
    page,
    limit,
  };
};
