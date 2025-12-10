import { axiosInstance } from '@/shared/lib/axiosInstance';
import type { Time, TodoListType } from '../model/types';

export const requestSaveTimer = async (data: TodoListType) => {
  const response = await axiosInstance.post('/api/timers', data);

  console.log(response.data);
  return response.data;
};

export const requestGetTimer = async () => {
  const response = await axiosInstance.get(`/api/timers`);

  console.log(response.data);
  return response.data;
};

export const requestUpdateTimer = async (timerId: string, data: { splitTimes: Time[] }) => {
  const response = await axiosInstance.put(`/api/timers/${timerId}`, data);

  console.log(response.data);
  return response.data;
};

export const requestDeleteTimer = async (timerId: string) => {
  const response = await axiosInstance.delete(`/api/timers/${timerId}`);

  console.log(response.data);
  return response.data;
};

export const requestGetTodoLists = async (studyLogId: string) => {
  const response = await axiosInstance.get(`/api/study-logs/${studyLogId}`);

  console.log(response.data);
  return response.data;
};
