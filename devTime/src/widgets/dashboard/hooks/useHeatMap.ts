import { useHeatMapQuery } from '../queries/useHeatMapQuery';
import { useMemo } from 'react';
import { createHeatMapLayout } from '../lib/createHeatMapLayout';
import { mergeHeatMapData } from '../lib/mergeHeatMapData';

export const useHeatMap = () => {
  const { results } = useHeatMapQuery();

  const layout = useMemo(() => createHeatMapLayout(), []);

  const mergedData = useMemo(() => {
    if (!results) return {};
    return mergeHeatMapData(results);
  }, [results]);

  return {
    results: layout.results,
    monthLabels: layout.monthLabels,
    mergedData,
  };
};
