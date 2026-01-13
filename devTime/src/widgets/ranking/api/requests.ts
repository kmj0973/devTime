import { axiosInstance } from '@/shared/lib/axiosInstance';

export const requestGetRankings = async ({
  sortBy,
  page,
  limit,
}: {
  sortBy: string;
  page: number;
  limit: number;
}) => {
  const response = await axiosInstance.get(`/api/rankings`, {
    params: { sortBy: sortBy, page: page, limit: limit },
  });

  console.log(response.data);
  return response.data;
};
