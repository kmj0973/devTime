import type { HeatMapData } from '../model/types';

export const mergeHeatMapData = (heatmaps: { heatmap: HeatMapData[] }) => {
  const mergedData = heatmaps.heatmap.reduce(
    (acc: Record<string, HeatMapData>, curr: HeatMapData) => {
      const date = curr.date;
      if (!acc[date]) {
        acc[date] = {
          date: curr.date,
          studyTimeHours: curr.studyTimeHours,
          colorLevel: curr.colorLevel,
        };
      } else {
        acc[date] = {
          date: curr.date,
          studyTimeHours: acc[date].studyTimeHours + curr.studyTimeHours,
          colorLevel: curr.colorLevel,
        };
      }
      return acc;
    },
    {},
  );
  return mergedData;
};
