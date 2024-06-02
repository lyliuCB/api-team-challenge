import { TaskType } from '../task.interface';

export class CreateTaskDTO {
  account_id: number;
  schedule_id: string;
  start_time: Date;
  duration: number;
  type: TaskType;
}
