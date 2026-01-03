import { useAuth } from '@/features/auth/hooks/useAuth';
import useAuthStore from '@/shared/store/useAuthStore';
import UserProfileImage from '@/widgets/navBar/ui/UserProfileImage';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserSVG from './svg/UserSVG';
import LogoutSVG from './svg/LogoutSVG';

export default function SimpleProfile() {
  const userInfo = useAuthStore((state) => state.user);
  const { onLogout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative flex justify-center items-center gap-9'>
      {userInfo ? (
        <>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className='flex justify-center items-center gap-3 cursor-pointer'
          >
            {userInfo.profile?.profileImage ? (
              <img
                className='w-10 h-10 object-cover rounded-3xl'
                src={`https://dev-time-bucket.s3.ap-northeast-2.amazonaws.com/${userInfo.profile.profileImage}`}
                alt='프로필 이미지'
              />
            ) : (
              <UserProfileImage />
            )}
            <div className='text-secondary-indigo text-body-b'>{userInfo.nickname}</div>
          </div>
          {isOpen && (
            <div className='absolute w-[136px] top-12 right-0 flex flex-col justify-center items-center text-body-m text-gray-600 bg-white border border-gray-300 rounded-[5px] cursor-pointer'>
              <Link to='/mypage' className='flex gap-4 px-3 py-4'>
                <UserSVG />
                마이페이지
              </Link>
              <div className='border border-gray-300 w-[106px]'></div>
              <div onClick={onLogout} className='w-full flex gap-4 px-3 py-4'>
                <LogoutSVG />
                로그아웃
              </div>
            </div>
          )}
        </>
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
  );
}
