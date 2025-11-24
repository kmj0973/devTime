import useAuthStore from '@/shared/store/useAuthStore';

export default function TimerText() {
  const isLogined = useAuthStore((state) => state.isLogined);

  return (
    <>
      {isLogined ? (
        <div className='text-primary-30 text-7xl leading-[86px] font-bold mt-24 mb-[30px]'>
          오늘도 열심히 달려봐요!
        </div>
      ) : (
        <>
          <div className='text-7xl leading-[86px] font-bold text-secondary-indigo mt-24'>
            WELCOME
          </div>
          <div className='text-sm leading-4.5 font-normal text-secondary-indigo mt-2.5'>
            DevTime을 사용하려면 로그인이 필요합니다.
          </div>
        </>
      )}
    </>
  );
}
