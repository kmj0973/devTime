import navBarLogo from '@/assets/navBarLogo.svg';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className='max-w-[1200px] h-10 mx-auto flex justify-between  items-center'>
      <div className='flex gap-12'>
        <img src={navBarLogo} alt='Logo' />
        <div className='flex justify-center items-center gap-9'>
          <span className='text-body-s text-secondary-indigo border-b border-secondary-indigo'>
            대시보드
          </span>
          <span className='text-body-s text-secondary-indigo'>랭킹</span>
        </div>
      </div>
      <div className='flex justify-center items-center gap-9'>
        <Link className='text-body-s text-secondary-indigo' to='/login'>
          로그인
        </Link>
        <Link className='text-body-s text-secondary-indigo' to='/signup'>
          회원가입
        </Link>
      </div>
    </div>
  );
}
