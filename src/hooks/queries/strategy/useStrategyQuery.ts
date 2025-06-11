import { useQuery } from '@tanstack/react-query';
import { strategyService } from '@services/strategy.service';
import { STRATEGY_QUERY_KEYS } from '@utils/constants/strategy.constants';
import { StrategyResponse } from '@models/strategy.model';

interface UseStrategyQueryProps {
  id: string;
}

export const useStrategyQuery = ({ id }: UseStrategyQueryProps) => {
  return useQuery<StrategyResponse>({
    queryKey: [STRATEGY_QUERY_KEYS.STRATEGY, id],
    queryFn: () => strategyService.getStrategy(id),
    enabled: !!id
  });
}; 