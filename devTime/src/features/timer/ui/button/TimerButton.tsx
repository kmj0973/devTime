import { useTimer } from '../../hooks/useTimer';
import StartSVG from '../svg/Button/StartSVG';
import PauseSVG from '../svg/Button/PauseSVG';
import FinishSVG from '../svg/Button/FinishSVG';
import TodoAndResetButton from './TodoAndResetButton';

export default function TimerButton() {
  const { timerId, pause, handleStart, handlePause, handleReview } = useTimer();

  return (
    <div
      className={`w-[1032px] flex ${timerId ? 'justify-end' : 'justify-center'} items-center gap-[134px] pt-20`}
    >
      <div className='flex gap-20'>
        <StartSVG onClick={handleStart} timerId={timerId} pause={pause} />
        <PauseSVG onClick={handlePause} timerId={timerId} pause={pause} />
        <FinishSVG onClick={handleReview} timerId={timerId} pause={pause} />
      </div>
      {timerId && <TodoAndResetButton />}
    </div>
  );
}
