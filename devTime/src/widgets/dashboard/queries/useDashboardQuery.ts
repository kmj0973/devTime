import { requestGetHeatMap, requestGetStats, requestGetStudyLogs } from '../api/requests';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { type Stats, type HeatMapData } from '../model/types';

export const useStatsQuery = () => {
  const { data: stats } = useSuspenseQuery<Stats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => requestGetStats(),
    staleTime: 1000 * 60 * 10, // 10분
  });

  return { stats };
};

export const useHeatMapQuery = () => {
  const { data: heatmaps } = useSuspenseQuery<{ heatmap: HeatMapData[] }>({
    queryKey: ['dashboard', 'heatmap'],
    queryFn: () => requestGetHeatMap(),
    staleTime: 1000 * 60 * 10, // 10분
  });

  return { heatmaps };
};

export const useStudyLogsQuery = (page?: number) => {
  const { data: studyLogs, isFetching } = useQuery({
    queryKey: ['dashboard', 'studyLogs', page],
    queryFn: () => requestGetStudyLogs({ page }),
    staleTime: 1000 * 60 * 10, // 10분
  });

  return { studyLogs, isFetching };
};
