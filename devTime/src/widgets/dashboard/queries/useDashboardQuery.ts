import {
  requestDeleteStudyLog,
  requestGetHeatMap,
  requestGetStats,
  requestGetStudyLogs,
} from '../api/requests';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { type Stats, type HeatMapData } from '../model/types';
import { requestDeleteTimer } from '@/features/timer/api/requests';

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

export const useStudyLogMutation = () => {
  const queryClient = useQueryClient();

  const deleteStudyLog = useMutation({
    mutationFn: ({ id, timerId }: { id: string; timerId?: string }) => {
      if (timerId) {
        return requestDeleteTimer(timerId);
      }
      return requestDeleteStudyLog(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dashboard'] }),
    onError: (error) => console.log(error.message),
  }).mutateAsync;

  return { deleteStudyLog };
};
