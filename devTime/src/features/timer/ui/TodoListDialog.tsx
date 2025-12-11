import { useEffect, useRef, useState } from 'react';
import CheckSVG from './svg/TodoList/CheckSVG';
import DeleteSVG from './svg/TodoList/DeleteSVG';
import EditSVG from './svg/TodoList/EditSVG';
import TodoSVG from './svg/TodoList/TodoSVG';
import { requestGetTodoLists } from '../api/requests';
import { useTodoListForm } from '../hooks/useTodoListForm';
import EditButtonSVG from './svg/Button/EditButtonSVG';
import CheckButtonSVG from './svg/Button/CheckButtonSVG';

export default function TodoListDialog() {
  const {
    closeModal,
    register,
    handleSubmit,
    watch,
    trigger,
    errors,
    isValid,
    fields,
    editNum,
    studyLogId,
    setValue,
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
      const todoLists = await requestGetTodoLists(studyLogId);

      todoLists.data.tasks.map((task: { content: string; isCompleted: boolean }) => {
        append({ content: task.content, isCompleted: task.isCompleted });
      });

      await trigger('tasks');
    };

    initialTasks();
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const [taskValue, setTaskValue] = useState('');

  console.log(errors, isValid);
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-state-dim1'>
      <form
        onSubmit={handleSubmit(onUpdateSubmit)}
        className='bg-white py-12 px-9 rounded-[12px] shadow-lg max-w-[640px] w-full'
      >
        <div className='flex flex-col mb-9'>
          <div className='relative h-14'>
            <input
              value={taskValue}
              onChange={(e) => setTaskValue(e.target.value)}
              id='todolist'
              type='text'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTask(taskValue);
                  setTaskValue('');
                }
              }}
              className={`w-full h-full pl-6 pr-[68px] py-[18px] rounded-xl bg-gray-100 text-body-m text-gray-600 placeholder:text-gray-300 focus:outline-none`}
              placeholder='할 일을 추가해 주세요.'
            />
            <button
              type='button'
              onClick={() => {
                addTask(taskValue);
                setTaskValue('');
              }}
              className={`absolute right-6 h-full my-auto text-body-b ${taskValue != '' ? 'text-primary' : 'text-gray-400'} cursor-pointer`}
            >
              추가
            </button>
          </div>
        </div>
        <div className='w-full flex justify-between items-center mb-6'>
          <div className='text-title-b text-gray-700'>할 일 목록</div>
          {isEdit ? (
            <></>
          ) : (
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => setIsEdit(true)}>
              <EditButtonSVG />
              <div className='text-body-s-m text-gray-600'>할 일 수정</div>
            </div>
          )}
        </div>
        <div className='w-full h-[624px] mb-9 overflow-y-auto'>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={`flex justify-between items-center w-full h-[72px] ${field.isCompleted ? 'bg-state-disabled' : 'bg-primary'} rounded-xl px-6 py-[26px] gap-4 mb-3`}
            >
              <TodoSVG />
              {!isEdit ? (
                <>
                  <div className='w-[422px] text-body-s text-white'>{field.content}</div>
                  <button
                    className={`${field.isCompleted ? 'bg-white/50' : ''} flex justify-center items-center w-7 h-7 border-[1.5px] border-white rounded-[8px] cursor-pointer`}
                    type='button'
                    onClick={() => {
                      update(index, {
                        content: watch(`tasks.${index}.content`),
                        isCompleted: !field.isCompleted,
                      });
                    }}
                  >
                    {field.isCompleted ? <CheckButtonSVG /> : <></>}
                  </button>
                </>
              ) : editNum == field.id ? (
                <>
                  <input
                    autoFocus
                    {...register(`tasks.${index}.content` as const)}
                    onKeyDown={async (e) => {
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
          {isEdit ? (
            <button
              type='submit'
              disabled={!isValid && editNum == null}
              className={`px-4 py-[13px] cursor-pointer ${isValid && editNum == null ? 'bg-primary-10 hover:bg-blue-200 text-primary' : 'bg-gray-200 text-gray-400'} text-subtitle-s rounded-[5px] transition`}
            >
              변경 사항 저장하기
            </button>
          ) : (
            <button
              type='submit'
              disabled={!isValid && editNum == null}
              className={`px-4 py-[13px] cursor-pointer ${isValid && editNum == null ? 'bg-primary-10 hover:bg-blue-200 text-primary' : 'bg-gray-200 text-gray-400'} text-subtitle-s rounded-[5px] transition`}
            >
              저장하기
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
