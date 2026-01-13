import { useEffect, useRef, useState } from 'react';
import CheckSVG from '../svg/TodoList/CheckSVG';
import DeleteSVG from '../svg/TodoList/DeleteSVG';
import EditSVG from '../svg/TodoList/EditSVG';
import TodoSVG from '../svg/TodoList/TodoSVG';
import { useTodoListForm } from '../../hooks/useTodoListForm';
import EditButtonSVG from '../svg/Button/EditButtonSVG';
import CheckButtonSVG from '../svg/Button/CheckButtonSVG';
import { useTodoListQuery } from '../../queries/useTodoListQuery';

export default function ReviewDialog() {
  const {
    closeModal,
    register,
    handleSubmit,
    watch,
    isValid,
    isDirty,
    fields,
    editNum,
    studyLogId,
    setValue,
    reset,
    setEditNum,
    addTask,
    remove,
    onReviewSubmit,
    onUpdateClick,
  } = useTodoListForm();

  const initialized = useRef(false);
  const [isEdit, setIsEdit] = useState(false);
  const [taskValue, setTaskValue] = useState('');
  const { refetch, isFetching } = useTodoListQuery(studyLogId);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initialTasks = async () => {
      const { data: todoList } = await refetch();
      reset({
        todayGoal: '',
        tasks: todoList.data.tasks,
        review: '',
      });
    };

    initialTasks();
  }, []);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-state-dim1'>
      <form
        onSubmit={handleSubmit(onReviewSubmit)}
        className='bg-white py-12 px-9 rounded-[12px] shadow-lg max-w-[640px] w-full'
      >
        <div className='flex flex-col gap-1 mb-9'>
          <div className='text-title-b text-gray-700'>오늘도 수고하셨어요!</div>
          <div className='text-body-m text-gray-500'>
            완료한 일을 체크하고, 오늘의 학습 회고를 작성해 주세요.
          </div>
        </div>
        <div className='flex flex-col mb-9'>
          <div className='relative h-14'>
            <input
              value={taskValue}
              onChange={(e) => setTaskValue(e.target.value)}
              id='todolist'
              type='text'
              maxLength={30}
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
            <div
              className='flex items-center gap-2 cursor-pointer'
              onClick={() => {
                reset({ todayGoal: '', tasks: watch('tasks'), review: watch('review') });
                setIsEdit(true);
              }}
            >
              <EditButtonSVG />
              <div className='text-body-s-m text-gray-600'>할 일 수정</div>
            </div>
          )}
        </div>

        {isFetching ? (
          <div className='w-full h-[400px] mb-9 overflow-y-auto'>로딩중...</div>
        ) : (
          <div className='w-full h-[400px] mb-9 overflow-y-auto'>
            {fields.map((field, index) => {
              const content = watch(`tasks.${index}.content`);
              const completed = watch(`tasks.${index}.isCompleted`);

              return (
                <div
                  key={field.id}
                  className={`flex justify-between items-center w-full h-[72px] ${
                    completed ? 'bg-state-disabled' : 'bg-primary'
                  } rounded-xl px-6 py-[26px] gap-4 mb-3`}
                >
                  <TodoSVG />

                  {!isEdit ? ( // 일반모드
                    <>
                      <div className='w-[422px] text-body-s text-white'>{content}</div>
                      <button
                        className={`${
                          completed ? 'bg-white/50' : ''
                        } flex justify-center items-center w-7 h-7 border-[1.5px] border-white rounded-[8px] cursor-pointer`}
                        type='button'
                        onClick={() => {
                          setValue(`tasks.${index}.isCompleted`, !completed, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }}
                      >
                        {completed ? <CheckButtonSVG /> : <></>}
                      </button>
                    </>
                  ) : // 편집 모드
                  editNum === field.id ? (
                    <>
                      <input
                        autoFocus
                        {...register(`tasks.${index}.content`)}
                        maxLength={30}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            setValue(
                              `tasks.${index}`,
                              {
                                content: content,
                                isCompleted: false,
                              },
                              {
                                shouldDirty: true,
                                shouldValidate: true,
                              },
                            );
                            setEditNum(null);
                          }
                        }}
                        className='w-[422px] text-body-s text-white focus:outline-none'
                      />

                      <button
                        className='cursor-pointer'
                        type='button'
                        onClick={() => {
                          setValue(
                            `tasks.${index}`,
                            {
                              content: content,
                              isCompleted: false,
                            },
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            },
                          );
                          setEditNum(null);
                        }}
                      >
                        <CheckSVG />
                      </button>
                    </>
                  ) : (
                    // 수정 모드
                    <>
                      <div className='w-[382px] text-body-s text-white'>{content}</div>

                      <button
                        className='cursor-pointer'
                        type='button'
                        onClick={() => {
                          setValue(`tasks.${index}.isCompleted`, false);
                          setEditNum(field.id);
                        }}
                      >
                        <EditSVG />
                      </button>

                      <button
                        className='cursor-pointer'
                        type='button'
                        onClick={() => remove(index)}
                      >
                        <DeleteSVG />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className='w-full flex flex-col gap-2 mb-9'>
          <div className='text-body-s-m text-gray-600'>학습 회고</div>
          <textarea
            {...register('review')}
            className={`w-full h-[84px] bg-gray-50 text-body-m px-4 py-3 resize-none text-gray-600 placeholder:text-state-disabled`}
            placeholder='오늘 학습한 내용을 회고해 보세요(15자 이상 작성 필수).'
          />
        </div>

        <div className='flex justify-end gap-4'>
          {isEdit ? (
            <>
              <button
                type='button'
                onClick={() => {
                  reset();
                  setIsEdit(false);
                }}
                className='px-4 py-[13px] cursor-pointer bg-gray-50 text-subtitle-s text-primary rounded-[5px] hover:bg-gray-300 transition'
              >
                취소
              </button>
              <button
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  onUpdateClick({ todayGoal: '', tasks: watch('tasks') });
                  setIsEdit(false);
                }}
                disabled={!(isDirty && isValid && editNum === null)}
                className={`px-4 py-[13px] cursor-pointer ${isDirty && isValid && editNum === null ? 'bg-primary-10 hover:bg-blue-200 text-primary' : 'bg-gray-200 text-gray-400'} text-subtitle-s rounded-[5px] transition`}
              >
                변경 사항 저장하기
              </button>
            </>
          ) : (
            <>
              <button
                type='button'
                onClick={() => closeModal()}
                className='px-4 py-[13px] cursor-pointer bg-gray-50 text-subtitle-s text-primary rounded-[5px] hover:bg-gray-300 transition'
              >
                취소
              </button>
              <button
                type='submit'
                disabled={
                  !(isDirty && isValid && editNum === null && watch('review')!.length >= 15)
                }
                className={`px-4 py-[13px] cursor-pointer ${isDirty && isValid && editNum == null && watch('review')!.length >= 15 ? 'bg-primary-10 hover:bg-blue-200 text-primary' : 'bg-gray-200 text-gray-400'} text-subtitle-s rounded-[5px] transition`}
              >
                공부 완료하기
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
