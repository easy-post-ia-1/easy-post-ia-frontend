import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@services/dashboard.service';
import useAlertNotification from '../../shared/useAlertNotification';
import type { EmployerMetrics } from '@services/dashboard.service';

export const useEmployerDashboardMetrics = () => {
  const enqueueAlertNotification = useAlertNotification();

  return useQuery<EmployerMetrics>({
    queryKey: ['employerDashboardMetrics'],
    queryFn: async () => {
      try {
        const response = await dashboardService.getEmployerDashboardMetrics();
        return {
          totalStrategies: response.totalStrategies,
          totalPosts: response.totalPosts,
          publishedPosts: response.publishedPosts,
          failedPosts: response.failedPosts,
          pendingPosts: response.pendingPosts,
          postsPerStrategy: response.postsPerStrategy,
        };
      } catch (error) {
        enqueueAlertNotification('Failed to fetch dashboard metrics', 'error');
        throw error;
      }
    },
  });
}; 