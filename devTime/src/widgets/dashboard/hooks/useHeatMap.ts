import { useHeatMapQuery } from '../queries/useDashboardQuery';
import { useMemo } from 'react';
import { createHeatMapLayout } from '../lib/createHeatMapLayout';
import { mergeHeatMapData } from '../lib/mergeHeatMapData';

export const useHeatMap = () => {
  const { heatmaps } = useHeatMapQuery();

  const layout = useMemo(() => createHeatMapLayout(), []);

  const mergedData = useMemo(() => {
    return mergeHeatMapData(heatmaps);
  }, [heatmaps]);

  return {
    results: layout.results,
    monthLabels: layout.monthLabels,
    mergedData,
  };
};
