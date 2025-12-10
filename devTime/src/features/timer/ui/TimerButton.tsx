import LoginRequiredDialog from '@/features/auth/ui/LoginRequiredDialog/LoginRequiredDialog';
import TimerStartDialog from '@/features/timer/ui/TimerStartDialog';
import useAuthStore from '@/shared/store/useAuthStore';
import useModalStore from '@/shared/store/useModalStroe';
import { useTimer } from '../hooks/useTimer';
import StartSVG from './svg/Button/StartSVG';
import PauseSVG from './svg/Button/PauseSVG';
import FinishSVG from './svg/Button/FinishSVG';

export default function TimerButton() {
  const isLogined = useAuthStore((state) => state.isLogined);

  const isModalOpen = useModalStore((state) => state.isModalOpen);

  const { timerId, pause, handleStart, handlePause, handleDelete } = useTimer();

  return (
    <div className='mt-20 flex gap-20'>
      {!isLogined && isModalOpen && <LoginRequiredDialog />}
      {isLogined && isModalOpen && <TimerStartDialog />}
      <StartSVG onClick={handleStart} timerId={timerId} pause={pause} />
      <PauseSVG onClick={handlePause} timerId={timerId} pause={pause} />
      <FinishSVG onClick={handleDelete} timerId={timerId} pause={pause} />
    </div>
  );
}
