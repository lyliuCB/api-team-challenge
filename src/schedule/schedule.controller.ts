import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { IdParam } from '../common/decorators/id-param.decorator';
import { ScheduleCreateDTO } from './dto/schedule.dto';
import { ScheduleService } from './schedule.service';
import { UUID } from 'crypto';
import { Schedule } from './schedule.entity';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  async list(@Query() { account_id, agent_id }: any): Promise<Schedule[]> {
    return await this.scheduleService.list({ account_id, agent_id });
  }

  @Get(':id')
  async get(@IdParam() id: UUID) {
    return await this.scheduleService.get(id);
  }

  @Post()
  async create(@Body() dto: ScheduleCreateDTO): Promise<Schedule> {
    return await this.scheduleService.create(dto);
  }

  @Put(':id')
  async update(
    @IdParam() id: UUID,
    @Body() dto: ScheduleCreateDTO,
  ): Promise<any> {
    return await this.scheduleService.update(id, dto);
  }

  @Delete(':id')
  async delete(@IdParam() id: UUID): Promise<any> {
    return await this.scheduleService.delete(id);
  }
}
