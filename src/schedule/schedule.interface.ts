import { Schedule } from './schedule.entity';

export interface ScheduleRO {
  schedule: Schedule;
}

export interface SchedulesRO {
  schedules: Schedule[];
  schedulesCount: number;
}
