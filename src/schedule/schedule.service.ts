import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { ScheduleRO, SchedulesRO } from './schedule.interface';
import { CreateScheduleDTO } from './dto/creat-schedule.dto';
import { UUID } from 'crypto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async getAll(query: any): Promise<SchedulesRO> {
    let schedules;
    if (query.account_id || query.agent_id) {
      schedules = await this.scheduleRepository.findBy(query);
    } else {
      schedules = await this.scheduleRepository.find();
    }
    const schedulesCount = schedules.length;
    return { schedules, schedulesCount };
  }

  async getOne(id: UUID): Promise<ScheduleRO | null> {
    const schedule = await this.scheduleRepository.findOneBy({ id });
    if (schedule) {
      return { schedule };
    } else {
      return schedule;
    }
  }

  async create(entries: CreateScheduleDTO): Promise<ScheduleRO> {
    const schedule = await this.scheduleRepository.save(entries);
    return { schedule };
  }

  async update(id: UUID, entity: CreateScheduleDTO): Promise<ScheduleRO> {
    const schedule = new Schedule();
    schedule.id = id;
    schedule.account_id = entity.account_id;
    schedule.agent_id = entity.agent_id;
    schedule.start_time = entity.start_time;
    schedule.end_time = entity.end_time;
    await this.scheduleRepository.update(id, schedule);
    return { schedule };
  }

  async delete(id: UUID): Promise<DeleteResult> {
    return await this.scheduleRepository.delete({ id });
  }
}
