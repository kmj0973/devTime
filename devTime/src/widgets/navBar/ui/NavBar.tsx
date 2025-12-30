import navBarLogo from '@/assets/navBarLogo.svg';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SimpleProfile from '@/widgets/profile/ui/SimpleProfile';

export const NavBar = () => {
  const location = useLocation();

  return (
    <div className='max-w-[1200px] h-10 mx-auto flex justify-between  items-center'>
      <div className='flex gap-12'>
        <Link to='/'>
          <img src={navBarLogo} alt='Logo' />
        </Link>
        <div className='flex justify-center items-center gap-9'>
          <NavLink
            to='/dashboard'
            className={`${location.pathname.includes('dashboard') && 'border-b border-secondary-indigo'} text-body-s text-secondary-indigo`}
          >
            대시보드
          </NavLink>
          <NavLink
            to='/ranking'
            className={`${location.pathname.includes('ranking') && 'border-b border-secondary-indigo'} text-body-s text-secondary-indigo`}
          >
            랭킹
          </NavLink>
        </div>
      </div>
      <SimpleProfile />
    </div>
  );
};
