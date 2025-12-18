import { requestGetStats } from '@/widgets/dashboard/api/requests';
import StatDiv from '@/widgets/dashboard/ui/items/StatDiv';
import { NavBar } from '@/widgets/navBar/ui/NavBar';
import { useEffect, useState } from 'react';
import WeekdayStudyTimeDiv from './items/WeekdayStudyTimeDiv';
import HeatMap from './items/HeatMap';

export default function DashboardContainer() {
  const [stats, setStats] = useState({
    '누적 공부 시간': 0,
    '누적 공부 일수': 0,
    '하루 평균 공부 시간': 0,
    '목표 달성률': 0,
  });

  const [weekDayStudyTime, setWeekDayStudyTime] = useState({
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const result = await requestGetStats();
      setStats({
        '누적 공부 시간': result['totalStudyTime'],
        '누적 공부 일수': result['consecutiveDays'],
        '하루 평균 공부 시간': result['averageDailyStudyTime'],
        '목표 달성률': result['taskCompletionRate'],
      });

      setWeekDayStudyTime({
        Sunday: result['weekdayStudyTime']['Sunday'],
        Monday: result['weekdayStudyTime']['Monday'],
        Tuesday: result['weekdayStudyTime']['Tuesday'],
        Wednesday: result['weekdayStudyTime']['Wednesday'],
        Thursday: result['weekdayStudyTime']['Thursday'],
        Friday: result['weekdayStudyTime']['Friday'],
        Saturday: result['weekdayStudyTime']['Saturday'],
      });
    };

    fetchStats();
  }, []);

  return (
    <div className=' w-full items-center bg-linear-to-b from-[#F6F7F9] to-[#E9ECF5] pt-4 pb-12'>
      <NavBar />
      <div className='grid grid-cols-3 gap-4 max-w-[1200px] mx-auto mt-10'>
        <div className='grid grid-cols-[240px_240px_688px] grid-rows-2 gap-4'>
          <StatDiv title={'누적 공부 시간'} content={stats['누적 공부 시간']} />
          <StatDiv title={'누적 공부 일수'} content={stats['누적 공부 일수']} />

          <div className='bg-primary w-[688px] h-[264px] row-span-2 rounded-[18px] py-6 px-7'>
            <div className='text-subtitle-s text-white'>요일별 공부 시간 평균</div>
            <div className='flex justify-end gap-2'>
              <div className='flex flex-col w-20 gap-10'>
                <div className='text-caption-b text-white/50 border-t border-white/50'>24시간</div>
                <div className='text-caption-b text-white/50 border-t border-white/50'>16시간</div>
                <div className='text-caption-b text-white/50 border-t border-white/50'>8시간</div>
              </div>
              {Object.entries(weekDayStudyTime).map(([day, studyTime]) => (
                <WeekdayStudyTimeDiv key={day} title={day} content={studyTime} />
              ))}
            </div>
          </div>

          <StatDiv title={'하루 평균 공부 시간'} content={stats['하루 평균 공부 시간']} />
          <StatDiv title={'목표 달성률'} content={stats['목표 달성률']} />
        </div>

        <HeatMap />

        <div className='bg-white w-full h-full min-h-[444px] col-span-3 rounded-[18px]'></div>
      </div>
    </div>
  );
}
