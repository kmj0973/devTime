import useModalStore from '@/shared/store/useModalStroe';
import { useTimerStore } from '@/shared/store/useTimerStore';
import { useState } from 'react';
import { useStudyLogMutation, useStudyLogsQuery } from '../queries/useDashboardQuery';

export const useStudyLog = () => {
  const { studyLogId, timerId, reset } = useTimerStore();
  const openModal = useModalStore((state) => state.openModal);

  const [targetPage, setTargetPage] = useState<number>(1);
  const [targetId, setTargetId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const { studyLogs, isFetching } = useStudyLogsQuery(targetPage);
  const { deleteStudyLog } = useStudyLogMutation();

  const openDialog = (id: string) => {
    setTargetId(id);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setTargetId('');
  };

  const handleDelete = async (id: string) => {
    await deleteStudyLog({
      id,
      timerId: studyLogId === id ? timerId : undefined,
    });
    if (studyLogId === id) {
      reset();
    }
    // await queryClient.invalidateQueries({ queryKey: ['dashboard', 'studyLogs'] });
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
