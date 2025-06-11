import { useQuery } from '@tanstack/react-query';
import { strategyService } from '../../../services/strategy.service';
import { StrategiesResponse } from '../../../models/strategy.model';

interface UseStrategiesParams {
  page?: number;
  perPage?: number;
}

export const useStrategies = ({ page = 1, perPage = 5 }: UseStrategiesParams = {}) => {
  return useQuery<StrategiesResponse>({
    queryKey: ['strategies', page, perPage],
    queryFn: () => strategyService.getStrategies({ page, perPage }),
  });
}; 