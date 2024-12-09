import { createUserAdapter } from '@adapters/user.adapter';
import useHandleAlertNotification from '@hooks/shared/useAlertNotification';
import { LoginInfo } from '@models/user.model';
import { ErrorSignUp } from '@models/error.model';
import { userService } from '@services/user.service';
import { useUserStore } from '@stores/userStore';
import { Data, ParamsAxios } from '@models/api.model';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@stores/useAuthStore';

export const userCreateSessionMutation = () => {
  const enqueuAlertNotification = useHandleAlertNotification();
  const { login } = useUserStore();
  const { updateToken } = useAuthStore();

  return useMutation({
    mutationFn: (userLogin: LoginInfo) => {
      const data: ParamsAxios = { data: { ...userLogin } as Data };
      return userService.postLogin(data).call;
    },
    onSuccess: ({ data, headers }) => {
      if (data?.error?.length > 0) {
        enqueuAlertNotification(`${data.status.message}`, 'error');
        return;
      }
      const bearerToken = headers?.authorization?.split('Bearer ')[1];
      enqueuAlertNotification(data.status.message, 'success');
      login(createUserAdapter({ ...data.user, isAuthenticated: true }));
      updateToken(bearerToken);
    },
    onError: (error: ErrorSignUp) => {
      enqueuAlertNotification(`${error?.['response']?.data?.status?.message}`, 'error');
    },
  });
};
