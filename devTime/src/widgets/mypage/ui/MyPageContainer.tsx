import { NavBar } from '@/widgets/navBar/ui/NavBar';
import UserSVG from './svg/UserSVG';
import EditSVG from './svg/EditSVG';
import useAuthStore from '@/shared/store/useAuthStore';
import { Link } from 'react-router-dom';

export default function MyPageContainer() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className='h-screen items-center bg-linear-to-b from-[#F6F7F9] to-[#E9ECF5] pt-4'>
      <NavBar />
      <div className='w-full flex flex-col justify-center items-center mt-10'>
        <div className='bg-white w-[1200px] h-[424px] flex justify-between p-9 gap-14 rounded-xl'>
          <div className='w-[180px] h-[180px] bg-gray-100 flex justify-center items-center rounded-[90px]'>
            {user?.profile ? (
              <img
                className='w-full h-full object-cover rounded-[90px]'
                src={`https://dev-time-bucket.s3.ap-northeast-2.amazonaws.com/${user.profile.profileImage}`}
                alt='프로필 이미지'
              />
            ) : (
              <UserSVG />
            )}
          </div>
          <div className='flex flex-col gap-[46px] w-[720px]'>
            <div>
              <div className='text-subtitle-m text-secondary-indigo mb-1'>{user?.nickname}</div>
              <div
                className={`text-heading-b ${user?.profile ? 'text-secondary-indigo' : 'text-gray-300'}`}
              >
                {user?.profile ? user.profile.goal : '아직 설정한 목표가 없어요'}.
              </div>
            </div>
            <div className='flex flex-col gap-6'>
              <div>
                <div className='text-body-s-s text-state-disabled mb-1'>이메일주소</div>
                <div className='text-subtitle-s text-gray-600'>{user?.email}</div>
              </div>
              <div>
                <div className='text-body-s-s text-state-disabled mb-1'>개발 경력</div>
                <div
                  className={`text-subtitle-s ${user?.profile ? 'text-gray-600' : 'text-gray-300'}`}
                >
                  {user?.profile ? user.profile.career : '개발 경력을 업데이트 해주세요.'}
                </div>
              </div>
              <div>
                <div className='text-body-s-s text-state-disabled mb-1'>공부 목적</div>
                <div
                  className={`text-subtitle-s ${user?.profile ? 'text-gray-600' : 'text-gray-300'}`}
                >
                  {user?.profile ? user.profile.purpose : '개발 경력을 업데이트 해주세요.'}
                </div>
              </div>
              <div>
                <div className='text-body-s-s text-state-disabled mb-1'>개발 스택</div>
                {user?.profile ? (
                  <div className='flex gap-2'>
                    {user.profile.techStacks.map((tech, index) => (
                      <div
                        key={index}
                        className='h-7 bg-gray-100 text-body-m text-gray-500 rounded-[5px] py-1 px-2'
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-subtitle-s text-gray-300'>
                    현재 공부 중인 또는 가지고 있는 개발 스택을 업데이트 해주세요.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='flex justify-center items-start'>
            <div className='flex justify-center items-center gap-2'>
              <EditSVG />
              <Link to='/mypage/edit' className='text-body-s-m text-gray-600'>
                회원정보 수정
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
