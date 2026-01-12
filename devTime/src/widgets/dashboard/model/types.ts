export type Item = {
  title: string;
  content: number;
};

export type GetStudyLogsParams = {
  page?: number;
  limit?: number;
  date?: string;
};

export type Task = {
  content: string;
  id: string;
  isCompleted: boolean;
};

export type StudyLog = {
  completionRate: string;
  date: string;
  id: string;
  review: string;
  studyTime: number;
  tasks: Task[];
  todayGoal: string;
};

export type StudyLogs = {
  id: string;
  date: string;
  todayGoal: string;
  studyTime: number;
  totalTasks: number;
  incompleteTasks: number;
  completionRate: number;
};

export type PagiNation = {
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalItems: number;
  totalPages: number;
};

export type Stats = {
  totalStudyTime: number;
  consecutiveDays: number;
  averageDailyStudyTime: number;
  taskCompletionRate: number;
  weekdayStudyTime: Record<
    'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday',
    number
  >;
};

export type WeekdayStudyTime = Record<
  'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday',
  number
>;

export type HeatMapData = {
  date: string;
  studyTimeHours: number;
  colorLevel: number;
};
