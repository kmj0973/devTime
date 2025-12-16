export default function StatDiv({ title, content }: { title: string; content: number }) {
  const hr = Math.floor(content / (1000 * 60 * 60));
  const min = Math.floor((content % (1000 * 60 * 60)) / (1000 * 60));

  const newContent = Math.floor(content);

  const Item = ({ title }: { title: string }) => {
    switch (title) {
      case '누적 공부 시간':
        return (
          <div className='flex justify-end items-baseline gap-1'>
            <span className='text-4xl font-bold text-secondary-indigo'>{hr}</span>
            <span className='text-body-m text-secondary-indigo'>시간</span>
            <span className='text-4xl font-bold text-secondary-indigo'>{min}</span>
            <span className='text-body-m text-secondary-indigo'>분</span>
          </div>
        );
      case '누적 공부 일수':
        return (
          <div className='flex justify-end items-baseline gap-1'>
            <span className='text-4xl font-bold text-secondary-indigo'>{newContent}</span>
            <span className='text-body-m text-secondary-indigo'>일째</span>
          </div>
        );
      case '하루 평균 공부 시간':
        return (
          <div className='flex justify-end items-baseline gap-1'>
            <span className='text-4xl font-bold text-secondary-indigo'>{hr}</span>
            <span className='text-body-m text-secondary-indigo'>시간</span>
            <span className='text-4xl font-bold text-secondary-indigo'>{min}</span>
            <span className='text-body-m text-secondary-indigo'>분</span>
          </div>
        );
      case '목표 달성률':
        return (
          <div className='flex justify-end items-baseline gap-1'>
            <span className='text-4xl font-bold text-secondary-indigo'>{newContent}</span>
            <span className='text-body-m text-secondary-indigo'>%</span>
          </div>
        );
    }
  };

  return (
    <div className='bg-white w-60 h-[124px] rounded-[18px] p-6'>
      <div className='text-subtitle-s text-state-disabled mb-2'>{title}</div>
      <Item title={title} />
    </div>
  );
}
