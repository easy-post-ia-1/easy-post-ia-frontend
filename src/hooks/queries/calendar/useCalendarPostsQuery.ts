import { useQuery } from '@tanstack/react-query';
import { postsService } from '@services/posts.service';
import { STRATEGY_QUERY_KEYS } from '@utils/constants/strategy.constants';

interface UseCalendarPostsParams {
  from_date: string;
  to_date: string;
  page?: number;
  perPage?: number;
}

export const useCalendarPostsQuery = ({ from_date, to_date, page, perPage }: UseCalendarPostsParams) => {
  return useQuery({
    queryKey: [STRATEGY_QUERY_KEYS.STRATEGIES, 'calendar', from_date, to_date, page, perPage],
    queryFn: async () => {
      const response = await postsService.getCalendarPosts({ 
        params: { from_date, to_date, page, page_size: perPage } 
      }).call;
      return response.data;
    },
    enabled: !!from_date && !!to_date, // Only fetch if both dates are provided
  });
}; 