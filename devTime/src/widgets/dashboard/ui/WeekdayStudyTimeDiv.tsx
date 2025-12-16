export default function WeekdayStudyTimeDiv({
  day,
  studyTime,
}: {
  day: string;
  studyTime: number;
}) {
  const height = Math.floor((studyTime / 86400000) * 160);

  const hr = String(Math.floor(studyTime / (1000 * 60 * 60))).padStart(2, '0');
  const min = String(Math.floor((studyTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  const sec = String(Math.floor((studyTime % (1000 * 60)) / 1000)).padStart(2, '0');

  return (
    <div className='relative flex flex-col w-9 gap-2'>
      <div className='relative bg-white/50 h-40 rounded-[5px] flex flex-col justify-end overflow-hidden'>
        <div className={`bg-white w-full`} style={{ height: `${height}px` }}></div>
      </div>
      <div
        className='absolute w-full h-40 z-1 opacity-0 hover:opacity-100 whitespace-nowrap
            transition-all duration-100'
      >
        <div className='absolute left-[50%] top-[50%] bg-black w-[124px] text-body-s-r text-white text-center rounded-[3px] px-2 py-1'>
          {hr}시간 {min}분 {sec}초
        </div>
      </div>
      <div className='bg-white/50 h-5 rounded-[10px] mx-2 flex justify-center items-center text-caption-b text-secondary-indigo'>
        {day.charAt(0)}
      </div>
    </div>
  );
}
