import timerDivider from '@/assets/timerDivider.svg';
import { useTimerStore } from '@/shared/store/useTimerStore';
import { useEffect, useState } from 'react';

export default function Timer() {
  const [hours, setHours] = useState('--');
  const [minutes, setMinutes] = useState('--');
  const [seconds, setSeconds] = useState('--');
  const startTime = useTimerStore((state) => state.startTime);
  const pause = useTimerStore((state) => state.pause);

  useEffect(() => {
    if (!startTime) {
      setHours('00');
      setMinutes('00');
      setSeconds('00');
      return;
    }

    if (pause) {
      return;
    }

    const interval = setInterval(() => {
      const diff = Date.now() - new Date(startTime).getTime();
      const hr = Math.floor(diff / (1000 * 60 * 60));
      const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((diff % (1000 * 60)) / 1000);
      setHours(String(hr).padStart(2, '0'));
      setMinutes(String(min).padStart(2, '0'));
      setSeconds(String(sec).padStart(2, '0'));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, pause]);

  return (
    <div className='flex mt-[50px]'>
      <div className='w-[264px] h-[298px] bg-linear-to-br from-[rgba(76,121,255,0)] to-[rgba(76,121,255,0.2)] text-primary rounded-[12px]'>
        <div className='w-[250px] h-[200px] mt-2 mx-[7px] text-digital'>{hours}</div>
        <div className='text-sm leading-4.5 font-semibold flex justify-center items-center mt-9'>
          H O U R S
        </div>
      </div>
      <img src={timerDivider} alt=':' className='mx-12' />
      <div className='w-[264px] h-[298px] bg-linear-to-br from-[rgba(76,121,255,0)] to-[rgba(76,121,255,0.2)] text-primary rounded-[12px]'>
        <div className='w-[250px] h-[200px] mt-2 mx-[7px] text-digital'>{minutes}</div>
        <div className='text-sm leading-4.5 font-semibold flex justify-center items-center mt-9'>
          M I N U T E S
        </div>
      </div>
      <img src={timerDivider} alt=':' className='mx-12' />
      <div className='w-[264px] h-[298px] bg-linear-to-br from-[rgba(76,121,255,0)] to-[rgba(76,121,255,0.2)] text-primary rounded-[12px]'>
        <div className='w-[250px] h-[200px] mt-2 mx-[7px] text-digital'>{seconds}</div>
        <div className='text-sm leading-4.5 font-semibold flex justify-center items-center mt-9'>
          S E C O N D S
        </div>
      </div>
    </div>
  );
}
