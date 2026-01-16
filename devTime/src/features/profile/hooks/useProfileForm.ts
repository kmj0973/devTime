import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileFormSchema, type ProfileFormFields } from '../model/schema';
import { requestFileUpload } from '../api/requests';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/shared/store/useAuthStore';
import { useProfileQuery } from '../queries/useProfileQuery';

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
      goal: '',
      techStacks: [],
      profileImage: undefined,
    },
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    shouldUnregister: true,
  });

  const { createProfile } = useProfileQuery();

  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const purpose = watch('purpose');

  const onSubmit: SubmitHandler<ProfileFormFields> = async (data) => {
    //나머지 데이터 재포장하고
    //url post해서 받아온 url로 또 fetch한 후에 profile post하기
    try {
      const newData = {
        career: data.career,
        purpose: data.purpose,
        goal: data.goal,
        techStacks: data.techStacks,
        profileImage: data.profileImage,
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

      await createProfile({ ...newData, profileImage: key });
      if (user) setUser({ ...user, profile: { ...newData, profileImage: key } });

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
  };
};
