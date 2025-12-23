import { useEffect, useState } from 'react';
import { requestGetStats } from '../api/requests';
import type { Stats, WeekdayStudyTime } from '../model/types';

export const useDashboardStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalStudyTime: 0,
    consecutiveDays: 0,
    averageDailyStudyTime: 0,
    taskCompletionRate: 0,
  });

  const [weekDayStudyTime, setWeekDayStudyTime] = useState<WeekdayStudyTime>({
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const result = await requestGetStats();
      const { stats, weekDayStudyTime } = {
        stats: {
          totalStudyTime: result.totalStudyTime,
          consecutiveDays: result.consecutiveDays,
          averageDailyStudyTime: result.averageDailyStudyTime,
          taskCompletionRate: result.taskCompletionRate,
        },
        weekDayStudyTime: result.weekdayStudyTime,
      };

      setStats(stats);
      setWeekDayStudyTime(weekDayStudyTime);
    };

    fetchStats();
  }, []);
  return {
    stats,
    weekDayStudyTime,
  };
};
