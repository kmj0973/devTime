import { useForm, type SubmitHandler } from 'react-hook-form';
import { signupFormSchema, type SignUpFormFields } from '../model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestEmailCheck, requestNicknameCheck, requestSignUp } from '../api/requests';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = useForm<SignUpFormFields>({
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      accept: false,
    },
    resolver: zodResolver(signupFormSchema),
    mode: 'onChange',
  });
  const [email, nickname, accept] = watch(['email', 'nickname', 'accept']);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsEmailChecked(false);
  }, [email]);

  useEffect(() => {
    setIsNicknameChecked(false);
  }, [nickname]);

  const handleEmailCheck = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const isValidEmail = await trigger('email');
      if (!isValidEmail) return;

      const response = await requestEmailCheck(email);
      if (response.available) {
        setIsEmailChecked(true);
        clearErrors('email');
      } else {
        setError('email', { message: '이미 사용 중인 이메일입니다.' });
      }
    },
    [email, trigger, clearErrors, setError],
  );

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

  const onCheckEmail = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (errors.email) return;
      if (!isEmailChecked && email) {
        setError('email', { type: 'duplicate', message: '중복 확인을 해주세요.' });
      }
    },
    [email, isEmailChecked, errors.email, setError],
  );

  const onCheckNickname = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      e.preventDefault();
      console.log('hi');
      if (errors.nickname) return;
      if (!isNicknameChecked && nickname) {
        setError('nickname', { type: 'duplicate', message: '중복 확인을 해주세요.' });
      }
    },
    [nickname, isNicknameChecked, errors.nickname, setError],
  );

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    let hasError = false;

    if (!isEmailChecked) {
      setError('email', { type: 'duplicate', message: '중복 확인을 해주세요.' });
      hasError = true;
    }

    if (!isNicknameChecked) {
      setError('nickname', { type: 'duplicate', message: '중복 확인을 해주세요.' });
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await requestSignUp(data);
      if (response.success) {
        console.log('회원가입성공');
        navigate('/login');
      } else {
        console.log('회원가입 실패:', response.message);
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
    }
  };

  return {
    register,
    handleSubmit,
    isValid,
    errors,
    email,
    nickname,
    accept,
    isEmailChecked,
    isNicknameChecked,
    handleEmailCheck,
    handleNicknameCheck,
    onCheckEmail,
    onCheckNickname,
    onSubmit,
  };
};
