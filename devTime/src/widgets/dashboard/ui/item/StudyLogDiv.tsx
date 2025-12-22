import { useEffect, useState } from 'react';
import { requestDeleteStudyLog, requestGetStudyLogs } from '../../api/requests';
import TrashSVG from '../svg/TrashSVG';
import formatMsToHMS from '@/features/timer/util/formatMsToHMS';
import DeleteDialog from '../dialog/DeleteDialog';

type StudyLog = {
  id: string;
  date: string;
  todayGoal: string;
  studyTime: number;
  totalTasks: number;
  incompleteTasks: number;
  completionRate: number;
};

export default function StudyLogDiv() {
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>([]);
  const [targetId, setTargetId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = (id: string) => {
    setTargetId(id);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setTargetId('');
  };

  const handleDelete = async (id: string) => {
    await requestDeleteStudyLog(id);
    setStudyLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
  };

  useEffect(() => {
    const fetchStudyLogs = async () => {
      const results = await requestGetStudyLogs();
      console.log(results.data.studyLogs);
      setStudyLogs(results.data.studyLogs);
    };

    fetchStudyLogs();
  }, []);

  return (
    <div className='bg-white w-full max-h-[950px] min-h-[444px] col-span-3 rounded-[18px] p-6'>
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
      <div className='flex flex-col'>
        {studyLogs.map((log) => {
          return (
            <div
              key={log.id}
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
    </div>
  );
}
