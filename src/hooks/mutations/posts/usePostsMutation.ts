import { useMutation } from '@tanstack/react-query';
import useHandleAlertNotification from '@hooks/shared/useAlertNotification';
import { postsService } from '@services/posts.service';
import { ErrorSignUp } from '@models/error.model';
import { PostShowEndpoint } from '@models/post.model';
import { Data } from '@models/api.model';

export const usePostCreate = () => {
  const enqueuAlertNotification = useHandleAlertNotification();

  return useMutation({
    mutationFn: (newPost: PostShowEndpoint) => {
      return postsService.create({ data: newPost as unknown as Data }).call;
    },
    onSuccess: ({ data }) => {
      if (data?.error?.length > 0) {
        enqueuAlertNotification(`${data.status.message}`, 'error');
        return;
      }
      enqueuAlertNotification(data.status.message, 'success');
      // add post in zustand
    },
    onError: (error: ErrorSignUp) => {
      enqueuAlertNotification(`${error?.['response']?.data?.status?.message}`, 'error');
    },
  });
};

export const usePostUpdate = () => {
  const enqueuAlertNotification = useHandleAlertNotification();

  return useMutation({
    mutationFn: (updatedPost: PostShowEndpoint) => {
      return postsService.update({ data: updatedPost as unknown as Data }).call;
    },
    onSuccess: ({ data }) => {
      if (data?.error?.length > 0) {
        enqueuAlertNotification(`${data.status.message}`, 'error');
        return;
      }
      enqueuAlertNotification(data.status.message, 'success');
      // Update post in zustand
    },
    onError: (error: ErrorSignUp) => {
      enqueuAlertNotification(`${error?.['response']?.data?.status?.message}`, 'error');
    },
  });
};

export const usePostDestroy = () => {
  const enqueuAlertNotification = useHandleAlertNotification();

  return useMutation({
    mutationFn: (id: number | undefined) => {
      return postsService.destroy({ data: { id } }).call;
    },
    onSuccess: ({ data }) => {
      if (data?.error?.length > 0) {
        enqueuAlertNotification(`${data.status.message}`, 'error');
        return;
      }
      enqueuAlertNotification(data.status.message, 'success');
      // destroy post in zustand
    },
    onError: (error: ErrorSignUp) => {
      enqueuAlertNotification(`${error?.['response']?.data?.status?.message}`, 'error');
    },
  });
};
