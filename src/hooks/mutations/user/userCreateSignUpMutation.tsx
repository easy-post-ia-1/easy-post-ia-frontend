import { createUserAdapter } from '@adapters/user.adapter';
import useHandleAlertNotification from '@hooks/shared/useAlertNotification';
import { ParamsAxios } from '@models/api.model';
import { ErrorSignUp } from '@models/error.model';
import { UserSignUp } from '@models/user.model';
import { userService } from '@services/user.service';
import { useUserStore } from '@stores/userStore';
import { useMutation } from '@tanstack/react-query';

export const userCreateSignUpMutation = () => {
  const enqueAlertNotification = useHandleAlertNotification();
  const { login } = useUserStore();

  return useMutation({
    mutationFn: (userData: UserSignUp) => {
      const data: ParamsAxios = { data: userData };
      return userService.postSignUp(data).call;
    },
    onSuccess: ({ data }) => {
      if (data?.errors?.length > 0) {
        enqueAlertNotification(`${data.status.message}`, 'error');
        return;
      }
      enqueAlertNotification(data.status.message, 'success');
      login(createUserAdapter({ ...data.user, isAuthenticated: true }));
    },
    onError: (error: ErrorSignUp) => {
      enqueAlertNotification(`${error?.['response']?.data?.status?.message}`, 'error');
    },
  });
};
