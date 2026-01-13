// src/features/timer/hooks/useTimer.ts
import { useTimerStore } from '@/shared/store/useTimerStore';
import useAuthStore from '@/shared/store/useAuthStore';
import useModalStore from '@/shared/store/useModalStroe';
import splitTimeByDate from '../util/splitTimeByDate';
import mergeSplitTimes from '../util/mergeSplitTimes';
import { useTimerQuery } from '../queries/useTimerQuery';

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
  } = useTimerStore();

  const isLogined = useAuthStore((state) => state.isLogined);
  const openModal = useModalStore((state) => state.openModal);

  const { refetch, updateTimer, deleteTimer } = useTimerQuery();

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
    const now = Date.now();

    // 이번 세션 공부 시간 날짜별 분리
    const segments = splitTimeByDate(new Date(restartTime).getTime(), now);

    // 서버 기존 데이터 가져오기
    const { data } = await refetch();
    const original = data.splitTimes;

    // 기존 + 신규 segment 병합
    const newSplitTimes = mergeSplitTimes(original, segments);
    // 서버에 저장
    updateTimer({ timerId, payload: newSplitTimes });

    // 클라이언트 상태 갱신
    setPause(true);
    setPauseTimeISOString(new Date().toISOString());
  };

  const handleDelete = async () => {
    if (timerId) {
      deleteTimer(timerId);
      useTimerStore.getState().reset();
    }
  };

  const handleReview = async () => {
    if (!pause) {
      await handlePause();
    }

    openModal('review');
  };

  return { timerId, pause, handleStart, handlePause, handleDelete, handleReview };
};
