import type { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

interface FormFieldProps<T extends { profileImage?: FileList | null }> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  value?: string;
  edit?: boolean;
}

export const FormField = <T extends { profileImage?: FileList | null }>({
  name,
  label,
  register,
  errors,
  placeholder,
  edit = false,
}: FormFieldProps<T>) => {
  const error = errors[name];

  return (
    <div className='flex flex-col mb-6'>
      <label htmlFor={name} className='text-body-s-m text-gray-600 mb-2'>
        {label}
      </label>

      <div className=''>
        <input
          {...register(name)}
          id={name}
          type={name === 'password' || name === 'confirmPassword' ? 'password' : 'text'}
          placeholder={placeholder}
          className={`${error ? 'border border-negative' : ''} ${edit ? 'w-full' : 'w-[420px]'} h-11 px-4 py-3 rounded-[5px] bg-gray-50 text-body-m text-gray-600 mb-2 placeholder:text-gray-300 focus:outline-none`}
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
