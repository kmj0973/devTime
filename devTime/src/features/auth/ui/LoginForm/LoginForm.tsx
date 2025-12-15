import Logo from '@/features/auth/ui/LoginForm/svg/Logo';
import { Link } from 'react-router-dom';
import FormField from './FormField';
import useLoginForm from '../../hooks/useLoginForm';

export default function LoginForm() {
  const { register, handleSubmit, onSubmit, isValid, errors } = useLoginForm();

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-[500px] h-[598px] flex flex-col justify-center items-center bg-white/30 backdrop-blur-[50px] rounded-[10px] shadow-[0_40px_100px_40px_#0368FF0D]'
      >
        <Logo />
        <FormField
          name='email'
          label='아이디'
          placeholder='이메일 주소를 입력해주세요.'
          register={register}
          errors={errors}
        />
        <FormField
          name='password'
          label='비밀번호'
          placeholder='비밀번호를 입력해주세요.'
          register={register}
          errors={errors}
        />
        <button
          type='submit'
          className={`w-[328px] h-11 py-3 ${
            isValid ? 'bg-primary text-white hover:bg-state-hover' : 'bg-gray-400 text-gray-300'
          } rounded-[5px] text-subtitle-s mt-3 mb-6 cursor-pointer`}
        >
          로그인
        </button>
        <Link to='/signup' className='text-primary text-body-s-m'>
          회원가입
        </Link>
      </form>
    </>
  );
}
