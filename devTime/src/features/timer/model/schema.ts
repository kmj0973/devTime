import { z } from 'zod';

export const todoListFormSchema = z.object({
  todayGoal: z.string().min(1, { message: '오늘의 목표를 작성해 주세요' }),
  task: z.string(),
  tasks: z
    .array(
      z.object({
        task: z
          .string()
          .min(1, { message: '할 일을 입력해 주세요.' })
          .max(30, { message: '할 일은 최대 30자까지 입력 가능합니다.' }),
      }),
    )
    .min(1, { message: '할 일을 최소 1개는 입력해 주세요.' }),
});

export type TodoListFormFields = z.infer<typeof todoListFormSchema>;

export const todoListSchema = z.object({
  task: z.string(),
  tasks: z
    .array(
      z.object({
        task: z
          .string()
          .min(1, { message: '할 일을 입력해 주세요.' })
          .max(30, { message: '할 일은 최대 30자까지 입력 가능합니다.' }),
        isCompleted: z.boolean().optional(),
      }),
    )
    .min(1, { message: '할 일을 최소 1개는 입력해 주세요.' }),
});

export type TodoListFields = z.infer<typeof todoListSchema>;
