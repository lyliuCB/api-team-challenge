import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskRO, TasksRO } from './task.interface';
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

  async getAll(query: any): Promise<TasksRO> {
    let tasks;
    if (query.account_id || query.agent_id) {
      tasks = await this.taskRepository.findBy(query);
    } else {
      tasks = await this.taskRepository.find();
    }

    const tasksCount = tasks.length;
    return { tasks, tasksCount };
  }

  async getOne(id: UUID): Promise<TaskRO | null> {
    const task = await this.taskRepository.findOneBy({ id });
    if (task) {
      return { task };
    } else {
      return task;
    }
  }

  async create(data: CreateTaskDTO): Promise<TaskRO> {
    const id = data.schedule_id;
    const schedule = await this.scheduleRepository.findOneBy({ id });
    if (!schedule) {
      throw new NotFoundException(`Schedule ${id} not found`);
    } else {
      const task = await this.taskRepository.save(data);
      return { task };
    }
  }

  async update(id: UUID, data: CreateTaskDTO): Promise<TaskRO> {
    const task = new Task();
    task.id = id;
    task.account_id = data.account_id;
    task.schedule_id = data.schedule_id;
    task.start_time = data.start_time;
    task.duration = data.duration;
    task.type = data.type;
    await this.taskRepository.update(id, task);
    return { task };
  }

  async delete(id: UUID): Promise<DeleteResult> {
    return await this.taskRepository.delete({ id });
  }
}
