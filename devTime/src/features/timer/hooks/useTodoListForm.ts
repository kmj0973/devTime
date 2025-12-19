import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { todoListFormSchema, type TodoListFormFields } from '../model/schema';
import useModalStore from '@/shared/store/useModalStroe';
import { useTimerStore } from '@/shared/store/useTimerStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  requestGetTimer,
  requestSaveReivew,
  requestSaveTimer,
  requestUpdateTimer,
  requestUpdateTodoLists,
} from '../api/requests';
import type { Time } from '../model/types';

export const useTodoListForm = () => {
  const [editNum, setEditNum] = useState<string | null>(null);
  const closeModal = useModalStore((state) => state.closeModal);
  const { timerId, studyLogId, pause, restartTime, initTimer } = useTimerStore();

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

  const upsert = (splitTimes: Time[], newTime: Time): Time[] => {
    const index = splitTimes.findIndex(
      (time) => time.date.split('T')[0] === newTime.date.split('T')[0],
    );

    const newSplitTimes = splitTimes.map((t) => ({ ...t })); // 깊은 복사

    if (index !== -1) {
      newSplitTimes[index].timeSpent += newTime.timeSpent;
      return newSplitTimes;
    }
    return [...splitTimes, newTime];
  };

  const onReviewSubmit: SubmitHandler<TodoListFormFields> = async (data) => {
    const { tasks, review } = data;

    const results = await requestGetTimer();
    const splitTimes = results.splitTimes;
    const newSplitTimes = upsert(splitTimes, {
      date: new Date().toISOString(),
      timeSpent: Date.now() - new Date(restartTime).getTime(),
    });

    console.log('newSplitTimes', newSplitTimes);

    console.log('SplitTimes', splitTimes);
    if (pause) {
      console.log('true');
      await requestSaveReivew(timerId, {
        splitTimes: splitTimes,
        tasks,
        review: review as string,
      });
    } else {
      console.log('false');
      await requestSaveReivew(timerId, {
        splitTimes: newSplitTimes,
        tasks,
        review: review as string,
      });
    }
    useTimerStore.getState().reset();

    closeModal();
  };

  const onSubmit: SubmitHandler<TodoListFormFields> = async (data) => {
    const { todayGoal, tasks } = data;
    const newTasks = tasks.map((item) => item.content);
    const newTask = { todayGoal: todayGoal as string, tasks: newTasks };

    const results = await requestSaveTimer(newTask);
    await requestUpdateTimer(results.timerId, {
      splitTimes: [{ date: results.startTime, timeSpent: 0 }],
    });

    initTimer({
      timerId: results.timerId,
      studyLogId: results.studyLogId,
      todayGoal: todayGoal as string,
      startTime: results.startTime,
      restartTime: results.startTime,
      lastUpdateTime: results.startTime,
      pause: false,
    });

    closeModal();
  };

  const onUpdateClick = async (data: TodoListFormFields) => {
    const { tasks } = data;

    await requestUpdateTodoLists(studyLogId, tasks);
  };

  const onUpdateSubmit: SubmitHandler<TodoListFormFields> = async (data) => {
    const { tasks } = data;

    await requestUpdateTodoLists(studyLogId, tasks);

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
