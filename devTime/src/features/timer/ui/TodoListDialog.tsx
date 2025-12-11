import { useEffect, useRef } from 'react';
import CheckSVG from './svg/TodoList/CheckSVG';
import DeleteSVG from './svg/TodoList/DeleteSVG';
import EditSVG from './svg/TodoList/EditSVG';
import TodoSVG from './svg/TodoList/TodoSVG';
import { requestGetTodoLists } from '../api/requests';
import { useTodoListForm } from '../hooks/useTodoListForm';

export default function TodoListDialog() {
  const {
    closeModal,
    register,
    handleSubmit,
    watch,
    isValid,
    fields,
    editNum,
    studyLogId,
    setEditNum,
    addTask,
    append,
    remove,
    update,
    onUpdateSubmit,
  } = useTodoListForm();

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initialTasks = async () => {
      const data = await requestGetTodoLists(studyLogId);
      data.data.tasks.map((task: { content: string; isCompleted: boolean }) => {
        append({ content: task.content, isCompleted: task.isCompleted });
      });
    };

    initialTasks();
  }, []);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-state-dim1'>
      <form
        onSubmit={handleSubmit(onUpdateSubmit)}
        className='bg-white py-12 px-9 rounded-[12px] shadow-lg max-w-[640px] w-full'
      >
        <div className='flex flex-col mb-9'>
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
                    autoFocus
                    {...register(`tasks.${index}.content` as const)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        update(index, {
                          content: watch(`tasks.${index}.content`),
                          isCompleted: false,
                        });
                        setEditNum(null);
                      }
                    }}
                    className='w-[422px] text-body-s text-white focus:outline-none'
                  />
                  <button
                    className='cursor-pointer'
                    type='button'
                    onClick={() => {
                      update(index, {
                        content: watch(`tasks.${index}.content`),
                        isCompleted: false,
                      });
                      setEditNum(null);
                    }}
                  >
                    <CheckSVG />
                  </button>
                </>
              ) : (
                <>
                  <div className='w-[382px] text-body-s text-white'>{field.content}</div>
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
            onClick={() => closeModal()}
            className='px-4 py-[13px] cursor-pointer bg-gray-50 text-subtitle-s text-primary rounded-[5px] hover:bg-gray-300 transition'
          >
            취소
          </button>
          <button
            type='submit'
            disabled={!isValid && editNum == null}
            className={`px-4 py-[13px] cursor-pointer ${isValid && editNum == null ? 'bg-primary-10 hover:bg-blue-200 text-primary' : 'bg-gray-200 text-gray-400'} text-subtitle-s rounded-[5px] transition`}
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
