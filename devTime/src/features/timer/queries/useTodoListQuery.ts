import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { requestGetTodoLists, requestSaveReivew, requestUpdateTodoLists } from '../api/requests';
import type { Task, Time } from '../model/types';

export const useTodoListQuery = (studyLogId: string) => {
  const queryClient = useQueryClient();

  const {
    data: todoList,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['todoList'],
    queryFn: () => requestGetTodoLists(studyLogId),
    enabled: false,
  });

  const updateTodoList = useMutation({
    mutationFn: ({ studyLogId, payload }: { studyLogId: string; payload: Task[] }) =>
      requestUpdateTodoLists(studyLogId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoList'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['ranking'] });
    },
  }).mutateAsync;

  const saveReview = useMutation({
    mutationFn: ({
      timerId,
      data,
    }: {
      timerId: string;
      data: { splitTimes: Time[]; tasks: Task[]; review: string };
    }) => requestSaveReivew(timerId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoList'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['ranking'] });
    },
  }).mutateAsync;

  return { todoList, refetch, isFetching, updateTodoList, saveReview };
};
