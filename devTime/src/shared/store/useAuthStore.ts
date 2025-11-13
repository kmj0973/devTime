import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserInfo {
  email: string;
  nickname: string;
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

  getAccessToken: () => string | undefined;
  getRefreshToken: () => string | undefined;
  getUser: () => UserInfo | undefined;

  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isLogined: false,
      accessToken: undefined,
      refreshToken: undefined,
      setIsLogined: (value) => set({ isLogined: value }),
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      setUser: (user) => set({ user }),
      getAccessToken: () => get().accessToken,
      getRefreshToken: () => get().refreshToken,
      getUser: () => get().user,
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
