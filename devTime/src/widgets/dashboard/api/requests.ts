import { axiosInstance } from '@/shared/lib/axiosInstance';
import type { GetStudyLogsParams } from '../model/types';

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

export const requestGetStudyLogs = async ({
  page = 1,
  limit = 10,
  date,
}: GetStudyLogsParams = {}) => {
  const response = await axiosInstance.get(`/api/study-logs`, {
    params: {
      page,
      limit,
      date,
    },
  });

  console.log(response.data);
  return response.data;
};

export const requestGetStudyLog = async (studyLogId: string) => {
  const response = await axiosInstance.get(`/api/study-logs/${studyLogId}`);

  console.log(response.data);
  return response.data;
};

export const requestDeleteStudyLog = async (studyLogId: string) => {
  const response = await axiosInstance.delete(`/api/study-logs/${studyLogId}`);

  console.log(response.data);
  return response.data;
};
