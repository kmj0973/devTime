import { axiosInstance } from '@/shared/lib/axiosInstance';

export const requestGetRankings = async (sortset: string) => {
  const response = await axiosInstance.get(`/api/rankings`, { params: { sortBy: sortset } });

  console.log(response.data);
  return response.data;
};
