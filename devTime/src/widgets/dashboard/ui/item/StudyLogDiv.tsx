import TrashSVG from '../svg/TrashSVG';
import formatMsToHMS from '@/features/timer/util/formatMsToHMS';
import DeleteDialog from '../dialog/DeleteDialog';
import DoubleArrowSVG from '../svg/DoubleArrowSVG';
import ArrowSVG from '../svg/ArrowSVG';
import { useStudyLog } from '../../hooks/useStudyLog';
import type { StudyLogs } from '../../model/types';

export default function StudyLogDiv() {
  const {
    targetId,
    isOpen,
    studyLogs,
    pagination,
    targetPage,
    openModal,
    openDialog,
    closeDialog,
    handleDelete,
    setTargetPage,
  } = useStudyLog();

  return (
    <div className='bg-white w-[1200px] min-h-[450px] col-span-3 rounded-[18px] p-6'>
      {isOpen && (
        <DeleteDialog onClose={() => closeDialog()} onDelete={() => handleDelete(targetId)} />
      )}
      <div className='text-subtitle-s text-state-disabled mb-6'>학습 기록</div>
      <div className='flex gap-18 w-full bg-primary-10 py-5 px-9 rounded-t-[12px] text-subtitle-s text-secondary-indigo'>
        <div className='w-[90px]'>날짜</div>
        <div className='w-[186px]'>목표</div>
        <div className='w-[90px]'>공부 시간</div>
        <div className='w-[90px]'>할 일 갯수</div>
        <div className='w-[93px]'>미완료 할 일</div>
        <div className='w-[90px]'>달성률</div>
      </div>

      {studyLogs.length == 0 ? (
        <div className='flex justify-center items-center text-body-b text-gray-500 min-h-[230px] mb-9'>
          학습 기록이 없습니다.
        </div>
      ) : (
        <div className='flex flex-col mb-9 min-h-[230px]'>
          {studyLogs &&
            studyLogs.map((log: StudyLogs) => {
              return (
                <div
                  key={log.id}
                  onClick={() => openModal('studyLog', log.id)}
                  className='w-6xl grid grid-cols-[90px_minmax(186px,2fr)_repeat(4,90px)_24px] text-body-m text-gray-700 border-b border-gray-300 gap-18 px-9 py-6'
                >
                  <div className=''>{log.date.split('-').join('.')}</div>
                  <div className='text-secondary-indigo text-body-s'>{log.todayGoal}</div>
                  <div className=''>{formatMsToHMS(log.studyTime)}</div>
                  <div className=''>{log.totalTasks}</div>
                  <div className=''>{log.incompleteTasks}</div>
                  <div className=''>{log.completionRate}%</div>
                  <TrashSVG onOpen={() => openDialog(log.id)} />
                </div>
              );
            })}
        </div>
      )}

      <div className='w-full flex justify-center items-center gap-3 mb-3'>
        <div onClick={() => setTargetPage(1)} className='cursor-pointer'>
          <DoubleArrowSVG />
        </div>
        <div
          onClick={() => setTargetPage((prev) => Math.max(prev - 1, 1))}
          className='cursor-pointer'
        >
          <ArrowSVG />
        </div>
        {Array.from({ length: pagination?.totalPages ?? 0 }).map((_, index) => (
          <div
            onClick={() => setTargetPage(index + 1)}
            key={index + 1}
            className={`rounded-[5px] w-6 h-6 ${targetPage == index + 1 ? 'bg-primary' : 'bg-gray-200 hover:bg-gray-400'} transition-all text-body-b text-white flex justify-center items-center cursor-pointer`}
          >
            {index + 1}
          </div>
        ))}
        <div
          onClick={() =>
            setTargetPage((prev) => Math.min(prev + 1, pagination?.totalPages ?? prev))
          }
          className='rotate-180 cursor-pointer'
        >
          <ArrowSVG />
        </div>
        <div
          onClick={() => setTargetPage(pagination?.totalPages)}
          className='rotate-180 cursor-pointer'
        >
          <DoubleArrowSVG />
        </div>
      </div>
    </div>
  );
}
