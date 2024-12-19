import useHandleAlertNotification from '@hooks/shared/useAlertNotification';
import { userService } from '@services/user.service';
import { useQuery } from '@tanstack/react-query';

export const useGetAccount = () => {
  const enqueueAlertNotification = useHandleAlertNotification();

  return useQuery({
    queryKey: ['user'], // Unique key for this query
    queryFn: async () => {
      try {
        const { data } = await userService.getUser().call;
        return data;
      } catch (error) {
        enqueueAlertNotification('Failed to fetch account details', 'error');
        throw error;
      }
    },
    staleTime: 0,
  });
};
