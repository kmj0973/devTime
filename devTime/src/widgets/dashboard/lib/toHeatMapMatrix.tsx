import { getDay } from 'date-fns';

export default function toHeatMapMatrix(days: Date[]): Date[][] {
  const weeks = [];
  let currentWeek = new Array(7).fill(null);

  days.forEach((date) => {
    const dayIndex = getDay(date) % 7;
    // getDay(): 0(일)~6(토) → 월=0이 되도록 변환

    currentWeek[dayIndex] = date;

    // 일요일이 오면 다음 주 배열로 넘어감
    if (dayIndex === 6) {
      weeks.push(currentWeek);
      currentWeek = new Array(7).fill(null);
    }
  });

  // 마지막 주도 밀어넣기
  weeks.push(currentWeek);

  return weeks;
}
