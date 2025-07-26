import { useMutation, useQueryClient } from '@tanstack/react-query';
import { templateService } from '@services/template.service';
import useAlertNotification from '../../shared/useAlertNotification';
import type { TemplateFormValues } from '@models/template.model';

export const useTemplateCreateMutation = () => {
  const queryClient = useQueryClient();
  const enqueueAlertNotification = useAlertNotification();

  return useMutation({
    mutationFn: async (templateData: TemplateFormValues) => {
      // Only send the basic fields that backend expects
      const { title, description, tags, category, emoji } = templateData;
      const backendData = {
        title,
        description,
        tags,
        category,
        emoji,
        is_default: false,
        template_type: 'team' as const
      };
      
      const response = await templateService.createTemplate({
        data: backendData
      }).call;
      return response.data;
    },
    onSuccess: () => {
      enqueueAlertNotification('Template created successfully!', 'success');
      // Invalidate all templates queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
    onError: () => {
      enqueueAlertNotification('Failed to create template', 'error');
    },
  });
}; 