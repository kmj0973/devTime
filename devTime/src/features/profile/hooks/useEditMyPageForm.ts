import useAuthStore from '@/shared/store/useAuthStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { requestFileUpload, requestUpdateProfile } from '../api/requests';
import { editMyPageFormSchema, type EditMyPageFormFields } from '../model/schema';
import { useCallback, useEffect, useState } from 'react';
import { requestNicknameCheck } from '@/features/signup/api/requests';

export const useEditMyPageForm = () => {
  const {
    watch,
    control,
    trigger,
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<EditMyPageFormFields>({
    defaultValues: {
      nickname: '',
      password: '',
      confirmPassword: '',
      career: '',
      goal: '',
      techStacks: [],
      profileImage: undefined,
    },
    resolver: zodResolver(editMyPageFormSchema),
    mode: 'onChange',
    shouldUnregister: true,
  });

  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const nickname = watch('nickname');

  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  useEffect(() => {
    setIsNicknameChecked(false);
  }, [nickname]);

  const handleNicknameCheck = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const isValidNickname = await trigger('nickname');
      if (!isValidNickname) return;

      const response = await requestNicknameCheck(nickname);
      if (response.available) {
        setIsNicknameChecked(true);
        clearErrors('nickname');
      } else {
        setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
      }
    },
    [nickname, trigger, clearErrors, setError],
  );

  const onCheckNickname = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (errors.nickname) return;
      if (!isNicknameChecked && nickname) {
        setError('nickname', { type: 'duplicate', message: '중복 확인을 해주세요.' });
      }
    },
    [nickname, isNicknameChecked, errors.nickname, setError],
  );

  const onSubmit: SubmitHandler<EditMyPageFormFields> = async (data) => {
    //나머지 데이터 재포장하고
    //url post해서 받아온 url로 또 fetch한 후에 profile post하기
    try {
      const newData = {
        nickname: data.nickname,
        career: data.career,
        purpose: user?.profile.purpose || '',
        goal: data.goal,
        techStacks: data.techStacks,
        profileImage: data.profileImage,
        password: data.password,
      };
      const ImageName = data.profileImage[0].name;
      const ImageType = data.profileImage[0].type;

      const results = await requestFileUpload({
        fileName: ImageName,
        contentType: ImageType,
      });

      const presignedUrl = results.presignedUrl;
      const key = results.key;

      await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': ImageType,
        },
        body: data.profileImage[0], // 사용자가 직접 업로드 한 이미지 파일 데이터
      });

      await requestUpdateProfile({ ...newData, profileImage: key });
      if (user)
        setUser({
          ...user,
          nickname: newData.nickname,
          profile: { ...newData, profileImage: key },
        });

      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    watch,
    control,
    register,
    handleSubmit,
    onSubmit,
    isValid,
    errors,
    nickname,
    isNicknameChecked,
    handleNicknameCheck,
    onCheckNickname,
  };
};
