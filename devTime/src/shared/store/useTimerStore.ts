import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TimerStore {
  timerId: string;
  setTimerId: (id: string) => void;
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set) => ({
      timerId: '',
      setTimerId: (id: string) => set({ timerId: id }),
    }),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
