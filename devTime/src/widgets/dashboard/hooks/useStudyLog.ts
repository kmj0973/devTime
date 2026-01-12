import useModalStore from '@/shared/store/useModalStroe';
import { useTimerStore } from '@/shared/store/useTimerStore';
import { useState } from 'react';
import { requestDeleteTimer } from '@/features/timer/api/requests';
import { requestDeleteStudyLog } from '../api/requests';
import { useStudyLogsQuery } from '../queries/useDashboardQuery';
import { useQueryClient } from '@tanstack/react-query';

export const useStudyLog = () => {
  const queryClient = useQueryClient();

  const { studyLogId, timerId, reset } = useTimerStore();
  const openModal = useModalStore((state) => state.openModal);

  const [targetPage, setTargetPage] = useState<number>(1);
  const [targetId, setTargetId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const { studyLogs, isFetching } = useStudyLogsQuery(targetPage);

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

    await queryClient.invalidateQueries({ queryKey: ['dashboard', 'studyLogs'] });
    await queryClient.refetchQueries({
      queryKey: ['dashboard', 'studyLogs'],
    });
  };

  return {
    targetId,
    isOpen,
    isFetching,
    studyLogs: studyLogs?.studyLogs ?? [],
    pagination: studyLogs?.pagination,
    targetPage,
    openModal,
    openDialog,
    closeDialog,
    handleDelete,
    setTargetPage,
  };
};
