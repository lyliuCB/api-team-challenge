import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { ScheduleCreateDTO, ScheduleQueryDTO } from './dto/schedule.dto';
import { UUID } from 'crypto';
import { Task } from '../tasks/task.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  /*
   * Get schedule list with query
   */
  async list({ account_id, agent_id }: ScheduleQueryDTO): Promise<Schedule[]> {
    if (account_id || agent_id) {
      return await this.scheduleRepository.findBy({
        account_id,
        agent_id,
      });
    } else {
      throw new BadRequestException(
        'Supported query params: [account_id, agent_id]',
      );
    }
  }

  /*
   *  Get schedule based on id
   */
  async get(id: UUID): Promise<Schedule | null> {
    return await this.scheduleRepository.findOneBy({ id });
  }

  /*
   *  Create a new schedule
   */
  async create({
    account_id,
    agent_id,
    start_time,
    end_time,
  }: ScheduleCreateDTO): Promise<Schedule> {
    return await this.scheduleRepository.save({
      account_id,
      agent_id,
      start_time,
      end_time,
    });
  }

  /*
   * update a schedule based on id
    TODO: add permission for properties that allowed to update
   */
  async update(
    id: UUID,
    { account_id, agent_id, start_time, end_time }: ScheduleCreateDTO,
  ): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOneBy({ id });
    if (schedule) {
      schedule.account_id = account_id || schedule.account_id;
      schedule.agent_id = agent_id || schedule.agent_id;
      schedule.start_time = start_time || schedule.start_time;
      schedule.end_time = end_time || schedule.end_time;

      return await this.scheduleRepository.save(schedule);
    } else {
      throw new BadRequestException(`Schedule ${id} not updated`);
    }
  }

  /*
   * delete a schedule based on id 
  TODO: allow delete when end_time expired; delete associated tasks
   */
  async delete(id: UUID): Promise<any> {
    const schedule = await this.scheduleRepository.findOneBy({ id });
    if (!schedule) {
      throw new BadRequestException(` Schedule ${id} not existed`);
    }
    const tasks = await this.taskRepository.findBy({ schedule_id: id });
    if (tasks.length > 0) {
      throw new BadRequestException(`Tasks associated with Schedule ${id}`);
    }

    const result = await this.scheduleRepository.delete({ id });

    if (!result.affected) {
      throw new BadRequestException(`Schedule ${id} not existed`);
    } else {
      return { message: `Schedule ${id} deleted` };
    }
  }
}
