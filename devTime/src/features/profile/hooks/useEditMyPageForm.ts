import useAuthStore from '@/shared/store/useAuthStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { requestCreateProfile, requestFileUpload, requestUpdateProfile } from '../api/requests';
import { editMyPageFormSchema, type EditMyPageFormFields } from '../model/schema';
import { useCallback, useEffect, useState } from 'react';
import { requestNicknameCheck } from '@/features/signup/api/requests';

export const useEditMyPageForm = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

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
      nickname: user?.nickname || '',
      password: '',
      confirmPassword: '',
      career: user?.profile?.career || '',
      goal: user?.profile?.goal || '',
      purpose: user?.profile?.purpose || '',
      purposeContent: '',
      techStacks: user?.profile?.techStacks || [],
      profileImage: '',
    },
    resolver: zodResolver(editMyPageFormSchema),
    mode: 'onChange',
    shouldUnregister: true,
  });
  const nickname = watch('nickname');
  const purpose = watch('purpose');
  const originalNickname = user?.nickname;
  const isNicknameChanged = nickname !== originalNickname;

  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  useEffect(() => {
    if (isNicknameChanged) {
      setIsNicknameChecked(false);
    } else {
      setIsNicknameChecked(true);
    }
  }, [nickname, isNicknameChanged]);

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

  const onCheckNickname = useCallback(() => {
    if (!isNicknameChanged) return;
    if (!isNicknameChecked && nickname) {
      setError('nickname', { type: 'duplicate', message: '중복 확인을 해주세요.' });
    }
  }, [nickname, isNicknameChecked, isNicknameChanged, setError]);

  const onSubmit: SubmitHandler<EditMyPageFormFields> = async (data) => {
    onCheckNickname();
    try {
      const newData = {
        nickname: data.nickname,
        career: data.career,
        purpose: data.purpose,
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

      if (user?.profile) {
        await requestUpdateProfile({
          career: newData.career,
          purpose: newData.purpose,
          goal: newData.goal,
          techStacks: newData.techStacks,
          password: newData.password,
          profileImage: key,
          ...(isNicknameChanged && { nickname: newData.nickname }),
        });
      } else if (!user?.profile) {
        await requestCreateProfile({
          career: newData.career,
          purpose: newData.purpose,
          goal: newData.goal,
          techStacks: newData.techStacks,
          profileImage: key,
        });
        await requestUpdateProfile({
          career: newData.career,
          purpose: newData.purpose,
          goal: newData.goal,
          techStacks: newData.techStacks,
          password: newData.password,
          profileImage: key,
          ...(isNicknameChanged && { nickname: newData.nickname }),
        });
      }

      if (user)
        setUser({
          ...user,
          ...(isNicknameChanged && { nickname: data.nickname }),
          profile: {
            career: newData.career,
            purpose: newData.purpose,
            goal: newData.goal,
            techStacks: newData.techStacks,
            profileImage: key,
          },
        });

      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    purpose,
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
