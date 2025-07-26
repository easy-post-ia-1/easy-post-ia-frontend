import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@services/user.service';
import useHandleAlertNotification from '@hooks/shared/useAlertNotification';

interface UpdateProfileParams {
  did_tutorial: boolean;
}

export const userUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const enqueueAlertNotification = useHandleAlertNotification();

  return useMutation({
    mutationFn: async (data: UpdateProfileParams) => {
      const response = await userService.updateUser({ data: data }).call;
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      enqueueAlertNotification(data.message || 'Profile updated successfully', 'success');
    },
    onError: (error: any) => {
      enqueueAlertNotification(error.message || 'Failed to update profile', 'error');
    },
  });
}; 