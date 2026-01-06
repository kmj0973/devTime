import { useState } from 'react';
import SelectArrowSVG from '../svg/SelectArrowSVG';
import {
  Controller,
  get,
  type Control,
  type FieldErrors,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';

type SelectFieldType<T extends { profileImage?: FileList | null; purposeContent?: string }> = {
  name: Path<T>;
  label: string;
  purpose: string | null;
  placeholder: string;
  selectItems: string[];
  errors: FieldErrors<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
};

export default function SelectField<
  T extends { profileImage?: FileList | null; purposeContent?: string },
>(props: SelectFieldType<T>) {
  const [isClicked, setIsClicked] = useState<string>('');

  const error = get(props.errors, props.name);
  //'test'
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <div className='flex flex-col mb-6'>
          <label htmlFor={props.name} className='text-body-s-m text-gray-600 mb-2'>
            {props.label}
          </label>
          <div className='relative w-full'>
            <div
              className={`${error ? 'border border-negative' : ''} flex justify-between items-center h-11 bg-gray-50 rounded-[5px] text-body-m text-gray-300 py-3 px-4 mb-2`}
            >
              <div className={`${field.value ? 'text-gray-600' : 'text-gray-300'}`}>
                {field.value ? (field.value as string) : props.placeholder}
              </div>
              <button
                onClick={() => {
                  if (isClicked == props.name) setIsClicked('');
                  else setIsClicked(props.name);
                }}
                className={`${isClicked == props.name && 'rotate-180'} transition-all`}
              >
                <SelectArrowSVG />
              </button>
            </div>
            {isClicked == props.name && (
              <div className='absolute bg-white z-10 top-13 w-full flex flex-col border border-gray-300 rounded-[5px] py-4 px-3 gap-4'>
                {props.selectItems.map((item, index) => {
                  if (index != props.selectItems.length - 1) {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          field.onChange(item);
                          setIsClicked('');
                        }}
                        className='text-gray-600 w-full h-9 border-b px-3'
                      >
                        {item}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        field.onChange(item);
                        setIsClicked('');
                      }}
                      className='text-gray-600 w-[396px] h-5'
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {props.purpose == '기타(직접 입력)' && (
            <input
              {...props.register('purposeContent' as Path<T>)}
              type='text'
              placeholder='목적을 입력해주세요'
              className='h-11 bg-gray-50 rounded-[5px] text-body-m text-gray-600 py-3 px-4 mt-2 mb-2'
            />
          )}
          {error ? (
            <div className='text-caption-m text-negative'>{error.message as string}</div>
          ) : (
            <div className='h-4' />
          )}
        </div>
      )}
    />
  );
}
