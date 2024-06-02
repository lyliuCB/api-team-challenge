import { Task } from './task.entity';

export interface TaskRO {
  task: Task;
}

export interface TasksRO {
  tasks: Task[];
  tasksCount: number;
}

export enum TaskType {
  work = 'work',
  break = 'break',
}
