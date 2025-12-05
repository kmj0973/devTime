import { axiosInstance } from '@/shared/lib/axiosInstance';

type TodoListType = {
  todayGoal: string;
  tasks: string[];
};

export const requestSaveTodoList = async (data: TodoListType) => {
  const response = await axiosInstance.post('/api/timers', data);

  console.log('Response from server:', response.data);
  return response.data;
};

export const requestGetTodoList = async (timerId: string) => {
  const response = await axiosInstance.get(`/api/timers/${timerId}`);

  console.log(response.data);
  return response.data;
};

export const requestDeleteTodoList = async (timerId: string) => {
  const response = await axiosInstance.delete(`/api/timers/${timerId}`);

  console.log(response.data);
  return response.data;
};
