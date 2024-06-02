import { HttpStatus } from '@nestjs/common';
import { Schedule } from './schedule.entity';

export interface ScheduleRO {
  code: HttpStatus;
  message: string;
  data: Schedule[];
}
