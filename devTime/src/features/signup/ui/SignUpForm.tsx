import { Link } from 'react-router-dom';
import Caption from './Caption';
import { useForm, type SubmitHandler } from 'react-hook-form';

type FormFields = {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
  accept: boolean;
};

export default function SignUpForm() {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex-1 flex flex-col justify-center items-center'
    >
      <div className='text-heading-b text-primary mb-9'>회원가입</div>
      <div className='flex flex-col mb-10'>
        <label htmlFor='이메일' className='text-body-s-m text-gray-600 mb-2'>
          아이디
        </label>
        <div className='flex gap-3'>
          <input
            {...register('email')}
            id='이메일'
            type='text'
            placeholder='이메일 주소 형식으로 입력해 주세요.'
            className='w-[324px] h-11 px-4 py-3 rounded-[5px] bg-gray-50 text-body-m text-gray-600 placeholder:text-gray-300'
          />
          <button className='h-11 px-4 py-3 rounded-[5px] bg-gray-200 text-body-s-s text-gray-400'>
            중복 확인
          </button>
        </div>
      </div>
      <div className='flex flex-col mb-10'>
        <label htmlFor='닉네임' className='text-body-s-m text-gray-600 mb-2'>
          닉네임
        </label>
        <div className='flex gap-3'>
          <input
            {...register('nickname')}
            id='닉네임'
            type='text'
            placeholder='닉네임을 입력해 주세요.'
            className='w-[324px] h-11 px-4 py-3 rounded-[5px] bg-gray-50 text-body-m text-gray-600 placeholder:text-gray-300'
          />
          <button className='h-11 px-4 py-3 rounded-[5px] bg-gray-200 text-body-s-s text-gray-400'>
            중복 확인
          </button>
        </div>
      </div>
      <div className='flex flex-col mb-10'>
        <label htmlFor='비밀번호' className='text-body-s-m text-gray-600 mb-2'>
          비밀번호
        </label>
        <input
          {...register('password')}
          id='비밀번호'
          type='password'
          placeholder='비밀번호를 입력해 주세요.'
          className='w-[423px] h-11 px-4 py-3 rounded-[5px] bg-gray-50 text-body-m text-gray-600 placeholder:text-gray-300'
        />
      </div>
      <div className='flex flex-col mb-15'>
        <label htmlFor='비밀번호 확인' className='text-body-s-m text-gray-600 mb-2'>
          비밀번호 확인
        </label>
        <input
          {...register('checkPassword')}
          id='비밀번호 확인'
          type='password'
          placeholder='비밀번호를 다시 입력해 주세요.'
          className='w-[423px] h-11 px-4 py-3 rounded-[5px] bg-gray-50 text-body-m text-gray-600 placeholder:text-gray-300'
        />
      </div>
      <div className='flex flex-col mb-9'>
        <div className='flex justify-between items-center mb-2'>
          <label htmlFor='이용약관' className='text-body-s-m text-gray-600'>
            이용약관
          </label>
          <div className='flex justify-center items-center gap-1'>
            <div className='text-body-s-m text-primary/30'>동의함</div>
            <input
              {...register('accept')}
              type='checkbox'
              className='w-4 h-4 appearance-none rounded-[5px] border border-primary checked:appearance-auto'
            />
          </div>
        </div>
        <Caption />
      </div>
      <button
        type='submit'
        className='w-[423px] h-12 bg-gray-400 rounded-[5px] text-gray-300 text-subtitle-s mb-6 cursor-pointer'
      >
        회원가입
      </button>
      <div className='text-body-r text-primary'>
        회원이신가요?
        <Link to='/login' className='text-body-b ml-3'>
          로그인 바로가기
        </Link>
      </div>
    </form>
  );
}
