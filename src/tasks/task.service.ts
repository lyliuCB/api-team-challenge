import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskCreateDTO } from './dto/task.dto';
import { UUID } from 'crypto';
import { Schedule } from '../schedule/schedule.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  /*
   * Get task list with query
   */
  async list({ account_id, schedule_id }: any): Promise<Task[]> {
    if (account_id || schedule_id) {
      return await this.taskRepository.findBy({
        account_id,
        schedule_id,
      });
    } else {
      throw new BadRequestException(
        'Supported query params: [schedule_id, account_id]',
      );
    }
  }
  /*
   *  Get task based on id
   */
  async get(id: UUID): Promise<Task | null> {
    const result = await this.taskRepository.findOneBy({ id });
    if (result) {
      return result;
    } else {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }
  /*
   *  Create a new task
   */
  async create(data: TaskCreateDTO): Promise<Task> {
    const schedule = await this.scheduleRepository.findOneBy({
      id: data?.schedule_id,
    });
    if (!schedule) {
      throw new BadRequestException(`Schedule ${data?.schedule_id} not found`);
    } else {
      return await this.taskRepository.save(data);
    }
  }
  /*
   * update a task based on id
   */
  async update(id: UUID, dto: TaskCreateDTO): Promise<Task> {
    const schedule = await this.scheduleRepository.findOneBy({
      id: dto?.schedule_id,
    });
    if (!schedule) {
      throw new BadRequestException(`Schedule ${dto?.schedule_id} not found`);
    }

    const task = await this.taskRepository.findOneBy({ id });
    if (task) {
      task.account_id = dto.account_id || task.account_id;
      task.schedule_id = dto.schedule_id || task.schedule_id;
      task.start_time = dto.start_time || task.start_time;
      task.duration = dto.duration || task.duration;
      task.type = dto.type || task.type;

      return await this.taskRepository.save(task);
    } else {
      throw new BadRequestException(`Task ${id} not exist`);
    }
  }
  /*
   * delete a task based on id
   */
  async delete(id: UUID): Promise<any> {
    const result = await this.taskRepository.delete({ id });
    if (!result.affected) {
      throw new BadRequestException(`Task ${id} not existed`);
    } else {
      return { message: `Task ${id} deleted` };
    }
  }
}
