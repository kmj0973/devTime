import { useState } from 'react';
import {
  Controller,
  get,
  type Control,
  type FieldErrors,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';
import { requestCreateTechStacks, requestGetTechStacks } from '../../api/requests';
import DeleteTech from '../svg/DeleteTechSVG';

type SelectFieldType<
  T extends {
    techStacks: string[];
  },
> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  selectItems: string[];
  errors: FieldErrors<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
};

type techStack = {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};

export default function TechStackField<
  T extends {
    techStacks: string[];
  },
>(props: SelectFieldType<T>) {
  const [techStacks, setTechStacks] = useState<techStack[]>([]);
  const [techStackInput, setTechStackInput] = useState('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const error = get(props.errors, props.name);

  const getTechStacks = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const response = await requestGetTechStacks(e.target.value);
    setTechStackInput(e.target.value);
    setTechStacks(response.results);
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <div className='flex flex-col mb-6 w-full'>
          <label htmlFor={props.name} className='text-body-s-m text-gray-600 mb-2'>
            {props.label}
          </label>
          <div
            className='relative w-full'
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setIsFocused(false);
              }
            }}
          >
            <input
              onChange={getTechStacks}
              onFocus={() => setIsFocused(true)}
              id={props.name}
              type='text'
              placeholder={props.placeholder}
              className={`${error ? 'border border-negative' : ''} w-full h-11 px-4 py-3 rounded-[5px] bg-gray-50 text-body-m text-gray-800 placeholder:text-gray-300 focus:outline-none`}
            />
            {techStacks && isFocused && techStackInput.length > 0 && (
              <div className='absolute bg-white z-10 top-13 w-full max-h-48 flex flex-col border border-gray-300 rounded-[5px] py-4 px-3 gap-4 overflow-y-auto overflow-x-hidden'>
                {techStacks.map((techStack, index) => (
                  <div
                    key={index}
                    tabIndex={0}
                    onClick={() => {
                      if (!field.value.includes(techStack.name)) {
                        field.onChange([...field.value, techStack.name]);
                      }
                      setIsFocused(false);
                    }}
                    className='w-full h-9'
                  >
                    {techStack.name.split('').map((word, index) => {
                      const lowerTech = techStackInput.toLowerCase();

                      if (lowerTech.includes(word.toLowerCase())) {
                        return (
                          <span key={index} className='text-body-s text-gray-800'>
                            {word}
                          </span>
                        );
                      } else {
                        return (
                          <span key={index} className='text-body-r text-gray-500'>
                            {word}
                          </span>
                        );
                      }
                    })}
                  </div>
                ))}
                <div
                  tabIndex={0}
                  onClick={async () => {
                    await requestCreateTechStacks(techStackInput);
                    const prev = field.value ?? [];

                    field.onChange([...prev, techStackInput]);
                    setIsFocused(false);
                  }}
                  className='text-body-s text-secondary-indigo cursor-pointer'
                >
                  + Add New Item
                </div>
              </div>
            )}
          </div>

          <div className='flex flex-wrap gap-2 w-full mt-2'>
            {Array.isArray(field.value) &&
              field.value?.map((tech, index) => (
                <div
                  key={index}
                  className='flex justify-center items-center gap-2 w-auto h-11 text-body-s-s text-primary bg-primary-10 border border-primary rounded-[5px] p-3'
                >
                  <div>{tech}</div>
                  <div
                    onClick={() => {
                      if (!Array.isArray(field.value)) return;
                      const prev = field.value?.filter((value) => value != tech) ?? [];

                      field.onChange([...prev]);
                    }}
                  >
                    <DeleteTech />
                  </div>
                </div>
              ))}
          </div>

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
