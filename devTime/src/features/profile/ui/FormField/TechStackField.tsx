import { useState } from 'react';
import { Controller, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form';
import type { ProfileFormFields } from '../../model/schema';
import { requestGetTechStacks } from '../../api/requests';

type SelectFieldType = {
  name: 'techStacks';
  label: string;
  placeholder: string;
  selectItems: string[];
  errors: FieldErrors<ProfileFormFields>;
  control: Control<ProfileFormFields>;
  register: UseFormRegister<ProfileFormFields>;
};

type techStack = {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

export default function TechStackField(props: SelectFieldType) {
  const [techStacks, setTechStacks] = useState<techStack[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const error = props.errors[props.name];

  const getTechStacks = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const response = await requestGetTechStacks(e.target.value);

    setTechStacks(response.results);
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <div className='flex flex-col mb-6'>
          <label htmlFor={props.name} className='text-body-s-m text-gray-600 mb-2'>
            {props.label}
          </label>
          <div className='relative w-[420px]'>
            <input
              {...props.register('techStackInput')}
              onChange={(e) => getTechStacks(e)}
              onFocus={() => setIsFocused(true)}
              id={props.name}
              type='text'
              placeholder={props.placeholder}
              className={`${error ? 'border border-negative' : ''} w-[420px] h-11 px-4 py-3 rounded-[5px] bg-gray-50 text-body-m text-gray-600 placeholder:text-gray-300 focus:outline-none`}
            />
            {techStacks.length > 0 && isFocused && (
              <div className='absolute bg-white z-10 top-13 w-full max-h-48 flex flex-col border border-gray-300 rounded-[5px] py-4 px-3 gap-4 overflow-y-auto overflow-x-hidden'>
                {techStacks.map((techStack, index) => {
                  if (index != techStacks.length - 1) {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          const prev = field.value ?? [];

                          if (!prev.includes(techStack.name)) {
                            field.onChange([...prev, techStack.name]);
                          }

                          setIsFocused(false);
                        }}
                        className='text-gray-600 w-[396px] h-9 border-b'
                      >
                        {techStack.name}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        const prev = field.value ?? [];

                        if (!prev.includes(techStack.name)) {
                          field.onChange([...prev, techStack.name]);
                        }

                        setIsFocused(false);
                      }}
                      className='text-gray-600 w-[396px] h-5'
                    >
                      {techStack.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {(field.value ?? []).map((tech: string) => (
            <div key={tech} className='flex items-center bg-blue-100 px-2 py-1 rounded'>
              <span>{tech}</span>
              <button
                type='button'
                onClick={() => field.onChange(field.value.filter((t: string) => t !== tech))}
                className='ml-2 text-sm'
              >
                ✕
              </button>
            </div>
          ))}

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
