import { axiosInstance } from '@/shared/lib/axiosInstance';
import type { ProfileType } from '../model/types';

export const requestGetProfile = async () => {
  const response = await axiosInstance.get('/api/profile');
  console.log(response.data);

  return response.data;
};

export const requestCreateProfile = async (data: ProfileType) => {
  const response = await axiosInstance.post('/api/profile', data);
  console.log(response.data);

  return response.data;
};

export const requestGetTechStacks = async (keyword: string) => {
  const response = await axiosInstance.get('/api/tech-stacks', { params: { keyword } });
  console.log(response.data);

  return response.data;
};

export const requestCreateTechStacks = async (name: string) => {
  const response = await axiosInstance.post('/api/tech-stacks', { name });
  console.log(response.data);

  return response.data;
};

export const requestFileUpload = async ({
  fileName,
  contentType,
}: {
  fileName: string;
  contentType: string;
}) => {
  const response = await axiosInstance.post('/api/file/presigned-url', { fileName, contentType });
  console.log(response.data);

  return response.data;
};
