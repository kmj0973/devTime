import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  requestDeleteTimer,
  requestGetTimer,
  requestSaveTimer,
  requestUpdateTimer,
} from '../api/requests';
import type { Time, TodoListType } from '../model/types';

export const useTimerQuery = () => {
  const queryClient = useQueryClient();

  const { data: timer, refetch } = useQuery({
    queryKey: ['timer'],
    queryFn: () => requestGetTimer(),
    enabled: false,
  });

  const saveTimer = useMutation({
    mutationFn: (data: TodoListType) => requestSaveTimer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timer'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  }).mutateAsync;

  const updateTimer = useMutation({
    mutationFn: ({ timerId, payload }: { timerId: string; payload: Time[] }) =>
      requestUpdateTimer(timerId, { splitTimes: payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timer'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => console.log(error.message),
  }).mutateAsync;

  const deleteTimer = useMutation({
    mutationFn: (timerId: string) => requestDeleteTimer(timerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timer'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
    onError: (error) => console.log(error.message),
  }).mutateAsync;

  return { timer, refetch, saveTimer, updateTimer, deleteTimer };
};
