import { useQuery } from '@tanstack/react-query';
import { templateService } from '@services/template.service';
import useAlertNotification from '../../shared/useAlertNotification';
import type { Template } from '@models/template.model';

export interface TemplatesResponse {
  status: {
    code: number;
    message: string;
  };
  templates: Template[];
  pagination: {
    page: number;
    pages: number;
    count: number;
  };
}

export interface TemplatesFilters {
  page?: number;
  page_size?: number;
  title?: string;
  category?: string;
  template_type?: 'company' | 'team';
}

const removeUndefinedValues = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined && value !== '')
  );
};

export const useTemplatesQuery = (filters?: TemplatesFilters) => {
  const enqueueAlertNotification = useAlertNotification();

  return useQuery<TemplatesResponse>({
    queryKey: ['templates', filters],
    queryFn: async () => {
      try {
        const cleanFilters = filters ? removeUndefinedValues(filters) : {};
        const response = await templateService.getTemplates({ params: cleanFilters }).call;
        return response.data;
      } catch (error) {
        enqueueAlertNotification('Failed to fetch templates', 'error');
        throw error;
      }
    },
  });
}; 