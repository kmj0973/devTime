import type { TodoListFormFields } from '../model/schema';

export const requestSaveTodoList = async (data: TodoListFormFields) => {
  console.log('Saving todo list:', data);
};
