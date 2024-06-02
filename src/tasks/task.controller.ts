import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Query,
} from '@nestjs/common';

import { TaskService } from './task.service';
import { TaskCreateDTO } from './dto/task.dto';
import { UUID } from 'crypto';
import { IdParam } from '../common/decorators/id-param.decorator';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async list(@Query() { account_id, schedule_id }: any) {
    return await this.taskService.list({ account_id, schedule_id });
  }

  @Get(':id')
  async get(@IdParam() id: UUID) {
    return await this.taskService.get(id);
  }

  @Post()
  async create(@Body() body: TaskCreateDTO) {
    return await this.taskService.create(body);
  }

  @Put(':id')
  async update(@IdParam() id: UUID, @Body() body: TaskCreateDTO) {
    return await this.taskService.update(id, body);
  }

  @Delete(':id')
  async delete(@IdParam() id: UUID) {
    return await this.taskService.delete(id);
  }
}
