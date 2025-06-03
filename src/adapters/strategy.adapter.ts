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

export const fetchedStrategiesAdapter = (response: FetchedStrategy[], page: number, limit: number): { strategies: Strategy[]; total: number; page: number; limit: number } => {
  // This is a mock adapter. In a real scenario, the API might provide total pages or total items.
  // For now, let's assume the response itself is just the array of strategies for the current page.
  // And the total count needs to be handled or fetched separately if the API supports it.
  // For this example, let's imagine the API returns the strategies directly
  // and we're adapting them.

  const strategiesWithColor = response.map((strategy, index) => ({
    ...strategy,
    // Ensure id is a string as used in StrategyCard key
    id: String(strategy.id),
    color: colorCycle[index % colorCycle.length],
  }));

  // This is a simplified mock for pagination data.
  // In a real application, the API would provide this.
  // For now, we'll just return the adapted strategies and assume a mock total.
  // The actual total should come from an API response field like `response.meta.total`.
  const mockTotalStrategies = 20; // Mock total, replace with actual API data

  return {
    strategies: strategiesWithColor,
    total: mockTotalStrategies, // Replace with actual total from API response
    page,
    limit,
  };
};
