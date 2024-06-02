import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UUID } from 'crypto';
import { TaskType } from './task.interface';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/')
  async createTask(@Body() body: CreateTaskDTO) {
    try {
      if (body.type !== (TaskType.break || TaskType.work)) {
        throw new HttpException(
          `Valid type values are in [${Object.keys(TaskType)}]`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const result = await this.taskService.create(body);
      return { data: result.task };
    } catch (error) {
      throw new HttpException(
        `Failed to create Task: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getTasksByQuery(@Query() params: any) {
    try {
      const result = await this.taskService.getAll(params);
      return { data: result.tasks, count: result.tasksCount };
    } catch (error) {
      throw new HttpException(
        `Failed to get Tasks: ${error.message}`,
        error.statusCode,
      );
    }
  }

  @Get('/:id')
  async getTask(@Param() params: { id: UUID }) {
    try {
      const result = await this.taskService.getOne(params.id);
      if (result) {
        return { data: result.task };
      } else {
        throw new HttpException(
          `No Task ${params.id} found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        `Failed to get Task: ${error.message}`,
        error.statusCode,
      );
    }
  }

  @Put('/:id')
  async updateTask(@Param() params: { id: UUID }, @Body() body: CreateTaskDTO) {
    try {
      const result = await this.taskService.update(params.id, body);
      return { data: result.task };
    } catch (error) {
      throw new HttpException(
        `Failed to update Task: ${error.message}`,
        error.statusCode,
      );
    }
  }

  @Delete('/:id')
  async deleteTask(@Param() params: { id: UUID }) {
    try {
      const result = await this.taskService.delete(params.id);
      if (result.affected) {
        return { message: `Task ${params.id} deleted` };
      } else {
        throw new HttpException(
          `No Task ${params.id} found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        `Failed to delete Task: ${error.message}`,
        error.statusCode,
      );
    }
  }
}
