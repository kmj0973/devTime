import TodoListDialog from '@/features/timer/ui/TodoListDialog';
import NavBar from '@/widgets/navBar/ui/NavBar';
import Timer from '@/widgets/timer/ui/Timer';
import TimerButton from '@/widgets/timer/ui/TimerButton';
import TimerText from '@/widgets/timer/ui/TimerText';

export default function HomePage() {
  return (
    <div className='h-screen items-center bg-linear-to-b from-[#F6F7F9] to-[#E9ECF5] pt-4'>
      <NavBar />
      <TodoListDialog />
      <div className='flex flex-col justify-center items-center'>
        <TimerText />
        <Timer />
        <TimerButton />
      </div>
    </div>
  );
}
