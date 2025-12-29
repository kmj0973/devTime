import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileFormSchema, type ProfileFormFields } from '../model/schema';

export const useProfileForm = () => {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileFormFields>({
    defaultValues: {
      career: '',
      purpose: '',
      purposeContent: '',
      // goal: '',
      // techStacks: [],
      // profileImage: '',
    },
    resolver: zodResolver(profileFormSchema),
    mode: 'onBlur',
    shouldUnregister: true,
  });

  const purpose = watch('purpose');

  const onSubmit = () => {};

  return { purpose, control, register, handleSubmit, onSubmit, isValid, errors };
};
