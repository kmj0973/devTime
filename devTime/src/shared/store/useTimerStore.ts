import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TimerStore {
  timerId: string;
  studyLogId: string;
  todayGoal: string;
  startTime: string;
  restartTime: string;
  pauseTime: number;
  pauseTimeISOString: string;
  lastUpdateTime: string;
  pause: boolean;

  initTimer: (data: {
    timerId: string;
    studyLogId: string;
    todayGoal: string;
    startTime: string;
    restartTime: string;
    lastUpdateTime: string;
    pause: boolean;
  }) => void;
  setTimerId: (id: string) => void;
  setStudyLogId: (id: string) => void;
  setTodayGoal: (goal: string) => void;
  setStartTime: (time: string) => void;
  setRestartTime: (time: string) => void;
  setPauseTime: (time: number) => void;
  setPauseTimeISOString: (time: string) => void;
  setLastUpdateTime: (time: string) => void;
  setPause: (pause: boolean) => void;

  reset: () => void;
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set) => ({
      timerId: '',
      studyLogId: '',
      todayGoal: '',
      startTime: '',
      restartTime: '',
      pauseTime: 0,
      pauseTimeISOString: '',
      lastUpdateTime: '',
      pause: false,

      initTimer: (data) =>
        set({
          timerId: data.timerId,
          studyLogId: data.studyLogId,
          todayGoal: data.todayGoal,
          startTime: data.startTime,
          restartTime: data.startTime,
          lastUpdateTime: data.startTime,
          pause: false,
        }),
      setTimerId: (id: string) => set({ timerId: id }),
      setStudyLogId: (id: string) => set({ studyLogId: id }),
      setTodayGoal: (goal: string) => set({ todayGoal: goal }),
      setStartTime: (time: string) => set({ startTime: time }),
      setRestartTime: (time: string) => set({ restartTime: time }),
      setPauseTime: (time: number) => set({ pauseTime: time }),
      setPauseTimeISOString: (time: string) => set({ pauseTimeISOString: time }),
      setLastUpdateTime: (time: string) => set({ lastUpdateTime: time }),
      setPause: (pause: boolean) => set({ pause }),

      reset: () =>
        set({
          timerId: '',
          studyLogId: '',
          todayGoal: '',
          startTime: '',
          restartTime: '',
          pauseTime: 0,
          pauseTimeISOString: '',
          lastUpdateTime: '',
          pause: false,
        }),
    }),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
