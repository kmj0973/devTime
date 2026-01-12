import { requestGetHeatMap } from '../api/requests';
import { useQuery } from '@tanstack/react-query';

export const useHeatMapQuery = () => {
  const { data: results } = useQuery({
    queryKey: ['dashboard', 'heatmap'],
    queryFn: () => requestGetHeatMap(),
    staleTime: 1000 * 60 * 10, // 10분
  });

  return { results };
};
