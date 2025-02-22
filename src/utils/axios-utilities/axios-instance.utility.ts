import { useAuthStore } from '@stores/useAuthStore';
import { configEnv } from '@utils/environment/config_variables';
import axios, { AxiosInstance } from 'axios';

export const apiClient = (): AxiosInstance => {
  if (!configEnv.VITE_API_URL) throw new Error('Define API_URL');

  const api = axios.create({
    baseURL: `${configEnv.VITE_API_URL}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  api.interceptors.request.use(
    (config) => {
      const { token } = useAuthStore.getState();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );

  return api;
};
