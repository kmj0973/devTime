import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { ProfileFormFields } from '../../model/schema';

interface FormFieldProps {
  name: 'goal';
  label: string;
  register: UseFormRegister<ProfileFormFields>;
  errors: FieldErrors<ProfileFormFields>;
  placeholder?: string;
  value?: string;
}

export const FormField = ({ name, label, register, errors, placeholder }: FormFieldProps) => {
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
          type='text'
          placeholder={placeholder}
          className={`${error ? 'border border-negative' : ''} w-[420px] h-11 px-4 py-3 rounded-[5px] bg-gray-50 text-body-m text-gray-600 placeholder:text-gray-300 focus:outline-none`}
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
