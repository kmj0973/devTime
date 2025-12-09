import { axiosInstance } from '@/shared/lib/axiosInstance';

type TodoListType = {
  todayGoal: string;
  tasks: string[];
};

interface Time {
  date: string; // 날짜 (ISO 형식 또는 YYYY-MM-DD 형태)
  timeSpent: number; // 시간을 밀리초 단위로 저장
}

type SplitTimes = Time[];

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

export const requestUpdateTodoList = async (timerId: string, data: { splitTimes: SplitTimes }) => {
  const response = await axiosInstance.put(`/api/timers/${timerId}`, data);

  console.log(response.data);
  return response.data;
};

export const requestDeleteTodoList = async (timerId: string) => {
  const response = await axiosInstance.delete(`/api/timers/${timerId}`);

  console.log(response.data);
  return response.data;
};
