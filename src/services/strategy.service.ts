import { apiClient } from '../utils/axios-utilities';
import { StrategyEndpoint, StrategiesResponse, StrategyResponse } from '../models/strategy.model';
import { STRATEGY_SERVICE } from '@utils/constants/api.constants';

const API_VERSION = 'v1';

interface GetStrategiesParams {
  page?: number;
  perPage?: number;
}

export const strategyService = {
  getStrategies: async ({ page = 1, perPage = 5 }: GetStrategiesParams = {}): Promise<StrategiesResponse> => {
    const response = await apiClient().get(`/${API_VERSION}/${STRATEGY_SERVICE}`, {
      params: {
        page,
        per_page: perPage
      }
    });
    return response.data;
  },

  getStrategy: async (id: string): Promise<StrategyResponse> => {
    const response = await apiClient().get(`/${API_VERSION}/${STRATEGY_SERVICE}/${id}`);
    return response.data;
  },

  createStrategy: async (data: StrategyEndpoint): Promise<StrategiesResponse> => {
    const response = await apiClient().post(`/${API_VERSION}/${STRATEGY_SERVICE}/create`, data);
    return response.data;
  }
};
