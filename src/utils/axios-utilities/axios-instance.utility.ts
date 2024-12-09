import { useAuthStore } from '@stores/useAuthStore';
import axios, { AxiosInstance } from 'axios';
const VITE_API_URL: string | undefined = import.meta.env.VITE_API_URL;

export const apiClient = (): AxiosInstance => {
  if (!VITE_API_URL) throw new Error('Define API_URL');

  const api = axios.create({
    baseURL: `${VITE_API_URL}`,
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
