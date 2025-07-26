import { useMutation, useQueryClient } from '@tanstack/react-query';
import { templateService } from '@services/template.service';
import useAlertNotification from '../../shared/useAlertNotification';

export const useTemplateDeleteMutation = () => {
  const queryClient = useQueryClient();
  const enqueueAlertNotification = useAlertNotification();

  return useMutation({
    mutationFn: async (id: number) => {
      return templateService.deleteTemplate({ id }).call;
    },
    onSuccess: () => {
      enqueueAlertNotification('Template deleted successfully!', 'success');
      // Invalidate all templates queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
    onError: () => {
      enqueueAlertNotification('Failed to delete template', 'error');
    },
  });
}; 