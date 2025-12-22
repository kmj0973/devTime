// src/features/timer/hooks/useTimer.ts
import { useTimerStore } from '@/shared/store/useTimerStore';
import { requestGetTimer, requestUpdateTimer, requestDeleteTimer } from '../api/requests';
import useAuthStore from '@/shared/store/useAuthStore';
import useModalStore from '@/shared/store/useModalStroe';
import splitTimeByDate from '../util/splitTimeByDate';
import mergeSplitTimes from '../util/mergeSplitTimes';

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

    // 1. 이번 세션 공부 시간 날짜별 분리
    const segments = splitTimeByDate(new Date(restartTime).getTime(), now);

    // 2. 서버 기존 데이터 가져오기
    const data = await requestGetTimer();
    const original = data.splitTimes;

    // 3. 기존 + 신규 segment 병합
    const newSplitTimes = mergeSplitTimes(original, segments);
    console.log(newSplitTimes);

    // 4. 서버에 저장
    await requestUpdateTimer(timerId, { splitTimes: newSplitTimes });

    // 5. 클라이언트 상태 갱신
    setPause(true);
    setPauseTimeISOString(new Date().toISOString());
  };

  const handleDelete = async () => {
    if (timerId) {
      await requestDeleteTimer(timerId);
      useTimerStore.getState().reset();
    }
  };

  const handleReview = async () => {
    await handlePause();

    openModal('review');
  };

  return { timerId, pause, handleStart, handlePause, handleDelete, handleReview };
};
