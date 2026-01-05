import {
  get,
  type FieldErrors,
  type Path,
  type UseFormRegister,
  type UseFormWatch,
} from 'react-hook-form';
import PlusImageSVG from '../svg/PlusImageSVG';
import { useEffect, useState } from 'react';

interface FormFieldProps<T extends { profileImage?: FileList | null }> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  value?: string;
}

export const ImageField = <T extends { profileImage?: FileList | null }>({
  name,
  watch,
  label,
  register,
  errors,
}: FormFieldProps<T>) => {
  const error = get(errors, name);
  const files = watch(name);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (files && files.length > 0) {
      const file = files[0];
      console.log(files);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [files]);

  return (
    <div className='flex flex-col mb-6 w-[420px]'>
      <label htmlFor={name} className='flex flex-col gap-2 text-body-s-m text-gray-600 mb-2'>
        {label}
        <div className='flex items-end gap-2'>
          <div
            className={`flex justify-center items-center w-30 h-30 
        bg-white ${!previewUrl && 'border border-dashed border-primary'} rounded-xl`}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt='미리보기'
                className='w-full h-full object-cover rounded-xl'
              />
            ) : (
              <PlusImageSVG />
            )}
          </div>

          <div className='text-body-s-m text-gray-500'>5MB 미만의 .png, .jpg 파일</div>
        </div>
      </label>

      <div className=''>
        <input
          {...register(name)}
          id={name}
          type='file'
          accept='image/png, image/jpeg'
          className={`hidden`}
        />
      </div>

      {error ? (
        <div className='text-caption-m text-negative'>{error.message as string}</div>
      ) : (
        <div className='h-4' />
      )}
    </div>
  );
};
