import { Link } from 'react-router-dom';
import Caption from './Caption';
import { useSignUpForm } from '../hooks/useSignUpForm';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    isValid,
    errors,
    email,
    nickname,
    accept,
    isEmailChecked,
    isNicknameChecked,
    handleEmailCheck,
    handleEmailNickname,
    onCheckEmail,
    onCheckNickname,
    onSubmit,
  } = useSignUpForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex-1 flex flex-col justify-center items-center'
    >
      <div className='text-heading-b text-primary mb-9'>회원가입</div>
      <div className='flex flex-col mb-6'>
        <label htmlFor='이메일' className='text-body-s-m text-gray-600 mb-2'>
          아이디
        </label>
        <div className='flex gap-3 mb-2'>
          <input
            {...register('email')}
            onBlur={onCheckEmail}
            id='이메일'
            type='text'
            placeholder='이메일 주소 형식으로 입력해 주세요.'
            className={`${errors.email && 'border border-negative'} w-[324px] h-11 px-4 py-3 rounded-[5px] bg-gray-50 text-body-m text-gray-600 placeholder:text-gray-300 focus:outline-none`}
          />
          <button
            onClick={handleEmailCheck}
            disabled={errors.email?.type !== 'duplicate'}
            className={`h-11 px-4 py-3 rounded-[5px] ${errors.email?.type === 'duplicate' && 'bg-primary-10 text-primary'} ${!errors.email && email ? 'bg-primary-10 text-primary' : 'bg-gray-200 text-gray-400'}  text-body-s-s cursor-pointer`}
          >
            중복 확인
          </button>
        </div>
        {errors.email ? (
          <div className='text-caption-m text-negative'>{errors.email?.message}</div>
        ) : isEmailChecked ? (
          <div className='text-caption-m text-positive'>사용 가능한 이메일입니다.</div>
        ) : (
          <div className='h-4'></div>
        )}
      </div>
      <div className='flex flex-col mb-6'>
        <label htmlFor='닉네임' className='text-body-s-m text-gray-600 mb-2'>
          닉네임
        </label>
        <div className='flex gap-3 mb-2'>
          <input
            {...register('nickname')}
            onBlur={onCheckNickname}
            id='닉네임'
            type='text'
            placeholder='닉네임을 입력해 주세요.'
            className={`${errors.nickname && 'border border-negative'} w-[324px] h-11 px-4 py-3 rounded-[5px] bg-gray-50 text-body-m text-gray-600 placeholder:text-gray-300 focus:outline-none`}
          />
          <button
            onClick={handleEmailNickname}
            className={`h-11 px-4 py-3 rounded-[5px] ${errors.nickname?.type === 'duplicate' && 'bg-primary-10 text-primary'} ${errors.nickname?.type !== 'duplicate' && nickname ? 'bg-primary-10 text-primary' : 'bg-gray-200 text-gray-400'}  text-body-s-s cursor-pointer`}
          >
            중복 확인
          </button>
        </div>
        {errors.nickname ? (
          <div className='text-caption-m text-negative'>{errors.nickname?.message}</div>
        ) : isNicknameChecked ? (
          <div className='text-caption-m text-positive'>사용 가능한 닉네임입니다.</div>
        ) : (
          <div className='h-4'></div>
        )}
      </div>
      <div className='flex flex-col mb-6'>
        <label htmlFor='비밀번호' className='text-body-s-m text-gray-600 mb-2'>
          비밀번호
        </label>
        <input
          {...register('password')}
          id='비밀번호'
          type='password'
          placeholder='비밀번호를 입력해 주세요.'
          className={`${errors.password && 'border border-negative'} w-[423px] h-11 px-4 py-3 mb-2 rounded-[5px] bg-gray-50 text-body-m text-gray-600 placeholder:text-gray-300 focus:outline-none`}
        />
        {errors.password ? (
          <div className='text-caption-m text-negative'>{errors.password?.message}</div>
        ) : (
          <div className='h-4'></div>
        )}
      </div>
      <div className='flex flex-col mb-6'>
        <label htmlFor='비밀번호 확인' className='text-body-s-m text-gray-600 mb-2'>
          비밀번호 확인
        </label>
        <input
          {...register('confirmPassword')}
          id='비밀번호 확인'
          type='password'
          placeholder='비밀번호를 다시 입력해 주세요.'
          className={`${errors.confirmPassword && 'border border-negative'} w-[423px] h-11 px-4 py-3 mb-2 rounded-[5px] bg-gray-50 text-body-m text-gray-600 placeholder:text-gray-300 focus:outline-none`}
        />
        {errors.confirmPassword ? (
          <div className='text-caption-m text-negative'>{errors.confirmPassword?.message}</div>
        ) : (
          <div className='h-4'></div>
        )}
      </div>
      <div className='flex flex-col mb-9'>
        <div className='flex justify-between items-center mb-2'>
          <label htmlFor='이용약관' className='text-body-s-m text-gray-600'>
            이용약관
          </label>
          <div className='flex justify-center items-center gap-1'>
            <div className={`text-body-s-m ${accept ? 'text-primary' : 'text-primary/30'}`}>
              동의함
            </div>
            <input
              {...register('accept')}
              type='checkbox'
              className={`w-4 h-4 appearance-none rounded-[5px] ${errors.accept ? 'border-negative' : 'border-primary'} border checked:appearance-auto`}
            />
          </div>
        </div>
        <Caption />
      </div>
      <button
        type='submit'
        className={`w-[423px] h-12 rounded-[5px] ${isValid ? 'bg-primary text-white' : 'bg-gray-400 text-gray-300'} text-subtitle-s mb-6 cursor-pointer`}
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
