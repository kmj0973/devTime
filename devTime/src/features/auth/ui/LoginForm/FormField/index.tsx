import type { FieldErrors, FieldPath, UseFormRegister } from 'react-hook-form';

interface FormValues {
  email: string;
  password: string;
}

interface FormFieldProps<T extends FormValues> {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export default function FormField({
  name,
  label,
  placeholder,
  register,
  errors,
}: FormFieldProps<FormValues>) {
  return (
    <div className='flex flex-col w-[328px] mb-5'>
      <label htmlFor={name} className='text-body-s-m text-gray-600 mb-2'>
        {label}
      </label>
      <input
        {...register(name)}
        id={name}
        type={name === 'password' ? 'password' : 'text'}
        className={`${errors[name] ? 'border border-negative' : ''} w-full h-11 px-4 py-3 mb-2 rounded-[5px] bg-gray-50 text-body-m placeholder:text-gray-300 focus:outline-none`}
        placeholder={placeholder}
      />
      {errors[name] ? (
        <div className='text-caption-m text-negative'>{errors[name]?.message as string}</div>
      ) : (
        <div className='h-4' />
      )}
    </div>
  );
}
