import { axiosInstance } from '@/shared/lib/axiosInstance';

export const requestGetTechStacks = async (keyword: string) => {
  const response = await axiosInstance.get('/api/tech-stacks', { params: { keyword } });
  console.log(response.data);

  return response.data;
};

export const requestPostTechStacks = async (name: string) => {
  const response = await axiosInstance.post('/api/tech-stacks', { name });
  console.log(response.data);

  return response.data;
};
