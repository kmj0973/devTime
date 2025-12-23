import { useEffect, useState } from 'react';
import { requestGetStudyLog } from '../../api/requests';
import useModalStore from '@/shared/store/useModalStroe';
import TodoSVG from '@/features/timer/ui/svg/TodoList/TodoSVG';
import type { StudyLog } from '../../model/types';

export default function StudyLogDialog({ studyLogId }: { studyLogId: string }) {
  const closeModal = useModalStore((state) => state.closeModal);
  const [studyLog, setStudyLog] = useState<StudyLog>();

  useEffect(() => {
    const getStudyLog = async () => {
      const results = await requestGetStudyLog(studyLogId);
      setStudyLog(results.data);
    };
    getStudyLog();
  }, [studyLogId]);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-state-dim1 z-10'>
      <div className='bg-white px-9 py-12 rounded-[12px] shadow-lg max-w-[640px] w-full'>
        <h2 className='text-4xl font-bold text-secondary-indigo mb-9'>불필요한 중복 코드 줄이기</h2>
        <div className='w-full h-[492px] mb-9 overflow-y-auto'>
          {studyLog?.tasks.map((task) => {
            return (
              <div
                key={task.id}
                className={`flex justify-start items-center w-full h-[72px] ${
                  task.isCompleted ? 'bg-state-disabled' : 'bg-primary'
                } rounded-xl px-6 py-[26px] gap-4 mb-3`}
              >
                <TodoSVG />

                <div className='w-[422px] text-body-s text-white'>{task.content}</div>
              </div>
            );
          })}
        </div>
        <div className='mb-9'>
          <div className='text-body-s-m text-gray-600 mb-2'>한 줄 소감</div>
          <div className='text-title-s text-gray-800 h-[100px] max-h-[120px] overflow-y-auto'>
            {studyLog?.review}
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <div
            onClick={() => closeModal()}
            className='px-4 py-[13px] cursor-pointer bg-gray-100 text-subtitle-s text-primary rounded-[5px] hover:bg-gray-400 transition'
          >
            닫기
          </div>
        </div>
      </div>
    </div>
  );
}
