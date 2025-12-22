import timerDivider from '@/assets/timerDivider.svg';
import { requestGetTimer, requestUpdateTimer } from '@/features/timer/api/requests';
import mergeSplitTimes from '@/features/timer/util/mergeSplitTimes';
import splitTimeByDate from '@/features/timer/util/splitTimeByDate';
import { useTimerStore } from '@/shared/store/useTimerStore';
import { useEffect, useState } from 'react';

export default function Timer() {
  const { timerId, startTime, pause, pauseTime, pauseTimeISOString, restartTime, setRestartTime } =
    useTimerStore();

  const [hours, setHours] = useState('--');
  const [minutes, setMinutes] = useState('--');
  const [seconds, setSeconds] = useState('--');

  useEffect(() => {
    if (!startTime) {
      setHours('00');
      setMinutes('00');
      setSeconds('00');
      return;
    }

    const updateDisplay = () => {
      const now = Date.now();

      let totalPause = pauseTime;

      if (pause && pauseTimeISOString) {
        // 현재 일시정지 중이면 pause 중 시간 포함
        totalPause += now - new Date(pauseTimeISOString).getTime();
      }

      const total = now - new Date(startTime).getTime() - totalPause;

      const hr = Math.floor(total / 3600000);
      const min = Math.floor((total % 3600000) / 60000);
      const sec = Math.floor((total % 60000) / 1000);

      setHours(String(hr).padStart(2, '0'));
      setMinutes(String(min).padStart(2, '0'));
      setSeconds(String(sec).padStart(2, '0'));
    };

    updateDisplay(); // 초기 실행

    const interval = setInterval(updateDisplay, 1000);
    return () => clearInterval(interval);
  }, [startTime, pause, pauseTimeISOString, pauseTime]);

  useEffect(() => {
    if (pause) return;

    const interval = setInterval(async () => {
      const now = Date.now();
      const start = new Date(restartTime).getTime();

      // 세션을 날짜별로 분리
      const segments = splitTimeByDate(start, now);

      // 서버 데이터 조회
      const data = await requestGetTimer();

      // 병합
      const merged = mergeSplitTimes(data.splitTimes, segments);

      // 업데이트
      await requestUpdateTimer(timerId, { splitTimes: merged });

      // 기준 시점 갱신
      setRestartTime(new Date().toISOString());
    }, 600_000);

    return () => clearInterval(interval);
  }, [pause, restartTime]);

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
