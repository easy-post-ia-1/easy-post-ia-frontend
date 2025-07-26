import { useMutation, useQueryClient } from '@tanstack/react-query';
import useHandleAlertNotification from '@hooks/shared/useAlertNotification';
import { postsService } from '@services/posts.service';
import { ErrorSignUp } from '@models/error.model';
import { PostShowEndpoint } from '@models/post.model';

export const usePostCreate = () => {
  const enqueuAlertNotification = useHandleAlertNotification();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPost: PostShowEndpoint) => {
      return postsService.create({ data: newPost }).call;
    },
    onSuccess: ({ data }) => {
      if (data?.status?.code >= 400) {
        enqueuAlertNotification(`${data.status.message}`, 'error');
        return;
      }
      enqueuAlertNotification(data.status.message, 'success');
      // Invalidate all posts queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['employerDashboardMetrics'] });
    },
    onError: (error: ErrorSignUp) => {
      enqueuAlertNotification(`${error?.['response']?.data?.status?.message}`, 'error');
    },
  });
};

export const usePostUpdate = () => {
  const enqueuAlertNotification = useHandleAlertNotification();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedPost: PostShowEndpoint) => {
      // Extract id from the post data and pass it separately
      const { id, ...postData } = updatedPost;
      return postsService.update({ id: id!, data: postData }).call;
    },
    onSuccess: ({ data }) => {
      if (data?.status?.code >= 400) {
        enqueuAlertNotification(`${data.status.message}`, 'error');
        return;
      }
      enqueuAlertNotification(data.status.message, 'success');
      // Invalidate all posts queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['employerDashboardMetrics'] });
      queryClient.invalidateQueries({ queryKey: ['strategies'] });
    },
    onError: (error: ErrorSignUp) => {
      enqueuAlertNotification(`${error?.['response']?.data?.status?.message}`, 'error');
    },
  });
};

export const usePostDestroy = () => {
  const enqueuAlertNotification = useHandleAlertNotification();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | undefined) => {
      return postsService.destroy({ id: id! }).call;
    },
    onSuccess: ({ data }) => {
      if (data?.status?.code >= 400) {
        enqueuAlertNotification(`${data.status.message}`, 'error');
        return;
      }
      enqueuAlertNotification(data.status.message, 'success');
      // Invalidate all posts queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['employerDashboardMetrics'] });
      queryClient.invalidateQueries({ queryKey: ['strategies'] });
    },
    onError: (error: ErrorSignUp) => {
      enqueuAlertNotification(`${error?.['response']?.data?.status?.message}`, 'error');
    },
  });
};
