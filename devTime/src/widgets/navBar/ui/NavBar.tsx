import navBarLogo from '@/assets/navBarLogo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SimpleProfile from '@/widgets/profile/ui/SimpleProfile';
import useAuthStore from '@/shared/store/useAuthStore';
import useModalStore from '@/shared/store/useModalStroe';

export const NavBar = () => {
  const isLogined = useAuthStore((state) => state.isLogined);
  const openModal = useModalStore((state) => state.openModal);

  const location = useLocation();
  const navigate = useNavigate();

  const handlePageRoute = (page: string) => {
    if (!isLogined) openModal('loginRequired');
    else navigate(page);
  };

  return (
    <div className='max-w-[1200px] h-10 mx-auto flex justify-between  items-center'>
      <div className='flex gap-12'>
        <Link to='/'>
          <img src={navBarLogo} alt='Logo' />
        </Link>
        <div className='flex justify-center items-center gap-9'>
          <button
            onClick={() => handlePageRoute('/dashboard')}
            className={`${location.pathname.includes('dashboard') && 'border-b border-secondary-indigo'} text-body-s text-secondary-indigo cursor-pointer`}
          >
            대시보드
          </button>
          <button
            onClick={() => handlePageRoute('/ranking')}
            className={`${location.pathname.includes('ranking') && 'border-b border-secondary-indigo'} text-body-s text-secondary-indigo cursor-pointer`}
          >
            랭킹
          </button>
        </div>
      </div>
      <SimpleProfile />
    </div>
  );
};
