import { apiClient } from '@utils/axios-utilities';

const API_VERSION = 'v1';
const DASHBOARD_SERVICE = 'dashboard';

export interface EmployerMetrics {
  totalStrategies: number;
  totalPosts: number;
  publishedPosts: number;
  failedPosts: number;
  pendingPosts: number;
  postsPerStrategy: Array<{ strategy: string; count: number }>;
}

interface DashboardResponse {
  status: {
    code: number;
    message: string;
  };
  totalStrategies: number;
  totalPosts: number;
  publishedPosts: number;
  failedPosts: number;
  pendingPosts: number;
  postsPerStrategy: Array<{ strategy: string; count: number }>;
}

class DashboardService {
  async getEmployerDashboardMetrics(): Promise<DashboardResponse> {
    const response = await apiClient().get<DashboardResponse>(`/${API_VERSION}/${DASHBOARD_SERVICE}/employer_metrics`);
    return response.data;
  }
}

export const dashboardService = new DashboardService(); 