import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { todoListFormSchema, type TodoListFormFields } from '../model/schema';
import useModalStore from '@/shared/store/useModalStroe';
import { useTimerStore } from '@/shared/store/useTimerStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { requestSaveTimer, requestUpdateTimer, requestUpdateTodoLists } from '../api/requests';

export const useTodoListForm = () => {
  const [editNum, setEditNum] = useState<string | null>(null);
  const closeModal = useModalStore((state) => state.closeModal);
  const studyLogId = useTimerStore((state) => state.studyLogId);
  const initTimer = useTimerStore((state) => state.initTimer);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    trigger,
    formState: { isValid, errors },
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
    // const value = watch('task');

    if (!value) {
      return;
    }

    append({ content: value, isCompleted: false });
    reset({ tasks: watch('tasks') });
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
    fields,
    editNum,
    studyLogId,
    setValue,
    trigger,
    setEditNum,
    addTask,
    append,
    remove,
    update,
    onSubmit,
    onUpdateSubmit,
  };
};
