import axios, { AxiosInstance } from 'axios';
const VITE_API_URL: string | undefined = import.meta.env.VITE_API_URL;

export const apiClient = (): AxiosInstance => {
  if (!VITE_API_URL) throw new Error('Define API_URL');

  return axios.create({
    baseURL: `${VITE_API_URL}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};
