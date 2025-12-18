import { useEffect, useState } from 'react';
import { requestGetHeatMap } from '../../api/requests';
import { eachDayOfInterval, format, subYears } from 'date-fns';
import toHeatMapMatrix from '../../lib/toHeatMapMatrix';

type MonthLabel = {
  label: string; // "2024-12"
  month: number;
  start: number;
  end: number;
};

export default function HeatMap() {
  const [d, setD] = useState([]);

  const today = new Date();
  const oneYearAgo = subYears(today, 1);

  const days = eachDayOfInterval({
    start: oneYearAgo,
    end: today,
  });

  const results = toHeatMapMatrix(days);

  const monthLabels: MonthLabel[] = [];

  let prevLabel: string | null = null;
  let startCol = 2; // 요일 라벨은 1번 column

  results.forEach((week, weekIndex) => {
    const firstDay = week[0];
    if (!firstDay) return;

    const year = firstDay.getFullYear();
    const month = firstDay.getMonth() + 1;

    const ym = `${year}-${month}`; // 연월 조합

    // month가 바뀐 경우만 push
    if (prevLabel !== null && prevLabel !== ym) {
      monthLabels.push({
        label: prevLabel,
        month: Number(prevLabel.split('-')[1]),
        start: startCol,
        end: weekIndex + 2,
      });

      startCol = weekIndex + 2;
    }

    prevLabel = ym;
  });

  // 마지막 달 추가
  if (prevLabel !== null) {
    monthLabels.push({
      label: prevLabel,
      month: Number(prevLabel.split('-')[1]),
      start: startCol,
      end: results.length + 2,
    });
  }

  useEffect(() => {
    const getHeatMap = async () => {
      const result = await requestGetHeatMap();
      setD(result.heatmap);
    };

    getHeatMap(); //같은 날짜는 합치고(합칠 때 시간이 나오기때문에 가장 높은 시간을 가진 객체만 남기기),
    //레벨도 내가 다시 객체로 만들기 { 2024-06-01: { time:000, level: 2 } }
  }, []);

  console.log(d);

  return (
    <div className='bg-white w-full min-w-[800px] h-full min-h-[306px] col-span-3 rounded-[18px] p-6 pr-15'>
      <div className='text-subtitle-s text-state-disabled mb-6'>공부 시간 바다</div>

      <div className='grid grid-cols-[20px_repeat(48,1fr)] grid-rows-[20px_repeat(7,1fr)] gap-[3px] mb-6'>
        {/* --- 동적 월 라벨 --- */}
        {monthLabels.map(({ month, start, end }) => (
          <div
            key={`${month}-${start}`}
            style={{
              gridColumn: `${start} / ${end}`,
              gridRow: 1,
              textAlign: 'center',
            }}
            className='text-caption-m text-gray-600'
          >
            {month}월
          </div>
        ))}

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
          results.map((week, weekIndex) =>
            week[dayIndex] === null ? (
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
                className='w-[18px] h-[18px] bg-gray-50 border border-gray-300 rounded-[5px]'
              >
                <div
                  className='absolute w-[124px] h-5 z-1 opacity-0 hover:opacity-100 whitespace-nowrap
            transition-all duration-100'
                >
                  <div className='absolute top-6 left-5 bg-black w-[124px] text-body-s-r text-white text-center rounded-[3px] px-2 py-1'>
                    {week[dayIndex]?.toDateString()}
                  </div>
                </div>
              </div>
            ),
          ),
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
