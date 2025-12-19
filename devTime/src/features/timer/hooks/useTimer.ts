// src/features/timer/hooks/useTimer.ts
import { useTimerStore } from '@/shared/store/useTimerStore';
import { requestGetTimer, requestUpdateTimer, requestDeleteTimer } from '../api/requests';
import type { Time } from '../model/types';
import useAuthStore from '@/shared/store/useAuthStore';
import useModalStore from '@/shared/store/useModalStroe';

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

  const isLogined = useAuthStore((state) => state.isLogined);
  const openModal = useModalStore((state) => state.openModal);

  const upsert = (splitTimes: Time[], newTime: Time): Time[] => {
    const index = splitTimes.findIndex(
      (time) => time.date.split('T')[0] === newTime.date.split('T')[0],
    );

    const newSplitTimes = splitTimes.map((t) => ({ ...t })); // 깊은 복사

    if (index !== -1) {
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
      if (isLogined) openModal('timerStart');
      else openModal('loginRequired');
    }
  };

  const handlePause = async () => {
    const data = await requestGetTimer();
    const splitTimes = data.splitTimes;
    const newSplitTimes = upsert(splitTimes, {
      date: new Date().toISOString(),
      timeSpent: Date.now() - new Date(restartTime).getTime(),
    });

    await requestUpdateTimer(timerId, { splitTimes: newSplitTimes });

    setPause(true);
    setPauseTimeISOString(new Date().toISOString());
    setLastUpdateTime(new Date().toISOString());
  };

  const handleDelete = async () => {
    if (timerId) {
      await requestDeleteTimer(timerId);
      useTimerStore.getState().reset();
    }
  };

  const handleReview = async () => {
    openModal('review');
  };

  return { timerId, pause, handleStart, handlePause, handleDelete, handleReview };
};
