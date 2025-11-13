import { useForm, type SubmitHandler } from 'react-hook-form';
import { loginFormSchema, type LoginFormFields } from '../model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import useModalStore from '@/shared/store/useModalStroe';
import useAuthStore from '@/shared/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { requestLogin, requestProfileData } from '../api/requests';
import { useState } from 'react';

export default function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginFormFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const openModal = useModalStore((state) => state.openModal);

  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
  const setIsLogined = useAuthStore((state) => state.setIsLogined);
  const setUser = useAuthStore((state) => state.setUser);

  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const response = await requestLogin(data);

      if (!response.success) {
        throw Error('Login failed');
      }

      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      setIsLogined(true);

      const profile = await requestProfileData(response.accessToken);

      if (profile) {
        setUser({ email: profile.email, nickname: profile.nickname });
      }

      if (response.isDuplicateLogin) {
        setIsDuplicate(true);
        openModal();
      } else {
        navigate('/');
      }
      //if(response.isFirstLogin) { 프로필 설정 페이지로 옮기기 }
    } catch (err) {
      console.log(err);
      openModal();
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    isValid,
    errors,
    isDuplicate,
    isModalOpen,
  };
}
