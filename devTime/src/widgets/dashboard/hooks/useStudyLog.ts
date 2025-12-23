import useModalStore from '@/shared/store/useModalStroe';
import { useTimerStore } from '@/shared/store/useTimerStore';
import { useEffect, useState } from 'react';
import type { GetStudyLogsParams, PagiNation, StudyLogs } from '../model/types';
import { requestDeleteTimer } from '@/features/timer/api/requests';
import { requestDeleteStudyLog, requestGetStudyLogs } from '../api/requests';

export const useStudyLog = () => {
  const { studyLogId, timerId, reset } = useTimerStore();
  const openModal = useModalStore((state) => state.openModal);

  const [studyLogs, setStudyLogs] = useState<StudyLogs[]>([]);
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

  return {
    studyLogs,
    targetId,
    isOpen,
    pagiNation,
    targetPage,
    openModal,
    openDialog,
    closeDialog,
    handleDelete,
    getStudyLogs,
  };
};
