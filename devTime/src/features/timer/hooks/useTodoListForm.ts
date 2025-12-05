import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { todoListFormSchema, type TodoListFormFields } from '../model/schema';
import useModalStore from '@/shared/store/useModalStroe';
import { useTimerStore } from '@/shared/store/useTimerStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { requestSaveTodoList } from '../api/requests';

export const useTodoListForm = () => {
  const [editNum, setEditNum] = useState<string | null>(null);
  const closeModal = useModalStore((state) => state.closeModal);
  const setTimerId = useTimerStore((state) => state.setTimerId);

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

    setTimerId(results.timerId);
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
