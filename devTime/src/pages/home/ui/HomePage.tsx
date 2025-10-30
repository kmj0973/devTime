import NavBar from '@/widgets/navBar/ui/NavBar';
import Timer from '@/widgets/timer/ui/Timer';
import TimerButton from '@/widgets/timer/ui/TimerButton';

export default function HomePage() {
  return (
    <div className='h-screen items-center bg-linear-to-b from-[#F6F7F9] to-[#E9ECF5] pt-4'>
      <NavBar />
      <div className='flex flex-col justify-center items-center'>
        <div className='text-7xl leading-[86px] font-bold text-secondary-indigo mt-24'>WELCOME</div>
        <div className='text-sm leading-4.5 font-normal text-secondary-indigo mt-2.5'>
          DevTime을 사용하려면 로그인이 필요합니다.
        </div>
        <Timer />
        <TimerButton />
      </div>
    </div>
  );
}
