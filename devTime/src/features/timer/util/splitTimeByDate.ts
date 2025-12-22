import { endOfDay } from 'date-fns';
import type { Time } from '../model/types';

export default function splitTimeByDate(start: number, end: number): Time[] {
  const map = new Map<string, Time>();
  // key = yyyy-MM-dd
  // value = { date: 첫 ISO값, timeSpent: 누적 }

  let current = start;

  while (current < end) {
    const dayEnd = endOfDay(current).getTime();
    const segmentEnd = Math.min(dayEnd, end);

    const timeSpent = segmentEnd - current;
    const iso = new Date(current).toISOString();
    const dateKey = iso.split('T')[0]; // yyyy-MM-dd

    console.log(dateKey);
    if (map.has(dateKey)) {
      // 이미 존재하면 timeSpent만 누적
      map.get(dateKey)!.timeSpent += timeSpent;
    } else {
      // 처음 등장한 날짜 → date는 그 시점의 ISO 그대로 저장
      map.set(dateKey, { date: iso, timeSpent });
    }

    current = segmentEnd;
  }

  return Array.from(map.values());
}
