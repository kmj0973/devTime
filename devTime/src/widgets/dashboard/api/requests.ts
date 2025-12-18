import { axiosInstance } from '@/shared/lib/axiosInstance';

export const requestGetStats = async () => {
  const response = await axiosInstance.get(`/api/stats`);

  console.log(response.data);
  return response.data;
};

export const requestGetHeatMap = async () => {
  const response = await axiosInstance.get(`/api/heatmap`);

  console.log(response.data);
  return response.data;
};
