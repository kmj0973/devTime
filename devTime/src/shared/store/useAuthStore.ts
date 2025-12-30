import type { ProfileType } from '@/features/profile/model/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserInfo {
  email: string;
  nickname: string;
  profile: ProfileType;
}

interface AuthStore {
  isLogined: boolean;
  accessToken?: string;
  refreshToken?: string;

  user?: UserInfo;

  setIsLogined: (value: boolean) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setUser: (user: UserInfo) => void;

  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLogined: false,
      accessToken: undefined,
      refreshToken: undefined,
      setIsLogined: (value) => set({ isLogined: value }),
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      setUser: (user) => set({ user }),
      logout: () =>
        set({ isLogined: false, accessToken: undefined, refreshToken: undefined, user: undefined }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
