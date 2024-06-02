import { IntersectionType, PartialType } from '@nestjs/swagger';

export class ScheduleCreateDTO {
  account_id: number;
  agent_id: number;
  start_time: Date;
  end_time: Date;
}

export class ScheduleQueryDTO extends IntersectionType(
  PartialType(ScheduleCreateDTO),
) {
  account_id?: number;
  agent_id?: number;
}
