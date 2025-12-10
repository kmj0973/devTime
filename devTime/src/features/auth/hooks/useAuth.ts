import { requestLogin, requestLogout, requestProfileData } from '../api/requests';
import useAuthStore from '@/shared/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useModalStore from '@/shared/store/useModalStroe';
import { useTimerStore } from '@/shared/store/useTimerStore';

export function useAuth() {
  const navigate = useNavigate();
  const { openModal, isModalOpen } = useModalStore();
  const { reset } = useTimerStore();
  const { setAccessToken, setRefreshToken, setUser, setIsLogined, logout } = useAuthStore();
  const [isDuplicate, setIsDuplicate] = useState(false);

  const onLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await requestLogin(data);
      if (!response.success) throw new Error('Login failed');

      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      setIsLogined(true);

      const profile = await requestProfileData();
      if (profile) setUser(profile);

      if (response.isDuplicateLogin) {
        setIsDuplicate(true);
        openModal();
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      openModal();
    }
  };

  const onLogout = async () => {
    try {
      await requestLogout();
      console.log('로그아웃 성공');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      logout();
      reset();
    }
  };

  return { onLogin, onLogout, isDuplicate, isModalOpen };
}
