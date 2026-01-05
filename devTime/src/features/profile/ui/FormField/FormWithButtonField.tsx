import React from 'react';
import { type FieldErrors, type UseFormRegister, type FieldPath, get } from 'react-hook-form';
import type { EditMyPageFormFields } from '../../model/schema';

interface FormFieldProps<T extends EditMyPageFormFields> {
  name: FieldPath<T>;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  value?: string;
  onCheck?: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleCheck?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  isChecked?: boolean;
  showCheckButton?: boolean;
}

export const FormWithButtonField = <T extends EditMyPageFormFields>({
  name,
  label,
  register,
  errors,
  placeholder,
  value,
  onCheck,
  handleCheck,
  isChecked = false,
  showCheckButton = false,
}: FormFieldProps<T>) => {
  const error = get(errors, name);

  return (
    <div className='flex flex-col mb-6'>
      <label htmlFor={name} className='text-body-s-m text-gray-600 mb-2'>
        {label}
      </label>

      <div className={showCheckButton ? 'flex gap-3 mb-2' : ''}>
        <input
          {...register(name)}
          {...(onCheck && { onBlur: onCheck })}
          id={name}
          type={name === 'password' || name === 'confirmPassword' ? 'password' : 'text'}
          placeholder={placeholder}
          className={`${error ? 'border border-negative' : ''} ${
            showCheckButton ? 'w-[432px]' : 'w-[423px]'
          } h-11 px-4 py-3 rounded-[5px] bg-gray-50 text-body-m text-gray-600 placeholder:text-gray-300 focus:outline-none`}
        />
        {showCheckButton && (
          <button
            type='button'
            onClick={handleCheck}
            disabled={error?.type !== 'duplicate'}
            className={`w-22 h-11 px-4 py-3 rounded-[5px] ${
              error?.type === 'duplicate' && 'bg-primary-10 text-primary'
            } ${
              !error && value ? 'bg-primary-10 text-primary' : 'bg-gray-200 text-gray-400'
            } text-body-s-s cursor-pointer`}
          >
            중복 확인
          </button>
        )}
      </div>

      {error ? (
        <div className='text-caption-m text-negative'>{error.message as string}</div>
      ) : isChecked ? (
        <div className='text-caption-m text-positive'>사용 가능한 {label}입니다.</div>
      ) : (
        <div className='h-4' />
      )}
    </div>
  );
};
