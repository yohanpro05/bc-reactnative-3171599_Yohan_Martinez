import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env['EXPO_PUBLIC_API_URL'] ?? 'http://192.168.1.12:3000/api/v1',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) {
      console.error('[API error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  },
);
