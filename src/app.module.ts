import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/schedule.module';
import { Schedule } from './schedule/schedule.entity';
import { TaskModule } from './tasks/task.module';
import { Task } from './tasks/task.entity';
import { ConfigModule } from '@nestjs/config';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

/* TODO: auth middleware; throtting middleware; logging ; etc*/
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Schedule, Task],
      synchronize: true,
    }),
    ScheduleModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
