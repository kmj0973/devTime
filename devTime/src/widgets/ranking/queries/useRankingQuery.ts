import { useInfiniteQuery } from '@tanstack/react-query';
import { requestGetRankings } from '../api/requests';

export const useRankingQuery = (sortBy: string) => {
  const query = useInfiniteQuery({
    queryKey: ['ranking', sortBy],
    queryFn: ({ pageParam }) => {
      return requestGetRankings({ sortBy, page: pageParam, limit: 5 });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.data.pagination;

      return pagination.hasNext ? pagination.currentPage + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
