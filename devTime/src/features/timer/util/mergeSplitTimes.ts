import type { Time } from '../model/types';

export default function mergeSplitTimes(original: Time[], segments: Time[]): Time[] {
  const map = new Map<string, Time>(); // key: yyyy-MM-dd

  // 기존 데이터 넣기
  for (const item of original) {
    const key = item.date.split('T')[0]; // 날짜만 key로
    map.set(key, { ...item }); // Time 객체 보존
  }

  // 쪼갠 데이터 누적
  for (const seg of segments) {
    const key = seg.date.split('T')[0]; // 날짜만 key로

    if (map.has(key)) {
      map.get(key)!.timeSpent += seg.timeSpent;
    } else {
      map.set(key, { ...seg });
    }
  }

  // 반환
  return Array.from(map.values());
}
