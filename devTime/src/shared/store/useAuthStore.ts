import { create } from 'zustand';

type AuthStore = {
  isLogined: boolean;
  setIsLogined: (value: boolean) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  isLogined: false,
  setIsLogined: (value: boolean) => set({ isLogined: value }),
}));

export default useAuthStore;
