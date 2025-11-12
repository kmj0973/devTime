import Logo from '@/features/auth/ui/svg/Logo';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginFormSchema, type LoginFormFields } from '../model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestLogin } from '../api/requests';
import LoginFailureDialog from './LoginFailureDialog';
import useModalStore from '@/shared/store/useModalStroe';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginFormFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const openModal = useModalStore((state) => state.openModal);
  //   const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const response = await requestLogin(data);
      console.log(response);
      //   navigate('/');
    } catch (err) {
      console.log(err);
      openModal();
    }
  };

  return (
    <>
      {isModalOpen && <LoginFailureDialog />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-[500px] h-[598px] flex flex-col justify-center items-center bg-white/30 backdrop-blur-[50px] rounded-[10px] shadow-[0_40px_100px_40px_#0368FF0D]'
      >
        <Logo />
        <div className='flex flex-col w-[328px] mb-5'>
          <label htmlFor='아이디' className='text-body-s-m text-gray-600 mb-2'>
            아이디
          </label>
          <input
            {...register('email')}
            id='아이디'
            type='text'
            className={`${errors.email ? 'border border-negative' : ''} w-full h-11 px-4 py-3 mb-2 rounded-[5px] bg-gray-50 text-body-m placeholder:text-gray-300 focus:outline-none`}
            placeholder='이메일 주소를 입력해주세요.'
          />
          {errors.email ? (
            <div className='text-caption-m text-negative'>{errors.email.message as string}</div>
          ) : (
            <div className='h-4' />
          )}
        </div>
        <div className='flex flex-col w-[328px] mb-5'>
          <label htmlFor='비밀번호' className='text-body-s-m text-gray-600 mb-2'>
            비밀번호
          </label>
          <input
            {...register('password')}
            id='비밀번호'
            type='password'
            className={`${errors.password ? 'border border-negative' : ''} w-full h-11 px-4 py-3 mb-2 rounded-[5px] bg-gray-50 text-body-m placeholder:text-gray-300 focus:outline-none`}
            placeholder='비밀번호를 입력해주세요.'
          />
          {errors.password ? (
            <div className='text-caption-m text-negative'>{errors.password.message as string}</div>
          ) : (
            <div className='h-4' />
          )}
        </div>
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
