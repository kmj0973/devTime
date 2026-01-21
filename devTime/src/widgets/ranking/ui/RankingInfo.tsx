import ProfileImageSVG from './svg/ProfileImageSVG';
import { useRankingQuery } from '../queries/useRankingQuery';
import { useEffect, useRef } from 'react';

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

export default function RankingInfo({ sortBy }: { sortBy: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useRankingQuery(sortBy);

  const rankings: Ranking[] = data?.pages.flatMap((page) => page.data.rankings) ?? [];

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null, // viewport
        threshold: 0.5, // 조금만 보여도 트리거
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
            <div className='w-20 h-20 rounded-2xl'>
              {!ranking.profile.profileImage ? (
                <ProfileImageSVG />
              ) : (
                <img
                  className='w-full h-full object-cover rounded-2xl'
                  src={`https://dev-time-bucket.s3.ap-northeast-2.amazonaws.com/${ranking.profile.profileImage}`}
                  alt='프로필 이미지'
                />
              )}
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
                  {Math.round((ranking.totalStudyTime / 3_600_000) * 10) / 10}시간
                </span>
              </div>
              <div>
                일 평균
                <span className='text-body-s text-gray-700 pl-2'>
                  {Math.round((ranking.averageStudyTime / 3_600_000) * 10) / 10}시간
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
      <div ref={ref} style={{ height: 1 }} />

      {isFetchingNextPage && <div>로딩 중...</div>}
    </>
  );
}
