import { createUserAdapter } from '@adapters/user.adapter';
import useHandleAlertNotification from '@hooks/shared/useAlertNotification';
import { LoginInfo } from '@models/user.model';
import { ErrorSignUp } from '@models/error.model';
import { userService } from '@services/user.service';
import { useUserStore } from '@stores/userStore';
import { Data, ParamsAxios } from '@models/api.model';
import { useMutation } from '@tanstack/react-query';

export const userCreateSessionMutation = () => {
  const enqueAlertNotification = useHandleAlertNotification();
  const { login } = useUserStore();

  return useMutation({
    mutationFn: (userLogin: LoginInfo) => {
      const data: ParamsAxios = { data: { ...userLogin } as Data };
      return userService.postLogin(data).call;
    },
    onSuccess: ({ data }) => {
      if (data?.error?.length > 0) {
        console.log('Error1 : ', data);
        enqueAlertNotification(`${data.status.message}`, 'error');
        return;
      }
      enqueAlertNotification(data.status.message, 'success');
      login(createUserAdapter({ ...data.user, isAuthenticated: true }));
    },

    onError: (error: ErrorSignUp) => {
      console.log('Error2: ', error);
      enqueAlertNotification(`${error?.['response']?.data?.status?.message}`, 'error');
    },
  });
};
