export type Snapshot = {
  id: string;
  activeTasks: number;
  completedTasks: number;
  createdAt: string;
  updatedAt: string;
};

export type DayData = {
  day: string;
  [key: string]: number | string;
};

export type ChartData = {
  date: string;
  [key: string]: number | string;
};
