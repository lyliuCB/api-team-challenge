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
import { CreateScheduleDTO } from './dto/creat-schedule.dto';
import { ScheduleService } from './schedule.service';
import { UUID } from 'crypto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('/')
  async createSchedule(@Body() scheduleData: CreateScheduleDTO) {
    try {
      const result = await this.scheduleService.create(scheduleData);
      return { data: result.schedule };
    } catch (error) {
      throw new HttpException(
        `Failed to create Schedule: ${error.message}`,
        error.statusCode,
      );
    }
  }

  @Get()
  async getSchedulesByQuery(@Query() query: any) {
    try {
      const result = await this.scheduleService.getAll(query);
      return { data: result.schedules, count: result.schedulesCount };
    } catch (error) {
      throw new HttpException(
        `Failed to get Schedules: ${error.message}`,
        error.statusCode,
      );
    }
  }

  @Get(':id')
  async getSchedule(@Param() params: { id: UUID }) {
    try {
      const result = await this.scheduleService.getOne(params.id);
      if (!result) {
        throw new HttpException(
          `No Schedule ${params.id} found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return { data: result.schedule };
    } catch (error) {
      throw new HttpException(
        `Failed to get Schedule: ${error.message}`,
        error.statusCode,
      );
    }
  }

  @Put(':id')
  async updateSchedule(
    @Param() params: { id: UUID },
    @Body() body: CreateScheduleDTO,
  ) {
    try {
      const result = await this.scheduleService.update(params.id, body);
      return { data: result.schedule };
    } catch (error) {
      throw new HttpException(
        `Failed to update Schedule: ${error.message}`,
        error.statusCode,
      );
    }
  }

  @Delete(':id')
  async deleteSchedule(@Param() params: { id: UUID }) {
    try {
      const result = await this.scheduleService.delete(params.id);
      if (result.affected) {
        return { message: `${params.id} deleted` };
      } else {
        throw new HttpException(
          `No schedule ${params.id} found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        `Failed to delete Schedule: ${error.message}`,
        error.statusCode,
      );
    }
  }
}
