import { useEffect, useState } from 'react';
import ProfileImageSVG from './svg/ProfileImageSVG';
import { requestGetRankings } from '../api/requests';

type TechStack = {
  id: number;
  name: string;
};

type Profile = {
  career: string;
  profileImage: string;
  purpose: string;
  techStacks: TechStack[];
};

type Ranking = {
  averageStudyTime: number;
  nickname: string;
  profile: Profile;
  rank: number;
  totalStudyTime: number;
  userId: string;
};

type Pagination = {
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalItems: number;
  totalPages: number;
};

export default function RankingInfo({ sortset }: { sortset: string }) {
  const [rankings, setRankings] = useState<Ranking[]>();
  const [pagination, setPagination] = useState<Pagination>();

  useEffect(() => {
    const getRankings = async () => {
      const results = await requestGetRankings(sortset);
      setRankings(results.data.rankings);
      setPagination(results.data.pagination);
    };

    getRankings();
  }, [sortset]);

  return (
    <>
      {rankings?.map((ranking, index) => (
        <div key={index} className='w-full h-[150px] flex bg-white rounded-xl gap-9 py-3 px-6'>
          <div className='flex flex-col gap-4'>
            <div
              className={`w-[43px] text-center text-title-b ${ranking.rank > 3 ? 'bg-primary-10 text-primary' : 'bg-primary text-white'} rounded-lg py-1`}
            >
              {ranking.rank}위
            </div>
            <div>
              <ProfileImageSVG />
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <div>
              <div className='text-title-b text-primary mb-0.5'>{ranking.nickname}</div>
              <div className='text-body-m text-primary'>{ranking.profile.purpose}</div>
            </div>
            <div className='flex text-body-r text-gray-500 gap-6'>
              <div>
                누적
                <span className='text-body-s text-gray-700 pl-2'>
                  {Math.round((ranking.totalStudyTime / 3_600_000) * 100) / 10}시간
                </span>
              </div>
              <div>
                일 평균
                <span className='text-body-s text-gray-700 pl-2'>
                  {Math.round((ranking.averageStudyTime / 3_600_000) * 100) / 10}시간
                </span>
              </div>
              <div>
                경력
                <span className='text-body-s text-gray-700 pl-2'>{ranking.profile.career}</span>
              </div>
            </div>
            <div className='flex gap-2 max-w-[800px] overflow-x-auto'>
              {ranking.profile.techStacks.map((techStack, index) => (
                <div
                  key={index}
                  className='bg-gray-100 text-body-m text-gray-500 py-1 px-2 rounded-[5px]'
                >
                  {techStack.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
