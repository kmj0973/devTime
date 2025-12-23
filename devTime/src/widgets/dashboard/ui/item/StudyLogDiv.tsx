import { useEffect, useState } from 'react';
import { requestDeleteStudyLog, requestGetStudyLogs } from '../../api/requests';
import TrashSVG from '../svg/TrashSVG';
import formatMsToHMS from '@/features/timer/util/formatMsToHMS';
import DeleteDialog from '../dialog/DeleteDialog';
import { useTimerStore } from '@/shared/store/useTimerStore';
import { requestDeleteTimer } from '@/features/timer/api/requests';
import DoubleArrowSVG from '../svg/DoubleArrowSVG';
import ArrowSVG from '../svg/ArrowSVG';
import type { GetStudyLogsParams } from '../../model/types';
import useModalStore from '@/shared/store/useModalStroe';

type StudyLog = {
  id: string;
  date: string;
  todayGoal: string;
  studyTime: number;
  totalTasks: number;
  incompleteTasks: number;
  completionRate: number;
};

type PagiNation = {
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalItems: number;
  totalPages: number;
};

export default function StudyLogDiv() {
  const studyLogId = useTimerStore((state) => state.studyLogId);
  const timerId = useTimerStore((state) => state.timerId);
  const reset = useTimerStore((state) => state.reset);

  const openModal = useModalStore((state) => state.openModal);

  const [studyLogs, setStudyLogs] = useState<StudyLog[]>([]);
  const [targetId, setTargetId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const [pagiNation, setPagiNation] = useState<PagiNation>();
  const [targetPage, setTargetPage] = useState<number>(1);

  const openDialog = (id: string) => {
    setTargetId(id);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setTargetId('');
  };

  const handleDelete = async (id: string) => {
    if (studyLogId == id) {
      await requestDeleteTimer(timerId);
      reset();
    } else {
      await requestDeleteStudyLog(id);
    }
    setStudyLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
  };

  const getStudyLogs = async ({ page = 1 }: GetStudyLogsParams = {}) => {
    if ((pagiNation && page > pagiNation?.totalPages) || page < 1) return;

    const results = await requestGetStudyLogs({ page });
    setTargetPage(page);
    setStudyLogs(results.data.studyLogs);
  };

  useEffect(() => {
    const fetchStudyLogs = async () => {
      const results = await requestGetStudyLogs();
      setPagiNation(results.data.pagination);
      setStudyLogs(results.data.studyLogs);
    };

    fetchStudyLogs();
  }, []);

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
      <div className='flex flex-col mb-9 min-h-[230px]'>
        {studyLogs.map((log) => {
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
      <div className='w-full flex justify-center items-center gap-3 mb-3'>
        <div onClick={() => getStudyLogs({ page: 1 })} className='cursor-pointer'>
          <DoubleArrowSVG />
        </div>
        <div onClick={() => getStudyLogs({ page: targetPage - 1 })} className='cursor-pointer'>
          <ArrowSVG />
        </div>
        {Array.from({ length: pagiNation?.totalPages || 0 }).map((_, index) => (
          <div
            onClick={() => getStudyLogs({ page: index + 1 })}
            key={index + 1}
            className={`rounded-[5px] w-6 h-6 ${targetPage == index + 1 ? 'bg-primary' : 'bg-gray-200 hover:bg-gray-400'} transition-all text-body-b text-white flex justify-center items-center cursor-pointer`}
          >
            {index + 1}
          </div>
        ))}
        <div
          onClick={() => getStudyLogs({ page: targetPage + 1 })}
          className='rotate-180 cursor-pointer'
        >
          <ArrowSVG />
        </div>
        <div
          onClick={() => getStudyLogs({ page: pagiNation?.totalPages })}
          className='rotate-180 cursor-pointer'
        >
          <DoubleArrowSVG />
        </div>
      </div>
    </div>
  );
}
