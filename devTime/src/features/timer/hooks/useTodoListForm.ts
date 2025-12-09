import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { todoListFormSchema, type TodoListFormFields } from '../model/schema';
import useModalStore from '@/shared/store/useModalStroe';
import { useTimerStore } from '@/shared/store/useTimerStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { requestSaveTodoList, requestUpdateTodoList } from '../api/requests';

export const useTodoListForm = () => {
  const [editNum, setEditNum] = useState<string | null>(null);
  const closeModal = useModalStore((state) => state.closeModal);
  const initTimer = useTimerStore((state) => state.initTimer);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { isValid },
  } = useForm<TodoListFormFields>({
    defaultValues: {
      todayGoal: '',
      task: '',
      tasks: [],
    },
    resolver: zodResolver(todoListFormSchema),
    mode: 'onChange',
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'tasks',
  });

  const addTask = () => {
    const value = watch('task');

    if (value.length === 0) {
      return;
    }

    append({ task: value });
    reset({ task: '', tasks: watch('tasks') });
  };

  const onSubmit: SubmitHandler<TodoListFormFields> = async (data) => {
    const { tasks, todayGoal } = data;
    const newTasks = tasks.map((item) => item.task);
    const newTask = { todayGoal, tasks: newTasks };

    const results = await requestSaveTodoList(newTask);
    await requestUpdateTodoList(results.timerId, {
      splitTimes: [{ date: results.startTime, timeSpent: 0 }],
    });

    initTimer({
      timerId: results.timerId,
      todayGoal: todayGoal,
      startTime: results.startTime,
      restartTime: results.startTime,
      lastUpdateTime: results.startTime,
      pause: false,
    });

    closeModal();
  };

  return {
    closeModal,
    register,
    handleSubmit,
    watch,
    control,
    isValid,
    fields,
    editNum,
    setEditNum,
    addTask,
    remove,
    update,
    onSubmit,
  };
};
