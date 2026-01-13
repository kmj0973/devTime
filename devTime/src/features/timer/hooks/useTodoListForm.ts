import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { todoListFormSchema, type TodoListFormFields } from '../model/schema';
import useModalStore from '@/shared/store/useModalStroe';
import { useTimerStore } from '@/shared/store/useTimerStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { Time } from '../model/types';
import mergeSplitTimes from '../util/mergeSplitTimes';
import splitTimeByDate from '../util/splitTimeByDate';
import { useTodoListQuery } from '../queries/useTodoListQuery';
import { useTimerQuery } from '../queries/useTimerQuery';

export const useTodoListForm = () => {
  const [editNum, setEditNum] = useState<string | null>(null);
  const closeModal = useModalStore((state) => state.closeModal);
  const { timerId, studyLogId, pause, restartTime, initTimer } = useTimerStore();

  const { updateTodoList, saveReview } = useTodoListQuery(studyLogId);
  const { refetch, saveTimer, updateTimer } = useTimerQuery();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { isValid, isDirty, errors },
  } = useForm<TodoListFormFields>({
    defaultValues: {
      todayGoal: '',
      tasks: [],
    },
    resolver: zodResolver(todoListFormSchema),
    mode: 'onChange',
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'tasks',
  });

  const addTask = (value: string) => {
    if (!value) {
      return;
    }

    append({ content: value, isCompleted: false });
  };

  const onReviewSubmit: SubmitHandler<TodoListFormFields> = async (data) => {
    const { tasks, review } = data;

    // 서버에서 기존 splitTimes 가져오기
    const { data: timer } = await refetch();
    const original = timer.splitTimes;

    let newSplitTimes: Time[] = [];

    if (!pause) {
      // 타이머가 실행 중이었다면 → startTime ~ now 구간을 날짜별로 split
      const start = new Date(restartTime).getTime();
      const end = Date.now();

      const segments = splitTimeByDate(start, end);

      // 기존 splitTimes + 새 segments 병합
      newSplitTimes = mergeSplitTimes(original, segments);
    } else {
      // pause 상태 → 이미 기록된 splitTimes 사용
      newSplitTimes = original;
    }

    // 저장 요청
    await saveReview({
      timerId,
      data: {
        splitTimes: newSplitTimes,
        tasks,
        review: review as string,
      },
    });

    // 타이머 상태 초기화
    useTimerStore.getState().reset();

    closeModal();
  };

  const onSubmit: SubmitHandler<TodoListFormFields> = async (data) => {
    const { todayGoal, tasks } = data;
    const newTasks = tasks.map((item) => item.content);
    const newTask = { todayGoal: todayGoal as string, tasks: newTasks };

    const results = await saveTimer(newTask);
    await updateTimer({
      timerId: results.timerId,
      payload: [{ date: results.startTime, timeSpent: 0 }],
    });

    initTimer({
      timerId: results.timerId,
      studyLogId: results.studyLogId,
      todayGoal: todayGoal as string,
      startTime: new Date().toISOString(),
      restartTime: results.startTime,
      lastUpdateTime: results.startTime,
      pause: false,
    });

    closeModal();
  };

  const onUpdateClick = async (data: TodoListFormFields) => {
    const { tasks } = data;

    await updateTodoList({ studyLogId, payload: tasks });
  };

  const onUpdateSubmit: SubmitHandler<TodoListFormFields> = async (data) => {
    const { tasks } = data;

    await updateTodoList({ studyLogId, payload: tasks });

    closeModal();
  };

  return {
    closeModal,
    register,
    handleSubmit,
    watch,
    errors,
    control,
    isValid,
    isDirty,
    fields,
    editNum,
    studyLogId,
    setValue,
    reset,
    setEditNum,
    addTask,
    append,
    remove,
    update,
    onSubmit,
    onReviewSubmit,
    onUpdateSubmit,
    onUpdateClick,
  };
};
