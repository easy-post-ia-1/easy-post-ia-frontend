import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { strategyService } from '@services/strategy.service';
import { Strategy } from '@models/strategy.model';
import { STRATEGY_QUERY_KEYS } from '@utils/constants/strategy.constants';
import { Error } from '@models/error.model';
import { fetchedStrategiesAdapter } from '@adapters/strategy.adapter';

interface UseStrategiesOptions {
  page?: number;
  limit?: number;
}

export const useStrategies = ({ page = 1, limit = 10 }: UseStrategiesOptions = {}): UseQueryResult<{
  strategies: Strategy[];
  total: number;
  page: number;
  limit: number;
}, Error> => {
  return useQuery({
    queryKey: [STRATEGY_QUERY_KEYS.STRATEGIES, page, limit],
    queryFn: async () => {
      const response = await strategyService.getStrategies({
        params: { page, page_size: limit }
      }).call;
      
      return fetchedStrategiesAdapter(
        response.data.strategies,
        response.data.pagination.page,
        response.data.pagination.per_page
      );
    },
  });
}; 