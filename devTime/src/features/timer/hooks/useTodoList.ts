import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';

import useModalStore from '@/shared/store/useModalStroe';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { requestSaveTimer, requestUpdateTimer } from '../api/requests';
import { todoListSchema, type TodoListFields } from '../model/schema';

export const useTodoList = () => {
  const [editNum, setEditNum] = useState<string | null>(null);
  const closeModal = useModalStore((state) => state.closeModal);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { isValid },
  } = useForm<TodoListFields>({
    defaultValues: {
      task: '',
      tasks: [],
    },
    resolver: zodResolver(todoListSchema),
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

  const onSubmit: SubmitHandler<TodoListFields> = async (data) => {
    const { tasks } = data;
    const newTasks = tasks.map((item) => item.task);
    const newTask = { tasks: newTasks };

    const results = await requestSaveTimer(newTask);
    await requestUpdateTimer(results.timerId, {
      splitTimes: [{ date: results.startTime, timeSpent: 0 }],
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
    append,
    remove,
    update,
    onSubmit,
  };
};
