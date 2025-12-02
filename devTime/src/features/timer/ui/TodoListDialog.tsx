import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import DeleteSVG from './svg/DeleteSVG';
import EditSVG from './svg/EditSVG';
import TodoSVG from './svg/TodoSVG';
import { todoListFormSchema, type TodoListFormFields } from '../model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import CheckSVG from './svg/CheckSVG';

export default function TodoListDialog() {
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

  const [editNum, setEditNum] = useState<string | null>(null);

  const addTask = () => {
    const value = watch('task');

    if (value.length === 0) {
      return;
    }
    append({ task: value });

    reset({ task: '', tasks: watch('tasks') });
  };

  const onSubmit: SubmitHandler<TodoListFormFields> = (data) => {
    console.log(data);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-state-dim1'>
      <form
        onSubmit={() => handleSubmit(onSubmit)}
        className='bg-white py-12 px-9 rounded-[12px] shadow-lg max-w-[640px] w-full'
      >
        <input
          {...register('todayGoal')}
          className='text-4xl leading-[46px] font-bold text-primary-gradient-end placeholder:text-gray-300 mb-9 w-full focus:outline-none'
          type='text'
          placeholder='오늘의 목표'
        />
        <div className='flex flex-col mb-9'>
          <label
            htmlFor='todolist'
            className='text-[14px] leading-[18px] font-medium text-gray-600 mb-2'
          >
            할 일 목록
          </label>
          <div className='relative h-14'>
            <input
              {...register('task')}
              id='todolist'
              type='text'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTask();
                }
              }}
              className={`w-full h-full pl-6 pr-[68px] py-[18px] rounded-xl bg-gray-100 text-body-m text-gray-600 placeholder:text-gray-300 focus:outline-none`}
              placeholder='할 일을 추가해 주세요.'
            />
            <button
              type='button'
              onClick={addTask}
              className={`absolute right-6 h-full my-auto text-body-b ${watch('task').length > 0 ? 'text-primary' : 'text-gray-400'} cursor-pointer`}
            >
              추가
            </button>
          </div>
        </div>
        <div className='w-full h-[460px] mb-9 overflow-y-auto'>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className='flex justify-center items-center w-full h-[72px] bg-primary rounded-xl px-6 py-[26px] gap-4 mb-3'
            >
              <TodoSVG />
              {editNum == field.id ? (
                <>
                  <input
                    {...register(`tasks.${index}.task` as const)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        update(index, { task: watch(`tasks.${index}.task`) });
                      }
                    }}
                    className='w-[422px] text-body-s text-white focus:outline-none'
                  />
                  <button
                    className='cursor-pointer'
                    type='button'
                    onClick={() => update(index, { task: watch(`tasks.${index}.task`) })}
                  >
                    <CheckSVG />
                  </button>
                </>
              ) : (
                <>
                  <div className='w-[382px] text-body-s text-white'>{field.task}</div>
                  <button
                    className='cursor-pointer'
                    type='button'
                    onClick={() => setEditNum(field.id)}
                  >
                    <EditSVG />
                  </button>
                  <button className='cursor-pointer' type='button' onClick={() => remove(index)}>
                    <DeleteSVG />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className='flex justify-end gap-4'>
          <button
            type='button'
            className='px-4 py-[13px] cursor-pointer bg-gray-50 text-subtitle-s text-primary rounded-[5px] hover:bg-gray-300 transition'
          >
            취소
          </button>
          <button
            type='submit'
            disabled={!isValid}
            className={`px-4 py-[13px] cursor-pointer ${isValid ? 'bg-primary-10 hover:bg-blue-200 text-primary' : 'bg-gray-200 text-gray-400'} text-subtitle-s rounded-[5px] transition`}
          >
            타이머 시작하기
          </button>
        </div>
      </form>
    </div>
  );
}
