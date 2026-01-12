import { eachDayOfInterval, subYears } from 'date-fns';
import toHeatMapMatrix from '../lib/toHeatMapMatrix';

export const createHeatMapLayout = () => {
  const today = new Date();
  const oneYearAgo = subYears(today, 1);

  //오늘 기준으로 1년 전의 날들을 배열로 전달
  const days = eachDayOfInterval({
    start: oneYearAgo,
    end: today,
  });

  // 전달된 날짜 배열을 주단위로 변환
  const results = toHeatMapMatrix(days);

  // 월 별 라벨
  const monthLabels: string[] = new Array(50).fill('');
  let prevYear: number | null = null;
  let prevMonth: number | null = null;

  results.forEach((week, weekIndex) => {
    if (!(week[0] instanceof Date) || week.join().length < 250) return;

    const year = week[0].getFullYear();
    const month = week[0].getMonth();

    if (prevYear != year || prevMonth != month) {
      monthLabels[weekIndex] = `${month + 1}월`;
      prevYear = year;
      prevMonth = month;
    }
  });

  return { results, monthLabels };
};
