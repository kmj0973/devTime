import { axiosInstance } from '@/shared/lib/axiosInstance';
import type { Time, TodoListType } from '../model/types';

export const requestSaveTodoList = async (data: TodoListType) => {
  const response = await axiosInstance.post('/api/timers', data);

  console.log('Response from server:', response.data);
  return response.data;
};

export const requestGetTodoList = async () => {
  const response = await axiosInstance.get(`/api/timers`);

  console.log(response.data);
  return response.data;
};

export const requestUpdateTodoList = async (timerId: string, data: { splitTimes: Time[] }) => {
  const response = await axiosInstance.put(`/api/timers/${timerId}`, data);

  console.log(response.data);
  return response.data;
};

export const requestDeleteTodoList = async (timerId: string) => {
  const response = await axiosInstance.delete(`/api/timers/${timerId}`);

  console.log(response.data);
  return response.data;
};
