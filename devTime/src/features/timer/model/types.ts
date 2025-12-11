export type ButtonType = {
  onClick: () => void;
  timerId: string;
  pause?: boolean;
};

export type Time = {
  date: string;
  timeSpent: number;
};

export type TodoListType = {
  todayGoal: string;
  tasks: string[];
};

export type Task = {
  content: string;
  isCompleted: boolean;
};
