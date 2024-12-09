import useHandleAlertNotification from '@hooks/shared/useAlertNotification';
import { postsService } from '@services/posts.service';
import { useQuery } from '@tanstack/react-query';

export const usePosts = () => {
  const enqueueAlertNotification = useHandleAlertNotification();

  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const { data } = await postsService.index().call;
        return data;
      } catch (error) {
        enqueueAlertNotification('Failed to fetch posts', 'error');
        throw error;
      }
    },
  });
};

export const usePostShow = (id: number | undefined) => {
  const enqueueAlertNotification = useHandleAlertNotification();

  return useQuery({
    queryKey: ['post', id], // Unique key for this query
    queryFn: async () => {
      try {
        const { data } = await postsService.show({ data: { id } }).call;
        return data;
      } catch (error) {
        enqueueAlertNotification('Failed to fetch post', 'error');
        throw error;
      }
    },
    staleTime: 0,
    enabled: id !== -1,
  });
};
