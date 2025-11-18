import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken() {
  if (!refreshPromise) {
    const refreshToken = useAuthStore.getState().refreshToken;
    //중복된 요청 일시 기존 refreshPromise 리턴
    refreshPromise = axiosInstance
      .post('/api/auth/refresh', refreshToken)
      .then((res) => {
        const token = res.data.accessToken;
        useAuthStore.getState().setAccessToken(token);
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        return axiosInstance(originalRequest);
      } catch {
        await axiosInstance.post('/api/auth/logout');
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
