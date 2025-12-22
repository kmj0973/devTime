export default function formatMsToHMS(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);

  const hh = Math.floor(totalSeconds / 3600);
  const mm = Math.floor((totalSeconds % 3600) / 60);

  return `${hh}시간 ${mm}분`;
}
