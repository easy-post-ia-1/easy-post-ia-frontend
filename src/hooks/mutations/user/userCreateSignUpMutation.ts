import { useMutation } from '@tanstack/react-query';
import { userService } from '@services/user.service';
import { UserSignUp } from '@models/user.model';
import useHandleAlertNotification from '@hooks/shared/useAlertNotification';
import { useUserStore } from '@stores/userStore';
import { createUserAdapter } from '@adapters/user.adapter';
import { ParamsAxios } from '@models/api.model';
import { ErrorSignUp } from '@models/error.model';
import { useAuthStore } from '@stores/useAuthStore';

export interface LoginInfo {
  email: string;
  password: string;
}

export const userCreateSignUpMutation = () => {
  const enqueuAlertNotification = useHandleAlertNotification();
  const { login } = useUserStore();
  const { updateToken } = useAuthStore();

  return useMutation({
    mutationFn: (newUser: UserSignUp) => {
      delete newUser?.confirmPasswd;
      const data: ParamsAxios = { data: { user: newUser } };
      return userService.postSignUp(data).call;
    },
    onSuccess: ({ data, headers }) => {
      if (data?.errors?.length > 0) {
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
