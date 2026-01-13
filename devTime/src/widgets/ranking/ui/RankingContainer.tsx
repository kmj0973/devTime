import { NavBar } from '@/widgets/navBar/ui/NavBar';
import RankingInfo from './RankingInfo';
import { useState } from 'react';

export default function RankingContainer() {
  const [sortBy, setSortBy] = useState<string>('total');

  return (
    <div className=' w-full items-center bg-linear-to-b from-[#F6F7F9] to-[#E9ECF5] pt-4 pb-12'>
      <NavBar />
      <div className='max-w-[1200px] mx-auto  my-10'>
        <div className='flex justify-between items-center w-[280px] rounded-xl bg-white p-2 mb-3'>
          <div
            onClick={() => setSortBy('total')}
            className={`${sortBy == 'total' && 'bg-primary-10 rounded-lg'} cursor-pointer transition-all text-subtitle-b text-secondary-indigo p-2`}
          >
            총 학습 시간
          </div>
          <div
            onClick={() => setSortBy('avg')}
            className={`${sortBy == 'avg' && 'bg-primary-10 rounded-lg'} cursor-pointer transition-all text-subtitle-b text-secondary-indigo p-2`}
          >
            일 평균 학습 시간
          </div>
        </div>
        <div className='flex flex-col w-full gap-3'>
          <RankingInfo sortBy={sortBy} />
        </div>
      </div>
    </div>
  );
}
