// src/features/timer/hooks/useTimer.ts
import { useTimerStore } from '@/shared/store/useTimerStore';
import { requestGetTodoList, requestUpdateTodoList, requestDeleteTodoList } from '../api/requests';
import useModalStore from '@/shared/store/useModalStroe';
import type { Time } from '../model/types';

export const useTimer = () => {
  const {
    timerId,
    restartTime,
    pause,
    pauseTime,
    pauseTimeISOString,
    setPause,
    setPauseTime,
    setPauseTimeISOString,
    setRestartTime,
    setLastUpdateTime,
  } = useTimerStore();

  const openModal = useModalStore((state) => state.openModal);

  const upsert = (splitTimes: Time[], newTime: Time): Time[] => {
    const index = splitTimes.findIndex(
      (time) => time.date.split('T')[0] === newTime.date.split('T')[0],
    );
    if (index !== -1) {
      const newSplitTimes = [...splitTimes];
      newSplitTimes[index].timeSpent += newTime.timeSpent;
      return newSplitTimes;
    }
    return [...splitTimes, newTime];
  };

  const handleStart = () => {
    if (timerId) {
      setPauseTime(pauseTime + Date.now() - new Date(pauseTimeISOString).getTime());
      setPauseTimeISOString('');
      setPause(false);
      setRestartTime(new Date().toISOString());
    } else {
      openModal();
    }
  };

  const handlePause = async () => {
    const data = await requestGetTodoList();
    const splitTimes = data.splitTimes;
    const newSplitTimes = upsert(splitTimes, {
      date: new Date().toISOString(),
      timeSpent: Date.now() - new Date(restartTime).getTime(),
    });

    await requestUpdateTodoList(timerId, { splitTimes: newSplitTimes });

    setPause(true);
    setPauseTimeISOString(new Date().toISOString());
    setLastUpdateTime(new Date().toISOString());
  };

  const handleDelete = async () => {
    if (timerId) {
      await requestDeleteTodoList(timerId);
      useTimerStore.getState().reset();
    }
  };

  return { timerId, pause, handleStart, handlePause, handleDelete };
};
