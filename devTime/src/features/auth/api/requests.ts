import { axiosInstance } from '@/shared/api/axiosInstance';

export const requestLogin = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post(`/api/auth/login`, data);

  return response.data;
};

export const requestLogout = async () => {
  const response = await axiosInstance.post(`/api/auth/logout`);

  return response.data;
};

export const requestProfileData = async () => {
  const response = await axiosInstance.get(`/api/profile`);

  return response.data;
};
