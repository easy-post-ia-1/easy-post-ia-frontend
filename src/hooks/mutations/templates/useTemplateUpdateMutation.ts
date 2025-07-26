import { useMutation, useQueryClient } from '@tanstack/react-query';
import { templateService } from '@services/template.service';
import useAlertNotification from '../../shared/useAlertNotification';
import type { Template } from '@models/template.model';

export const useTemplateUpdateMutation = () => {
  const queryClient = useQueryClient();
  const enqueueAlertNotification = useAlertNotification();

  return useMutation({
    mutationFn: async ({ id, ...templateData }: Partial<Template> & { id: number }) => {
      // Only send the basic fields that backend expects
      const { title, description, tags, category, emoji } = templateData as any;
      const backendData = {
        title,
        description,
        tags,
        category,
        emoji
      };
      
      const response = await templateService.updateTemplate({ id, data: backendData }).call;
      return response.data;
    },
    onSuccess: () => {
      enqueueAlertNotification('Template updated successfully!', 'success');
      // Invalidate all templates queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
    onError: () => {
      enqueueAlertNotification('Failed to update template', 'error');
    },
  });
}; 