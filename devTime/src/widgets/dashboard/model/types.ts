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
