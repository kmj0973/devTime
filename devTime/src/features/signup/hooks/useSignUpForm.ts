import { useForm, type SubmitHandler } from 'react-hook-form';
import { signupFormSchema, type SignUpFormFields } from '../model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestSignUp } from '../api/requests';

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
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

  const handleEmailCheck = async () => {
    console.log('email check');
  };
  const handleEmailNickname = async () => {
    console.log('nickname check');
  };

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    await requestSignUp(data);
  };

  return {
    register,
    handleSubmit,
    isValid,
    errors,
    email,
    nickname,
    accept,
    handleEmailCheck,
    handleEmailNickname,
    onSubmit,
  };
};
