import { StrategyEndpoint, StrategyValues, FetchedStrategy, Strategy } from '@models/strategy.model';
import { STRATEGY_CARD_COLORS } from '@utils/constants/home.constants';

export const uploadStrategyAdapter = (strategy: StrategyValues): StrategyEndpoint => ({
  description: strategy.description,
  from_schedule: strategy.fromSchedule,
  to_schedule: strategy.toSchedule,
});

// Assuming the API returns a list of strategies without a color property
// We'll add a color property here for the UI
const colorCycle = [
  STRATEGY_CARD_COLORS.BLUE,
  STRATEGY_CARD_COLORS.GREEN,
  STRATEGY_CARD_COLORS.RED,
  STRATEGY_CARD_COLORS.PURPLE,
  STRATEGY_CARD_COLORS.ORANGE,
];

export const fetchedStrategiesAdapter = (
  response: FetchedStrategy[],
  page: number,
  limit: number
): { strategies: Strategy[]; total: number; page: number; limit: number } => {
  const strategies = response.map((strategy) => ({
    ...strategy,
    id: String(strategy.id),
  }));

  return {
    strategies,
    total: response.length,
    page,
    limit,
  };
};
