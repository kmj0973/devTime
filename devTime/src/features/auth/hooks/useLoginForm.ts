import { useForm, type SubmitHandler } from 'react-hook-form';
import { loginFormSchema, type LoginFormFields } from '../model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from './useAuth';

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

  const { onLogin, isDuplicate, isModalOpen } = useAuth();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    await onLogin(data);
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
