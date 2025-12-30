import { useAuth } from '@/features/auth/hooks/useAuth';
import useAuthStore from '@/shared/store/useAuthStore';
import UserProfileImage from '@/widgets/navBar/ui/UserProfileImage';
import { Link } from 'react-router-dom';

export default function SimpleProfile() {
  const userInfo = useAuthStore((state) => state.user);
  const { onLogout } = useAuth();

  return (
    <div className='flex justify-center items-center gap-9'>
      {userInfo ? (
        <div className='flex justify-center items-center gap-3'>
          {userInfo.profile.profileImage ? (
            <img
              className='w-10 h-10 object-cover rounded-3xl'
              src={`https://dev-time-bucket.s3.ap-northeast-2.amazonaws.com/${userInfo.profile.profileImage}`}
              alt='프로필 이미지'
            />
          ) : (
            <UserProfileImage />
          )}
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
  );
}
