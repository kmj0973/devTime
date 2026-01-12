import StatDiv from './item/StatDiv';
import WeekdayStudyTimeDiv from './item/WeekdayStudyTimeDiv';
import { useStatsQuery } from '../queries/useDashboardQuery';

export default function StatsContainer() {
  const { stats } = useStatsQuery();

  return (
    <div className='grid grid-cols-[240px_240px_688px] grid-rows-2 gap-4'>
      <StatDiv title={'누적 공부 시간'} content={stats?.totalStudyTime} />
      <StatDiv title={'누적 공부 일수'} content={stats?.consecutiveDays} />

      <div className='bg-primary w-[688px] h-[264px] row-span-2 rounded-[18px] py-6 px-7'>
        <div className='text-subtitle-s text-white'>요일별 공부 시간 평균</div>
        <div className='flex justify-end gap-2'>
          <div className='flex flex-col w-20 gap-10'>
            <div className='text-caption-b text-white/50 border-t border-white/50'>24시간</div>
            <div className='text-caption-b text-white/50 border-t border-white/50'>16시간</div>
            <div className='text-caption-b text-white/50 border-t border-white/50'>8시간</div>
          </div>
          {Object.entries(stats?.weekdayStudyTime).map(([day, studyTime]) => (
            <WeekdayStudyTimeDiv key={day} title={day} content={studyTime} />
          ))}
        </div>
      </div>

      <StatDiv title={'하루 평균 공부 시간'} content={stats?.averageDailyStudyTime} />
      <StatDiv title={'목표 달성률'} content={stats?.taskCompletionRate} />
    </div>
  );
}
