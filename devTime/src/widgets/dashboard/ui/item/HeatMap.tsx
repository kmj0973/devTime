import { format } from 'date-fns';
import { useHeatMap } from '../../hooks/useHeatMap';

export default function HeatMap() {
  const { results, monthLabels, mergedData } = useHeatMap();

  return (
    <div className='bg-white w-full min-w-[800px] h-full min-h-[306px] col-span-3 rounded-[18px] p-6 pr-15'>
      <div className='text-subtitle-s text-state-disabled mb-6'>공부 시간 바다</div>

      <div className='grid grid-cols-[20px_repeat(48,1fr)] grid-rows-[20px_repeat(7,1fr)] gap-[3px] mb-6'>
        {/* --- 동적 월 라벨 --- */}
        <div className='col-span-1'></div>
        {monthLabels.map((month, index) =>
          month != '' ? (
            <div
              key={index}
              className='col-span-1 text-caption-m text-gray-600 whitespace-nowrap min-w-0
       text-center'
            >
              {month}
            </div>
          ) : (
            <div key={index} className='col-span-1'></div>
          ),
        )}

        {/* --- 요일 라벨 --- */}
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={index}
            style={{ gridColumn: 1, gridRow: index + 2 }}
            className='text-caption-m text-gray-600'
          >
            {day}
          </div>
        ))}

        {/* --- 달력 칸 출력 --- */}
        {Array.from({ length: 7 }).map((_, dayIndex) =>
          results.map((week, weekIndex) => {
            let level = null;
            let hh = '00';
            let mm = '00';
            let ss = '00';

            const formatDate = format(week[dayIndex], 'yyyy-MM-dd');

            if (formatDate in mergedData) {
              level = mergedData[formatDate].colorLevel;

              const totalSeconds = Math.floor(mergedData[formatDate].studyTimeHours * 12960);

              hh = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
              mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
              ss = String(totalSeconds % 60).padStart(2, '0');
            }

            return week[dayIndex] === null ? (
              <div
                key={`empty-${dayIndex}-${weekIndex}`}
                style={{
                  gridColumn: weekIndex + 2,
                  gridRow: dayIndex + 2,
                }}
                className='w-[18px] h-[18px] bg-gray-200 rounded-[5px]'
              ></div>
            ) : (
              <div
                onClick={() => {
                  console.log(format(results[weekIndex][dayIndex], 'yyyy-MM-dd'));
                }}
                key={`${dayIndex}-${weekIndex}`}
                style={{
                  gridColumn: weekIndex + 2,
                  gridRow: dayIndex + 2,
                }}
                className={`group w-[18px] h-[18px] ${level != null ? `bg-heatmap-level-${level + 1}` : 'bg-gray-50'} border border-gray-300 rounded-[5px]`}
              >
                <div
                  className='absolute w-[124px] h-5 z-10  opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap
            transition-all duration-100 pointer-events-none'
                >
                  <div className='absolute top-6 left-5 bg-black w-[124px] text-body-s-r text-white text-center rounded-[3px] px-2 py-1'>
                    {hh}시간 {mm}분 {ss}초
                  </div>
                </div>
              </div>
            );
          }),
        )}
      </div>

      <div className='flex gap-2'>
        <div className='text-caption-s text-heatmap-level-1'>Shallow</div>
        <div className='w-[150px] h-5 flex overflow-hidden rounded-[5px]'>
          <div className='w-[30px] h-5 bg-heatmap-level-1'></div>
          <div className='w-[30px] h-5 bg-heatmap-level-2'></div>
          <div className='w-[30px] h-5 bg-heatmap-level-3'></div>
          <div className='w-[30px] h-5 bg-heatmap-level-4'></div>
          <div className='w-[30px] h-5 bg-heatmap-level-5'></div>
        </div>
        <div className='text-caption-s text-heatmap-level-5'>Deep</div>
      </div>
    </div>
  );
}
