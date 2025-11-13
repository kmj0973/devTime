import { requestLogin, requestLogout, requestProfileData } from '../api/requests';
import useAuthStore from '@/shared/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useModalStore from '@/shared/store/useModalStroe';

export function useAuth() {
  const navigate = useNavigate();
  const { openModal, isModalOpen } = useModalStore();
  const { setAccessToken, setRefreshToken, setUser, setIsLogined, accessToken, logout } =
    useAuthStore();
  const [isDuplicate, setIsDuplicate] = useState(false);

  const onLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await requestLogin(data);
      if (!response.success) throw new Error('Login failed');

      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      setIsLogined(true);

      const profile = await requestProfileData(response.accessToken);
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
      if (!accessToken) return;
      await requestLogout(accessToken);
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      logout();
    }
  };

  return { onLogin, onLogout, isDuplicate, isModalOpen };
}
