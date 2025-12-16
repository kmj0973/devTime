import navBarLogo from '@/assets/navBarLogo.svg';
import useAuthStore from '@/shared/store/useAuthStore';
import { Link, NavLink } from 'react-router-dom';
import UserProfileImage from './UserProfileImage';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const NavBar = () => {
  const userInfo = useAuthStore((state) => state.user);
  const { onLogout } = useAuth();

  return (
    <div className='max-w-[1200px] h-10 mx-auto flex justify-between  items-center'>
      <div className='flex gap-12'>
        <Link to='/'>
          <img src={navBarLogo} alt='Logo' />
        </Link>
        <div className='flex justify-center items-center gap-9'>
          <NavLink
            to='/dashboard'
            className={`text-body-s text-secondary-indigo border-b border-secondary-indigo`}
          >
            대시보드
          </NavLink>
          <NavLink to='/ranking' className='text-body-s text-secondary-indigo'>
            랭킹
          </NavLink>
        </div>
      </div>
      <div className='flex justify-center items-center gap-9'>
        {userInfo ? (
          <div className='flex justify-center items-center gap-3'>
            <UserProfileImage />
            <div className='text-secondary-indigo text-body-b'>{userInfo.nickname}</div>
            <button onClick={onLogout}>logout</button>
          </div>
        ) : (
          <>
            <Link className='text-body-s text-secondary-indigo' to='/login'>
              로그인
            </Link>
            <Link className='text-body-s text-secondary-indigo' to='/signup'>
              회원가입
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
