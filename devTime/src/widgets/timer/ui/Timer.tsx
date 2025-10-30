import timerDivider from '@/assets/timerDivider.svg';
import { useEffect, useState } from 'react';

export default function Timer() {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setHours(String(now.getHours()).padStart(2, '0'));
      setMinutes(String(now.getMinutes()).padStart(2, '0'));
      setSeconds(String(now.getSeconds()).padStart(2, '0'));
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

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
