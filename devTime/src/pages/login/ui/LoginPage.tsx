import BackgroundLogo from './BackgroundLogo';
import Logo from './Logo';

export default function LoginPage() {
  return (
    <div className='relative h-screen flex justify-center items-center'>
      <BackgroundLogo />
      <div className='w-[500px] h-[598px] flex flex-col justify-center items-center bg-gray-50/30 backdrop-blur-[50px] rounded-[10px] shadow-[0_40px_100px_40px_#0368FF0D]'>
        <Logo />
        <div className='flex flex-col'>
          <label htmlFor='아이디' className='text-body-s-m text-gray-600 mb-2'>
            아이디
          </label>
          <input
            id='아이디'
            type='text'
            className='w-[328px] h-11 px-4 py-3 mb-6 rounded-[5px] bg-gray-100 text-body-m text-state-disabled'
            placeholder='이메일 주소를 입력해주세요.'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='비밀번호' className='text-body-s-m text-gray-600 mb-2'>
            비밀번호
          </label>
          <input
            id='비밀번호'
            type='text'
            className='w-[328px] h-11 px-4 py-3 mb-6 rounded-[5px] bg-gray-100 text-body-m text-state-disabled'
            placeholder='비밀번호를 입력해주세요.'
          />
        </div>
        <button className='w-[328px] h-11 bg-gray-500 rounded-[5px] text-state-disabled mb-6'>
          로그인
        </button>
        <button className='text-primary text-body-s-m'>회원가입</button>
      </div>
    </div>
  );
}
