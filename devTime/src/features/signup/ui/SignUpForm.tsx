import { Link } from 'react-router-dom';
import Caption from './Caption';
import { useSignUpForm } from '../hooks/useSignUpForm';
import { FormField } from './FormField';

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
    handleNicknameCheck,
    onCheckEmail,
    onCheckNickname,
    onSubmit,
  } = useSignUpForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex-1 flex flex-col justify-center items-center'
    >
      <h1 className='text-heading-b text-primary mb-9'>회원가입</h1>

      {/* 이메일 */}
      <FormField
        name='email'
        label='아이디'
        register={register}
        value={email}
        errors={errors}
        placeholder='이메일 주소 형식으로 입력해 주세요.'
        onCheck={onCheckEmail}
        handleCheck={handleEmailCheck}
        isChecked={isEmailChecked}
        showCheckButton
      />

      {/* 닉네임 */}
      <FormField
        name='nickname'
        label='닉네임'
        register={register}
        value={nickname}
        errors={errors}
        placeholder='닉네임을 입력해 주세요.'
        onCheck={onCheckNickname}
        handleCheck={handleNicknameCheck}
        isChecked={isNicknameChecked}
        showCheckButton
      />

      {/* 비밀번호 */}
      <FormField
        name='password'
        label='비밀번호'
        register={register}
        errors={errors}
        placeholder='비밀번호를 입력해 주세요.'
      />

      {/* 비밀번호 확인 */}
      <FormField
        name='confirmPassword'
        label='비밀번호 확인'
        register={register}
        errors={errors}
        placeholder='비밀번호를 다시 입력해 주세요.'
      />

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
        className={`w-[423px] h-12 rounded-[5px] ${isEmailChecked && isNicknameChecked && isValid ? 'bg-primary text-white hover:bg-state-hover' : 'bg-gray-400 text-gray-300'} text-subtitle-s mb-6 cursor-pointer`}
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
