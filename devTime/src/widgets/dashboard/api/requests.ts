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

export const requestGetStudyLogs = async () => {
  const response = await axiosInstance.get(`/api/study-logs`);

  console.log(response.data);
  return response.data;
};

export const requestDeleteStudyLog = async (studyLogId: string) => {
  const response = await axiosInstance.delete(`/api/study-logs/${studyLogId}`);

  console.log(response.data);
  return response.data;
};
